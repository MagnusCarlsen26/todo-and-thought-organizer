import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ValidTodo } from '../../constants/todo.type';
import { getReminderText } from '../../utils/addScreen/getReminder';
import CalendarIcon from '../../assets/svgs/calenderSvg';
import ClockIcon from '../../assets/svgs/clockSvg';
import SnoozeIcon from '../../assets/svgs/snoozeSvg';
import { getCategoryTheme, DARK_COLORS } from '../../constants/categoryPalette';
// import ShoppingImage from '../../assets/images/shopping.jpg';
// import CareerImage from '../../assets/images/career.jpg';
interface TodoItemProps {
  item: ValidTodo;
  onEdit: (todo: ValidTodo) => void;
  onDelete: (todo: ValidTodo) => void;
  onMarkAsComplete: (todo: ValidTodo) => void;
}

export default function TodoItem({ item, onEdit }: TodoItemProps) {
  const theme = getCategoryTheme(item.category.category);

  return (
    <View
      className='rounded-lg p-3 mb-3'
      style={{
        backgroundColor: DARK_COLORS.cardBackground,
        borderLeftWidth: 2,
        borderLeftColor: theme.accent,
      }}
    >
      <TouchableOpacity onPress={() => onEdit(item)}>
        <View>
          <Text className='text-xl font-bold' style={{ color: DARK_COLORS.title }}>
            {item.todo.heading}
          </Text>
          <Text style={{ color: DARK_COLORS.description }}>
            {item.todo.description}
          </Text>
        </View>

        <ReminderComponent reminder={item.reminder} />

        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: theme.tagBackground,
            borderRadius: 9999,
            paddingHorizontal: 8,
            paddingVertical: 2,
            marginTop: 8,
          }}
        >
          <Text style={{ color: theme.tagText, fontWeight: '600' }}>
            {item.category.subcategory}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function ReminderComponent({ reminder }: { reminder: ValidTodo["reminder"] }) {

    const reminderText = getReminderText(reminder);

    return (
        <View className="flex-row w-full gap-2 my-2">
            <IDKWhatToNAmeComponent Icon={CalendarIcon} text={reminderText?.date ?? null} width="w-1/2" />
            <View className='flex w-1/2 gap-2 pr-2'>
                <IDKWhatToNAmeComponent Icon={ClockIcon} text={reminderText?.time ?? null} width="w-full" />
                <IDKWhatToNAmeComponent Icon={SnoozeIcon} text={reminderText?.snooze ?? null} width="w-full" />
            </View>
        </View>
    );
}

function IDKWhatToNAmeComponent({ 
    Icon, 
    text,
    width
}: { 
    Icon: React.ComponentType<{ size: number, color: string }>, 
    text: string | null
    width: string
}) {

    if (text === null) return <></>;

    return (
        <View
          className={`flex-row items-center justify-center rounded-lg p-1 ${width}`}
          style={{ borderWidth: 1, borderColor: DARK_COLORS.metaBorder }}
        >
            <Icon size={16} color={DARK_COLORS.metaIcon} />
            <Text style={{ color: DARK_COLORS.metaText }} className='ml-1 text-center'>
              {text}
            </Text>
        </View>
    );
}