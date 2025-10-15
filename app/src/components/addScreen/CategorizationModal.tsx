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
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LeftArrowSvg from '../../assets/svgs/leftArrowSvg';
import RightArrowSvg from '../../assets/svgs/rightArrowSvg';

type CategorizationModalProps = {
  visible: boolean;
  onClose: () => void;
  categorizationResult: ValidTodo[];
  onSave?: () => void;
  onDelete?: () => void;
};

export default function CategorizationModal({ 
  visible, 
  onClose, 
  categorizationResult, 
  onSave,
  onDelete
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

  const handleDelete = () => {
    console.log('Deleted:', editedCategorization);
    if (onClose) {
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
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        edges={['bottom']}
      >
        <KeyboardAwareScrollView 
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          extraScrollHeight={categorizationResult?.length > 1 ? 120 : 240}
        >
            <View className="bg-slate-950 p-6 rounded-lg shadow-lg border border-gray-500" style={{ width: '100%' }}>

                  <View className="flex-row justify-between w-full mt-2 mb-6 gap-2">
                    <DeleteButton handleDelete={handleDelete} />
                    <SaveButton handleSave={handleSave} />
                  </View>

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

              <View className="flex-row w-full mt-2 mb-4 gap-2">
                  <TouchableOpacity
                      onPress={() => setShowCalendar(!showCalendar)}
                      className="flex-row items-center bg-blue-200 p-2 rounded-lg w-1/2 justify-center"
                  >
                      <CalendarSvg size={30} />
                      <Text className="text-blue-800 ml-2 text-3xl">
                          {reminderText?.date || "Set Date"}
                      </Text>
                  </TouchableOpacity>

                  <View className='w-1/2 gap-2'>
                    <TouchableOpacity
                        onPress={() => setShowTimePicker(!showTimePicker)}
                        className="flex-row items-center bg-purple-200 p-2 rounded-lg justify-center"
                    >
                        <ClockSvg size={22} />
                        <Text className="text-purple-800 ml-2 text-xl">
                            {reminderText?.time || "Set Time"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {setShowSnoozePicker(!showSnoozePicker)}}
                        className="flex-row items-center bg-orange-200 p-2 rounded-lg justify-center"
                    >
                        <SnoozeSvg size={22} />
                        <Text className="text-orange-800 ml-2 text-xl">
                            {reminderText?.snooze || "Set Snooze"}
                        </Text>
                    </TouchableOpacity>
                  </View>

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

              {editedCategorization.length > 1 && <View className="flex-row justify-between w-full mt-12 mb-2 gap-2">
                <Pressable
                  className='border border-gray-400 px-10 py-4 rounded-md disabled:opacity-50 flex-row items-center'
                  onPress={goToPrevious}
                  disabled={currentIndex === 0}
                >
                  <LeftArrowSvg stroke={'#9ca3af'} width={20} height={20} />
                </Pressable>
                <View className="flex-1 items-center justify-center">
                  <Text className="text-gray-400">{currentIndex + 1} / {editedCategorization.length}</Text>
                </View>
                <Pressable
                  className='border border-gray-400 px-10 py-4 rounded-md disabled:opacity-50 flex-row items-center'
                  onPress={goToNext}
                  disabled={currentIndex === editedCategorization.length - 1}
                >
                  <RightArrowSvg stroke={'#9ca3af'} width={20} height={20} />
                </Pressable>
              </View>}

            </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

    </Modal>
  );
}

function SaveButton({ handleSave }: { handleSave: () => void }) {
  return (
    <Pressable
      className='px-4 py-2 rounded-md disabled:opacity-50 bg-green-700'
      onPress={handleSave}
    >
      <Text className="text-white font-bold">Save</Text>
    </Pressable>
  )
}

function DeleteButton({ handleDelete }: { handleDelete: () => void }) {
  return (
    <Pressable
      className='px-4 py-2 rounded-md disabled:opacity-50 bg-red-700'
      onPress={handleDelete}
    >
      <Text className="text-white font-bold">Delete</Text>
    </Pressable>
  )
}