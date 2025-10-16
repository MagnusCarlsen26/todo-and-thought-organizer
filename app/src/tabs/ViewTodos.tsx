import { View, Text, ScrollView } from 'react-native';
import { dateCategorizeTodos } from '../utils/viewTodos/dateCategorizeTodos';
import TodoItem from '../components/viewTodos/TodoItem';
import { useEffect, useState } from 'react';
import CategorizationModal from '../components/addScreen/CategorizationModal';
import { ValidTodo } from '../constants/todo.type';
import { DARK_COLORS } from '../constants/categoryPalette';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSavedTodos, storeTodosIOService } from '../service/todoIOService';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function ViewTodos() {

  const [todos, setTodos] = useState<ValidTodo[]>([]);
  

  useFocusEffect(
    useCallback(() => {
      const fetchTodos = async () => {
        const latestTodos = await getSavedTodos();
        setTodos(latestTodos);
      };
  
      fetchTodos();
  
      // Optional cleanup function (for safety)
      return () => {};
    }, [])
  );
  const dateCategorizedTodos = dateCategorizeTodos(todos);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ValidTodo | null>(null);

  const handleEditTodo = (todo: ValidTodo) => {
    setSelectedTodo(todo);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTodo(null);
  };

  const handleDeleteTodo = async (todo: ValidTodo) => {
    const updatedTodos = todos.filter(item => item.todo.heading !== todo.todo.heading);
    await storeTodosIOService(updatedTodos);
    setTodos(updatedTodos);
  };

  const handlePersistEdits = async (editedTodos: ValidTodo[]) => {
    // Replace by heading key; if heading is edited, we match by previous selectedTodo heading
    const previousHeading = selectedTodo?.todo.heading;
    const originalIndex = todos.findIndex(t => t.todo.heading === previousHeading);
    let nextTodos = [...todos];
    if (originalIndex !== -1) {
      // If multiple edited items come in, replace the one corresponding to the opened item
      const editedForThis = editedTodos[0] ?? selectedTodo;
      nextTodos[originalIndex] = editedForThis as ValidTodo;
    }
    await storeTodosIOService(nextTodos);
    setTodos(nextTodos);
  };

  const handleMarkAsComplete = async (todo: ValidTodo) => {
    // User will fill this function to mark todo as complete
    console.log("Marking as complete:", todo.todo.heading);
  };

  return (
    <SafeAreaView className="p-1" style={{ backgroundColor: DARK_COLORS.appBackground }} edges={['top', 'bottom']}>
      <ScrollView className='m-1'>
        {Object.keys(dateCategorizedTodos).map(category => (
          <View key={category} className="mb-4">
            <Text className=" text-2xl font-bold mb-2" style={{ color: DARK_COLORS.title }}>{category}</Text>
            {dateCategorizedTodos[category].length > 0 ? (
              <View className="flex-row flex-wrap">
                {dateCategorizedTodos[category]
                  .map( todo => 
                    <View key={todo.todo.heading} className="w-1/2 p-1">
                      <TodoItem 
                        item={todo} 
                        onEdit={() => handleEditTodo(todo)} 
                        onDelete={() => handleDeleteTodo(todo)}
                        onMarkAsComplete={() => handleMarkAsComplete(todo)}
                      />
                    </View>
                  )
                }
              </View>
            ) : (
              <Text className="ml-2" style={{ color: DARK_COLORS.metaText }}>No todos in this category.</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {selectedTodo && (
        <CategorizationModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          categorizationResult={[selectedTodo]}
          closeOnBackdropPress
          onSave={handlePersistEdits}
          onDelete={handleDeleteTodo}
        />
      )}
    </SafeAreaView>
  );
};