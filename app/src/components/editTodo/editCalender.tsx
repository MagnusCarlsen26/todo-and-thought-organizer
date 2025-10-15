import { Calendar } from "react-native-calendars";

interface EditCalenderProps {
    showCalendar: boolean;
    formattedDate: string;
    dispatch: (action: any) => void;
    setShowCalendar: (showCalendar: boolean) => void;
}

export default function EditCalender({ 
    showCalendar, 
    formattedDate, 
    dispatch, 
    setShowCalendar 
}: EditCalenderProps) {

    if (!showCalendar) return null;

    return (
        <Calendar
            current={formattedDate || new Date().toISOString().slice(0, 10)}
            onDayPress={(day) => {
                dispatch({ type: "year", payload: day.year });
                dispatch({ type: "month", payload: day.month });
                dispatch({ type: "day", payload: day.day });
                setShowCalendar(false);
            }}
            markedDates={{
                [formattedDate]: { 
                    selected: true, 
                    marked: true, 
                    selectedColor: 'blue' 
                }
            }}
        />
    );
}