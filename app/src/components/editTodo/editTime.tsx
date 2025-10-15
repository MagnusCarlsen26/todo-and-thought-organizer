import DateTimePicker from '@react-native-community/datetimepicker';
import { ValidTodo } from '../../constants/todo.type';

interface EditTimeProps {
    showTimePicker: boolean;
    editedTodo: ValidTodo;
    dispatch: (action: any) => void;
    setShowTimePicker: (showTimePicker: boolean) => void;
}

export default function EditTime({ 
    showTimePicker, 
    editedTodo, 
    dispatch, 
    setShowTimePicker 
}: EditTimeProps) {

    if (!showTimePicker) return null;

    // Decide default time: anchor to today's date to avoid historical timezone quirks
    const now = new Date();
    const baseYear = now.getFullYear();
    const baseMonth = now.getMonth();
    const baseDay = now.getDate();

    let defaultDate: Date;
    if (
        editedTodo.reminder?.time?.hour != null &&
        editedTodo.reminder?.time?.minute != null
    ) {
        defaultDate = new Date(
            baseYear,
            baseMonth,
            baseDay,
            editedTodo.reminder.time.hour,
            editedTodo.reminder.time.minute,
            0,
            0
        );
    } else {
        defaultDate = new Date(
            baseYear,
            baseMonth,
            baseDay,
            now.getHours(),
            now.getMinutes(),
            0,
            0
        );
    }

    // Log the default time value that will appear in the picker, for debugging:
    console.log(`The time shown in the picker will be: ${defaultDate.getHours().toString().padStart(2, '0')}:${defaultDate.getMinutes().toString().padStart(2, '0')}`);

    return (
        <DateTimePicker
            value={defaultDate}
            mode="time"
            is24Hour={false}
            display="spinner"
            themeVariant="dark"
            onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                    dispatch({ type: "hour", payload: selectedTime.getHours() });
                    dispatch({ type: "minute", payload: selectedTime.getMinutes() });
                }
            }}
        />
    );
}