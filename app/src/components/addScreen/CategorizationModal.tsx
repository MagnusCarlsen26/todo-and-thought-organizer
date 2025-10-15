import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, Pressable } from 'react-native';

import { ValidTodo } from '../../constants/todo.type';
import { getReminderText } from '../../utils/addScreen/getReminder';
import { listReducer } from '../editTodo/utils/editTodoReducer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LeftButtons, RightButtons } from '../editTodo/buttons/ArrowButtons';
import { goToNext, goToPrevious } from '../editTodo/utils/navTodos';
import { handleSave, handleDelete } from '../editTodo/utils/handleConfirmation';

import CalendarSvg from '../../assets/svgs/calenderSvg';
import ClockSvg from '../../assets/svgs/clockSvg';
import SnoozeSvg from '../../assets/svgs/snoozeSvg';

import EditCalender from '../editTodo/editCalender';
import EditTime from '../editTodo/editTime';
import EditSnooze from '../editTodo/editSnooze';

import DeleteButton from '../editTodo/buttons/DeleteButton';
import SaveButton from '../editTodo/buttons/SaveButton';

type CategorizationModalProps = {
  visible: boolean;
  onClose: () => void;
  categorizationResult: ValidTodo[];
  closeOnBackdropPress?: boolean;
  onSave?: (editedTodos: ValidTodo[]) => void;
  onDelete?: (todoToDelete: ValidTodo) => void;
};

export default function CategorizationModal({ 
  visible, 
  onClose, 
  categorizationResult, 
  closeOnBackdropPress = false,
  onSave,
  onDelete,
}: CategorizationModalProps) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [editedCategorization, listDispatch] = useReducer(listReducer, categorizationResult || []);
  const dispatch = React.useCallback((action: any) => {
    listDispatch({ ...action, index: currentIndex });
  }, [currentIndex]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showSnoozePicker, setShowSnoozePicker] = useState(false);

  useEffect(() => {
    listDispatch({ type: 'reset', payload: categorizationResult || [] });
  }, [categorizationResult]);

  if ( editedCategorization && editedCategorization.length === 0) {
    return null;
  }

  const hasNext = currentIndex < editedCategorization.length - 1;
  const hasPrevious = currentIndex > 0;

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
            {closeOnBackdropPress && (
              <Pressable
                onPress={onClose}
                // Fills available space above the bottom sheet to capture backdrop taps
                style={{ flexGrow: 1, alignSelf: 'stretch' }}
              />
            )}
            <View className="bg-slate-950 p-6 rounded-lg shadow-lg border border-gray-500" style={{ width: '100%' }}>

                  <View className="flex-row justify-between w-full mt-2 mb-6 gap-2">
                    <DeleteButton handleDelete={() => handleDelete(onClose, onDelete, editedCategorization[currentIndex])} />
                    <SaveButton handleSave={() => handleSave(onClose, onSave, editedCategorization)} />
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
                <LeftButtons goToPrevious={() => goToPrevious(hasPrevious, currentIndex, setCurrentIndex)} disabled={currentIndex === 0} />
                <View className="flex-1 items-center justify-center">
                  <Text className="text-gray-400">{currentIndex + 1} / {editedCategorization.length}</Text>
                <RightButtons goToNext={() => goToNext(hasNext, currentIndex, setCurrentIndex)} disabled={currentIndex === editedCategorization.length - 1} />
                </View>
              </View>}

            </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

    </Modal>
  );
}