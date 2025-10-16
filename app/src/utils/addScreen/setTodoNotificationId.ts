import { ValidTodo } from "../../constants/todo.type";
import    { TodoDBSchema } from "../../service/todoIOService";
import { scheduleNotification } from "../../service/notificationService";
import * as Notifications from 'expo-notifications';

export async function setTodoNotificationId(
        todo: ValidTodo,
): Promise<TodoDBSchema> {

    return {
            ...todo,
            notificationId: await scheduleNotification(
                    todo.todo.heading, 
                    todo.todo.description,
                    getTriggerFromReminder(todo.reminder)
            ) ?? ""
    };
}

export function getTriggerFromReminder(
    reminder: ValidTodo["reminder"]
  ): Notifications.NotificationTriggerInput | null {

    if (
        reminder.date 
        && reminder.date.year 
        && reminder.date.month 
        && reminder.date.day
    ) {
        const hour =
            reminder.time?.hour !== null && reminder.time?.hour !== undefined
            ? reminder.time.hour
            : 6;
        const minute =
            reminder.time?.minute !== null && reminder.time?.minute !== undefined
            ? reminder.time.minute
            : 0;
    
        const targetDate = new Date(
            reminder.date.year,
            reminder.date.month - 1, // JS months are 0-based
            reminder.date.day,
            hour,
            minute,
            0
        );
        
        if (isNaN(targetDate.getTime())) {
            return null;
        }
      
          // --- Apply snooze (relative to date) ---
        if (reminder.snooze?.snoozeHours && reminder.snooze.snoozeHours > 0) {
            targetDate.setHours(targetDate.getHours() + reminder.snooze.snoozeHours);
        }
    
        // Skip if in the past
        if (targetDate.getTime() <= Date.now()) {
            return null;
        }
    
        return { 
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: targetDate
        };
    }
  
    return null;
}