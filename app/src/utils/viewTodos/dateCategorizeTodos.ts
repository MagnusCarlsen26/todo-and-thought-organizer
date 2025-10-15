import { ValidTodo } from "../../constants/todo.type";

export function getTodoDateCategory(date: Date): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todoDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
    const diffTime = todoDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) {
        return 'Missed Todos';
    }

    if (diffDays === 0) {
        return 'Today';
    }

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
      'Today': [],
      'Tomorrow': [],
      'This Week': [],
      'Next Week': [],
      'Next Month': [],
      'Future': [],
      'Missed Todos': [],
    };
  
    todos.forEach(todo => {
      const reminderDate = todo.reminder?.date;
      const year = reminderDate?.year ?? 0;
      // Convert 1-based month (Jan=1 ... Dec=12) to JS Date 0-based monthIndex (Jan=0 ... Dec=11)
      const monthIndex = reminderDate?.month != null ? reminderDate.month - 1 : 0;
      const day = reminderDate?.day ?? 0;

      const category = getTodoDateCategory(new Date(year, monthIndex, day));
  
      if (categories[category]) {
        categories[category].push(todo);
      }
    });
  
    return Object.fromEntries(Object.entries(categories).filter(([_, value]) => value.length > 0));
  };
  