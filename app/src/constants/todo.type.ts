export type ValidTodo = {
    todo: {
        heading: string;
        description: string;
    };
    category: {
        category: string;
        subcategory: string;
    };
    reminder: {
        date: { year: number | null; month: number | null; day: number | null } | null;
        time: { hour: number | null; minute: number | null } | null;
        snooze: { snoozeHours: number | null } | null;
    };
};
