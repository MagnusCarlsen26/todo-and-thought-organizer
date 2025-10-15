import { ValidTodo } from "../../constants/todo.type";

export function getTodoDateCategory(date: Date): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todoDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
    const diffTime = todoDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays === 1) {
        return 'Tomorrow';
    }
  
    if (diffDays >= 0 && diffDays < 7) {
        return 'This Week';
    }
  
    if (diffDays >= 7 && diffDays < 14) {
        return 'Next Week';
    }
  
    if (diffDays >= 14 && diffDays < 30) {
        return 'Next Month';
    }
  
    return 'Future';
}

export function dateCategorizeTodos(todos: ValidTodo[]) {
    const categories: { [key: string]: ValidTodo[] } = {
      'Tomorrow': [],
      'This Week': [],
      'Next Week': [],
      'Next Month': [],
      'Future': [],
    };
  
    todos.forEach(todo => {
      const category = getTodoDateCategory(
        new Date(
          todo.reminder?.date?.year ?? 0,
          todo.reminder?.date?.month ?? 0,
          todo.reminder?.date?.day ?? 0
        )
      );
  
      if (categories[category]) {
        categories[category].push(todo);
      }
    });
  
    return categories;
  };
  