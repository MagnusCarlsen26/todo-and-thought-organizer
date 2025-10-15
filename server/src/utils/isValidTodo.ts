import { z } from "zod";
import todoCategories from "../constants/todoCategories.json" with { type: "json" };

const allCategories = ["other", ...todoCategories.map((category: any) => category.category)];
const allSubcategories = ["other", ...todoCategories.flatMap((category: any) => category.subcategories)];

export function isValidTodo(todo: any): { 
    isValid: boolean, 
    error: string | undefined 
} {

    const isValidTodoSchema = z.object({
        todo: z.object({
            heading: z.string(),
            description: z.string(),
        }),
        category: z.object({
            category: z.enum(allCategories as [string, ...string[]]),
            subcategory: z.enum(allSubcategories as [string, ...string[]]),
        }),
        reminder: z.object({
            date: z.object({
                year: z.number().nullable(),
                month: z.number().nullable(),
                day: z.number().nullable(),
            }).nullable(),
            time: z.object({
                hour: z.number().nullable(),
                minute: z.number().nullable(),
            }).nullable(),
            snooze: z.object({
                snoozeHours: z.number().nullable(),
            }).nullable(),
        }),
    });

    const isValid = isValidTodoSchema.safeParse(todo);
    
    return {
        isValid: isValid.success,
        error: isValid.error?.message,
    };
}