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

    return (
        <DateTimePicker
            value={new Date(1,1,1,editedTodo.reminder?.time?.hour || 0, editedTodo.reminder?.time?.minute || 0)}
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