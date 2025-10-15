import { ValidTodo } from "../../constants/todo.type";

// TODO: Assuming reminder date time and snooze are not null
export function getReminderText( reminder: ValidTodo["reminder"]) { 

    if (!reminder) return null;

    let reminderText = {
        date: null as string | null,
        time: null as string | null,
        snooze: null as string | null,
    }

    if (reminder.date) {
        if (reminder.date.month && reminder.date.day) {
            reminderText.date = `${reminder.date.day} ${getMonthWord(reminder.date.month)}`;
        } else {
            reminderText.date = null
        }
    }
    
    if (reminder.time) {
        const hour = reminder.time.hour;
        const minute = reminder.time.minute;
        if (hour !== null && minute !== null) {
            const AmPm = hour >= 12 ? "PM" : "AM";
            if (minute === 0) {
                reminderText.time = `${hour} ${AmPm}`;
            } else {
                reminderText.time = `${hour}:${String(minute).padStart(2, '0')} ${AmPm}`;
            }
        } else {
            reminderText.time = null
        }
    }

    if (reminder.snooze) {
        
        if (!reminder.snooze.snoozeHours) reminderText.snooze = null;
        else {
            if ( reminder.snooze.snoozeHours % 24 === 0 ) {

                // Check for Days
                if ( reminder.snooze.snoozeHours / 24 === 1 ) reminderText.snooze = "1 day";
                else reminderText.snooze = `${reminder.snooze.snoozeHours / 24} days`;
                
                // Check for Weeks
                if ( reminder.snooze.snoozeHours % 168 === 0 ) {
                    if ( reminder.snooze.snoozeHours / 168 === 1 ) reminderText.snooze = "1 week";
                    else reminderText.snooze = `${reminder.snooze.snoozeHours / 168} weeks`;
                }
                
                // Check for Months
                if ( reminder.snooze.snoozeHours / 720 === 1 ) {
                    if ( reminder.snooze.snoozeHours / 720 === 1 ) reminderText.snooze = "1 month";
                    else reminderText.snooze = `${reminder.snooze.snoozeHours / 720} months`;
                }
                

            } else reminderText.snooze = `${reminder.snooze.snoozeHours} hours`;
        }

    }

    console.log('reminderText', reminderText);

    return reminderText;

}

function getMonthWord(month: number) {

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return monthNames[month - 1] || month;
}