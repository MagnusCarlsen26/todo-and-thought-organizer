import AsyncStorage from "@react-native-async-storage/async-storage";
import { ValidTodo } from "../constants/todo.type";

export type TodoDBSchema = ValidTodo & {
    notificationId: string;
}

export async function getSavedTodos(): Promise<TodoDBSchema[]> {
    
    const todos = await AsyncStorage.getItem('todos') || '[]';
    
    try {
        return JSON.parse(todos) as TodoDBSchema[]
    } catch (error) {
        console.error('[getTodosIOService] Exception caught:', error);
        throw new Error('Failed to get todos', { cause: error });
    }

}

export async function storeTodosIOService(todos: TodoDBSchema[]): Promise<void> {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
}