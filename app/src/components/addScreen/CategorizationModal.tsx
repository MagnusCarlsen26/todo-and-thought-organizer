import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { ValidTodo } from '../../constants/todo.type';

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
  
  console.log('categorizationResult', categorizationResult);

  const [editedCategorization, setEditedCategorization] = useState<ValidTodo[]>(categorizationResult);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log('visible', visible);

  useEffect(() => {
    
    let temp = categorizationResult
    setEditedCategorization(temp);

  }, [categorizationResult]);

  console.log('editedCategorization', editedCategorization);
    
  if (editedCategorization.length === 0) {
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
  
  const renderReminder = () => {
    const reminder = editedCategorization[currentIndex].reminder;
    if (!reminder) return <Text className="text-gray-400">No reminder set</Text>;
  
    const { date, time } = reminder;
    const dateString = date ? `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}` : 'No date';
    const timeString = time ? `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}` : 'No time';
  
    return (
      <View>
        <Text className="text-white text-lg font-semibold">Reminder</Text>
        <Text className="text-white">Date: {dateString}</Text>
        <Text className="text-white">Time: {timeString}</Text>
      </View>
    );
  };

  console.log('visible', visible);

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
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-2xl font-bold">Categorized Todo</Text>
              {editedCategorization.length > 1 && (
                <Text className="text-white text-sm">
                  {currentIndex + 1} of {editedCategorization.length}
                </Text>
              )}
            </View>
            
            <View className="mb-4">
              <Text className="text-white text-lg font-semibold">Heading</Text>
              <TextInput
                className="bg-gray-700 text-white rounded p-2 mt-1"
                value={editedCategorization[currentIndex].todo.heading}
                // onChangeText={(text) => setEditedCategorization({ ...editedCategorization, todo: { ...editedCategorization[currentIndex].todo, heading: text } })}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-white text-lg font-semibold">Description</Text>
              <TextInput
                className="bg-gray-700 text-white rounded p-2 mt-1 h-24"
                value={editedCategorization[currentIndex].todo.description}
                // onChangeText={(text) => setEditedCategorization({ ...editedCategorization, todo: { ...editedCategorization[currentIndex].todo, description: text } })}
                multiline
              />
            </View>

            <View className="mb-4">
              <Text className="text-white text-lg font-semibold">Category</Text>
              <Text className="text-white">{editedCategorization[currentIndex].category.category}</Text>
              <Text className="text-sm text-gray-400">{editedCategorization[currentIndex].category.subcategory}</Text>
            </View>

            <View className="mb-4">
              {renderReminder()}
            </View>

            <View className="flex-row justify-around mt-4">
              {editedCategorization.length > 1 && (
                <View className="flex-row justify-between w-full mb-2">
                  <Button
                    title="Previous"
                    onPress={goToPrevious}
                    disabled={!hasPrevious}
                    color="#9E9E9E"
                  />
                  <Button
                    title="Next"
                    onPress={goToNext}
                    disabled={!hasNext}
                    color="#9E9E9E"
                  />
                </View>
              )}
              <View className="flex-row justify-around w-full">
                <Button title="Cancel" onPress={onClose} color="#f44336" />
                <Button title="Save" onPress={handleSave} color="#4CAF50" />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
