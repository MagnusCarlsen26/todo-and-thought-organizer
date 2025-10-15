import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ValidTodo } from "../../constants/todo.type";

interface SwipeableContentProps {
  todo: ValidTodo;
  onClose: () => void;
  onConfirmAction: (todo: ValidTodo) => void;
  actionText: string;
  actionDescription: string;
  actionColor: string;
}

export default function SwipeableContent({
  todo,
  onClose,
  onConfirmAction,
  actionText,
  actionDescription,
  actionColor,
}: SwipeableContentProps) {
  return (
    <View className="bg-white p-4 rounded-lg items-center">
      <Text className="text-lg font-bold mb-4">{actionText}</Text>
      <Text className="text-center mb-6">{actionDescription}</Text>
      <View className="flex-row justify-around w-full">
        <TouchableOpacity
          className="bg-gray-300 py-2 px-4 rounded-lg"
          onPress={onClose}
        >
          <Text className="text-gray-800 font-bold">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${actionColor} py-2 px-4 rounded-lg`}
          onPress={() => onConfirmAction(todo)}
        >
          <Text className="text-white font-bold">{actionText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
