import AsyncStorage from "@react-native-async-storage/async-storage";
import { ValidTodo } from "../constants/todo.type";

export async function getSavedTodos(): Promise<ValidTodo[]> {
    
    const todos = await AsyncStorage.getItem('todos') || '[]';
    
    try {
        return JSON.parse(todos) as ValidTodo[]
    } catch (error) {
        console.error('[getTodosIOService] Exception caught:', error);
        throw new Error('Failed to get todos', { cause: error });
    }

}

export async function storeTodosIOService(todos: ValidTodo[]): Promise<void> {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
}