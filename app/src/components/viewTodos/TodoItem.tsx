import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { ValidTodo } from '../../constants/todo.type';
import { getReminderText } from '../../utils/addScreen/getReminder';
import CalendarIcon from '../../assets/svgs/calenderSvg';
import ClockIcon from '../../assets/svgs/clockSvg';
import SnoozeIcon from '../../assets/svgs/snoozeSvg';
// import ShoppingImage from '../../assets/images/shopping.jpg';
// import CareerImage from '../../assets/images/career.jpg';
import { Swipeable } from 'react-native-gesture-handler';
import RenderActions from './RenderActions';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TodoItemProps {
  item: ValidTodo;
  onEdit: (todo: ValidTodo) => void;
  onDelete: (todo: ValidTodo) => void;
  onMarkAsComplete: (todo: ValidTodo) => void;
}

export default function TodoItem({ item, onEdit, onDelete, onMarkAsComplete }: TodoItemProps) {

  return (
      <Swipeable
        renderRightActions={(dragX) => (
          <RenderActions dragX={dragX} item={item} onAction={onDelete} actionColor="bg-red-500">
            <Icon name="delete" size={24} color="white" />
          </RenderActions>
        )}

        renderLeftActions={(dragX) => (
          <RenderActions dragX={dragX} item={item} onAction={onMarkAsComplete} actionColor="bg-green-500">
            <Icon name="check" size={24} color="white" />
          </RenderActions>
        )}
      >      
        <TouchableOpacity onPress={() => onEdit(item)}>
        {item.category.category === 'Shopping' || item.category.subcategory === 'Shopping' ? (
        //   <ImageBackground source={ShoppingImage} resizeMode="cover" imageStyle={{ borderRadius: 8 }} className='border-2 border-gray-600 rounded-lg p-2 mb-2 w-full'>
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

        //   </ImageBackground>
        ) : item.category.subcategory === 'Career' ? (
        //   <ImageBackground source={CareerImage} resizeMode="cover" imageStyle={{ borderRadius: 8 }} className='border-2 border-gray-600 rounded-lg p-2 mb-2 w-full'>
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
          <View className='border-2 border-gray-600 rounded-lg p-2 mb-2'>
            <View>
              <Text className='text-xl font-bold'>{item.todo.heading}</Text>
              <Text className='text-gray-500'>{item.todo.description}</Text>
            </View>

            <ReminderComponent reminder={item.reminder} />
            
            <View>
              <Text className='text-gray-500'>{item.category.subcategory}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Swipeable>
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