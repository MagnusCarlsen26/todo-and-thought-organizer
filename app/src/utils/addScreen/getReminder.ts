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

        if (reminder.time.hour && reminder.time.minute) {
            const AmPm = reminder.time.hour >= 12 ? "PM" : "AM";

            if ( reminder.time.minute === 0 ) {
                reminderText.time = `${reminder.time.hour} ${AmPm}`;
            } else {
                reminderText.time = `${reminder.time.hour}:${String(reminder.time.minute).padStart(2, '0')} ${AmPm}`;
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