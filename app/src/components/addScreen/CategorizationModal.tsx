import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, Modal, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { ValidTodo } from '../../constants/todo.type';
import CalendarSvg from '../../assets/svgs/calenderSvg';
import ClockSvg from '../../assets/svgs/clockSvg';
import SnoozeSvg from '../../assets/svgs/snoozeSvg';
import { getReminderText } from '../../utils/addScreen/getReminder';
import { reducer } from '../../utils/editTodoReducer';
import EditCalender from '../editTodo/editCalender';
import EditTime from '../editTodo/editTime';
import EditSnooze from '../editTodo/editSnooze';

type CategorizationModalProps = {
  visible: boolean;
  onClose: () => void;
  categorizationResult: ValidTodo[];
  onSave?: () => void;
};

export default function CategorizationModal({ 
  visible, 
  onClose, 
  categorizationResult, 
  onSave 
}: CategorizationModalProps) {
  
  // Reducer to manage the list of todos by delegating to single-todo reducer
  const listReducer = (state: ValidTodo[], action: any): ValidTodo[] => {
    if (action?.type === 'reset') return action.payload || [];
    const { index, ...todoAction } = action || {};
    if (typeof index !== 'number') return state;
    return state.map((item, i) => (i === index ? (reducer(item, todoAction) ?? item) : item));
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [editedCategorization, listDispatch] = useReducer(listReducer, categorizationResult || []);
  const dispatch = React.useCallback((action: any) => {
    listDispatch({ ...action, index: currentIndex });
  }, [currentIndex]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showSnoozePicker, setShowSnoozePicker] = useState(false);

  console.log('editedCategorization', categorizationResult);

  useEffect(() => {
    listDispatch({ type: 'reset', payload: categorizationResult || [] });
  }, [categorizationResult]);

  console.log('editedCategorization', editedCategorization);
    
  if ( editedCategorization && editedCategorization.length === 0) {
    console.log('editedCategorization is null');
    return null;
  }

  const hasNext = currentIndex < editedCategorization.length - 1;
  const hasPrevious = currentIndex > 0;

  const goToNext = () => {
    if (hasNext) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    }
  };

  const goToPrevious = () => {
    if (hasPrevious) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
    }
  };

  const handleSave = () => {
    console.log('Saved:', editedCategorization);
    if (onSave) {
      onSave();
    } else {
      onClose();
    }
  };

  console.log('visible', visible);

  const formattedDate = editedCategorization[currentIndex].reminder?.date ?
  `${editedCategorization[currentIndex].reminder.date.year}-${String(editedCategorization[currentIndex].reminder.date.month).padStart(2, '0')}-${String(editedCategorization[currentIndex].reminder.date.day).padStart(2, '0')}` :
  '';

  const reminderText = getReminderText(editedCategorization[currentIndex].reminder);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* <View style={{ flex: 1, backgroundColor: 'red' }} /> */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View className="bg-gray-800 p-6 rounded-lg shadow-lg" style={{ width: '90%' }}>

                <TextInput
                  className="flex-1 text-white text-center text-3xl font-semibold p-2 border-b border-gray-300 mb-2"
                  value={editedCategorization[currentIndex].todo.heading}
                  onChangeText={text => dispatch({ type: "heading", payload: text })}
                  placeholder="No heading"
                  multiline
                />

                {/* Description */}
                <TextInput
                    className="flex-1 text-gray-400 p-2"
                    value={editedCategorization[currentIndex].todo.description}
                    onChangeText={text => dispatch({ type: "description", payload: text })}
                    placeholder="No description"
                    multiline
                />

            <View className="flex-row justify-around w-full mt-2 mb-4 gap-2">
                <TouchableOpacity
                    onPress={() => setShowCalendar(!showCalendar)}
                    className="flex-row items-center bg-blue-200 p-2 rounded-lg"
                >
                    <CalendarSvg size={20} />
                    <Text className="text-blue-800 ml-2">
                        {reminderText?.date || "Set Date"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setShowTimePicker(!showTimePicker)}
                    className="flex-row items-center bg-purple-200 p-2 rounded-lg"
                >
                    <ClockSvg size={20} />
                    <Text className="text-purple-800 ml-2">
                        {reminderText?.time || "Set Time"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {setShowSnoozePicker(!showSnoozePicker)}}
                    className="flex-row items-center bg-orange-200 p-2 rounded-lg"
                >
                    <SnoozeSvg size={20} />
                    <Text className="text-orange-800 ml-2">
                        {reminderText?.snooze || "Set Snooze"}
                    </Text>
                </TouchableOpacity>
            </View>

            <EditCalender 
                showCalendar={showCalendar} 
                formattedDate={formattedDate} 
                dispatch={dispatch} 
                setShowCalendar={setShowCalendar} 
            />
            <EditTime 
                showTimePicker={showTimePicker} 
                editedTodo={editedCategorization[currentIndex]} 
                dispatch={dispatch} 
                setShowTimePicker={setShowTimePicker} 
            />
            <EditSnooze 
                showSnoozePicker={showSnoozePicker} 
                dispatch={dispatch} 
                setShowSnoozePicker={setShowSnoozePicker} 
            />

            <View className="flex-row justify-between w-full mt-2 mb-4 gap-2">
              <Pressable
                className='border border-gray-400 px-4 py-2 rounded-md'
                onPress={goToPrevious}
              >
                <Text className="text-gray-400">Previous</Text>
              </Pressable>
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-400">{currentIndex + 1} / {editedCategorization.length}</Text>
              </View>
              <Pressable
                className='border border-gray-400 px-4 py-2 rounded-md'
                onPress={goToNext}
              >
                <Text className="text-gray-400">Next</Text>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
