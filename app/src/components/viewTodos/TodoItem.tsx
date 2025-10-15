import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { ValidTodo } from '../../constants/todo.type';
import { getReminderText } from '../../utils/addScreen/getReminder';
import CalendarIcon from '../../assets/svgs/calenderSvg';
import ClockIcon from '../../assets/svgs/clockSvg';
import SnoozeIcon from '../../assets/svgs/snoozeSvg';
// import ShoppingImage from '../../assets/images/shopping.jpg';
// import CareerImage from '../../assets/images/career.jpg';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TodoItemProps {
  item: ValidTodo;
  onEdit: (todo: ValidTodo) => void;
  onDelete: (todo: ValidTodo) => void;
  onMarkAsComplete: (todo: ValidTodo) => void;
}

export default function TodoItem({ item, onEdit, onDelete, onMarkAsComplete }: TodoItemProps) {

  return (
    <View className='border-2 border-gray-600 rounded-lg p-2 mb-2'>
      <TouchableOpacity onPress={() => onEdit(item)}>
        {item.category.category === 'Shopping' || item.category.subcategory === 'Shopping' ? (
          <>
            <View>
              <Text className='text-xl font-bold text-white'>{item.todo.heading}</Text>
              <Text className='text-gray-200'>{item.todo.description}</Text>
            </View>
            <ReminderComponent reminder={item.reminder} />
            <View>
              <Text className='text-gray-200'>{item.category.subcategory}</Text>
            </View>
          </>
        ) : item.category.subcategory === 'Career' ? (
          <>
            <View>
              <Text className='text-xl font-bold text-black'>{item.todo.heading}</Text>
              <Text className='text-gray-800'>{item.todo.description}</Text>
            </View>
            <ReminderComponent reminder={item.reminder} />
            <View>
              <Text className='text-gray-800'>{item.category.subcategory}</Text>
            </View>
          </>
        ) : (
          <>
            <View>
              <Text className='text-xl font-bold'>{item.todo.heading}</Text>
              <Text className='text-gray-500'>{item.todo.description}</Text>
            </View>
            <ReminderComponent reminder={item.reminder} />
            <View>
              <Text className='text-gray-500'>{item.category.subcategory}</Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

function ReminderComponent({ reminder }: { reminder: ValidTodo["reminder"] }) {

    const reminderText = getReminderText(reminder);

    return (
        <View className="flex-row justify-around">
            <IDKWhatToNAmeComponent Icon={CalendarIcon} text={reminderText?.date ?? null} />
            <IDKWhatToNAmeComponent Icon={ClockIcon} text={reminderText?.time ?? null} />
            <IDKWhatToNAmeComponent Icon={SnoozeIcon} text={reminderText?.snooze ?? null} />
        </View>
    );
}

function IDKWhatToNAmeComponent({ 
    Icon, 
    text 
}: { 
    Icon: React.ComponentType<{ size: number, color: string }>, 
    text: string | null
}) {

    if (text === null) return <></>;

    return (
        <View className="flex-row items-center">
            <Icon size={16} color="gray" />
            <Text className='text-gray-500 ml-1'>{text}</Text>
        </View>
    );
}