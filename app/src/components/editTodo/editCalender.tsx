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
                    selectedColor: '#2563eb' // Tailwind blue-600
                }
            }}
            theme={{
                backgroundColor: '#0f172a', // slate-900
                calendarBackground: '#0f172a', 
                textSectionTitleColor: '#94a3b8', // slate-400
                selectedDayBackgroundColor: '#2563eb', 
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#60a5fa', // blue-400
                dayTextColor: '#e2e8f0', // slate-200
                textDisabledColor: '#475569', // slate-600
                monthTextColor: '#f8fafc', // slate-50
                arrowColor: '#93c5fd', // blue-300
                textDayFontWeight: '500',
                textMonthFontWeight: '700',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
            }}
        />
    );
}
