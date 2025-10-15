import { ValidTodo } from "../../../constants/todo.type";

export const listReducer = (state: ValidTodo[], action: any): ValidTodo[] => {

    if (action?.type === 'reset') return action.payload || [];

    const { index, ...todoAction } = action || {};
    if (typeof index !== 'number') return state;
    
    return state.map((item, i) => (i === index ? (reducer(item, todoAction) ?? item) : item));
};

export const reducer = (state: any, action: any) => {

    switch (action.type) {
        case "heading": return { ...state, todo: { ...state.todo, heading: action.payload } };
        case "description": return { ...state, todo: { ...state.todo, description: action.payload } };

        case "category": return { ...state, category: { ...state.category, category: action.payload } };
        case "subcategory": return { ...state, category: { ...state.category, subcategory: action.payload } };

        case "year": return { ...state, reminder: { ...state.reminder, date: { ...state.reminder.date, year: action.payload } } };
        case "month": return { ...state, reminder: { ...state.reminder, date: { ...state.reminder.date, month: action.payload } } };
        case "day": return { ...state, reminder: { ...state.reminder, date: { ...state.reminder.date, day: action.payload } } };

        case "hour": return { ...state, reminder: { ...state.reminder, time: { ...state.reminder.time, hour: action.payload } } };
        case "minute": return { ...state, reminder: { ...state.reminder, time: { ...state.reminder.time, minute: action.payload } } };
        case "snoozeHours": return { ...state, reminder: { ...state.reminder, snooze: { ...state.reminder.snooze, snoozeHours: action.payload } } };
    }

}