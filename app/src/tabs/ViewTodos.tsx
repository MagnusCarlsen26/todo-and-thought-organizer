import { View, Text, ScrollView } from 'react-native';
import { dateCategorizeTodos } from '../utils/viewTodos/dateCategorizeTodos';
import TodoItem from '../components/viewTodos/TodoItem';
import { useEffect, useState } from 'react';
import CategorizationModal from '../components/addScreen/CategorizationModal';
import SwipeableModal from '../components/viewTodos/SwipeableModal';
import SwipeableContent from '../components/viewTodos/SwipeableContent';
import { ValidTodo } from '../constants/todo.type';
// import { getTodosAsyncStorage } from '../service/asyncStorageService';

export default function ViewTodos() {

  const [todos, setTodos] = useState<ValidTodo[]>([
    {
        "todo": {
            "heading": "Buy pencil cell",
            "description": "Remind me to buy pencil cell tomorrow."
        },
        "category": {
            "category": "Shopping",
            "subcategory": "Offline Shopping"
        },
        "reminder": {
            "date": {
                "year": 2025,
                "month": 10,
                "day": 16
            },
            "time": {
                "hour": null,
                "minute": null
            },
            "snooze": {
                "snoozeHours": null
            }
        }
    },
    // {
    //     "todo": {
    //         "heading": "Go for a walk",
    //         "description": "I also have to go for a walk tomorrow."
    //     },
    //     "category": {
    //         "category": "other",
    //         "subcategory": "other"
    //     },
    //     "reminder": {
    //         "date": {
    //             "year": 2025,
    //             "month": 10,
    //             "day": 16
    //         },
    //         "time": {
    //             "hour": null,
    //             "minute": null
    //         },
    //         "snooze": {
    //             "snoozeHours": null
    //         }
    //     }
    // }
]);
  
  const fetchTodos = async () => {
    console.log("fetching todos");
    // const latestTodos = await getTodosAsyncStorage();
    // console.log("Latest todos:", latestTodos);
    // setTodos(latestTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const dateCategorizedTodos = dateCategorizeTodos(todos);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ValidTodo | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<ValidTodo | null>(null);
  const [isMarkAsCompleteModalVisible, setIsMarkAsCompleteModalVisible] = useState(false);
  const [todoToMarkAsComplete, setTodoToMarkAsComplete] = useState<ValidTodo | null>(null);

  const handleEditTodo = (todo: ValidTodo) => {
    setSelectedTodo(todo);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTodo(null);
  };

  const handleDeleteTodo = (todo: ValidTodo) => {
    setTodoToDelete(todo);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async (todo: ValidTodo) => {
    const updatedTodos = todos.filter(item => item.todo.heading !== todo.todo.heading);
    // await storeTodos(updatedTodos);
    setTodos(updatedTodos);
    setIsDeleteModalVisible(false);
    setTodoToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setTodoToDelete(null);
  };

  const handleMarkAsComplete = (todo: ValidTodo) => {
    setTodoToMarkAsComplete(todo);
    setIsMarkAsCompleteModalVisible(true);
  };

  const handleConfirmMarkAsComplete = async (todo: ValidTodo) => {
    // User will fill this function to mark todo as complete
    console.log("Marking as complete:", todo.todo.heading);
    setIsMarkAsCompleteModalVisible(false);
    setTodoToMarkAsComplete(null);
  };

  const handleCloseMarkAsCompleteModal = () => {
    setIsMarkAsCompleteModalVisible(false);
    setTodoToMarkAsComplete(null);
  };

  return (
    <View className="m-1">
      <ScrollView className='m-1'>
        {Object.keys(dateCategorizedTodos).map(category => (
          <View key={category} className="mb-4">
            <Text className="text-2xl font-bold mb-2">{category}</Text>
            {dateCategorizedTodos[category].length > 0 ? (
              dateCategorizedTodos[category]
                .map( todo => 
                  <TodoItem 
                    item={todo} 
                    key={todo.todo.heading} 
                    onEdit={() => handleEditTodo(todo)} 
                    onDelete={() => handleDeleteTodo(todo)}
                    onMarkAsComplete={() => handleMarkAsComplete(todo)}
                  />
                )
            ) : (
              <Text className="text-gray-500 ml-2">No todos in this category.</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {selectedTodo && (
        <CategorizationModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          categorizationResult={[selectedTodo]}
        />
      )}

      {todoToDelete && (
        <SwipeableModal
          isVisible={isDeleteModalVisible}
          onClose={handleCloseDeleteModal}
        >
          <SwipeableContent
            todo={todoToDelete}
            onClose={handleCloseDeleteModal}
            onConfirmAction={handleConfirmDelete}
            actionText="Delete"
            actionDescription="Are you sure you want to delete this todo?"
            actionColor="bg-red-500"
          />
        </SwipeableModal>
      )}

      {todoToMarkAsComplete && (
        <SwipeableModal
          isVisible={isMarkAsCompleteModalVisible}
          onClose={handleCloseMarkAsCompleteModal}
        >
          <SwipeableContent
            todo={todoToMarkAsComplete}
            onClose={handleCloseMarkAsCompleteModal}
            onConfirmAction={handleConfirmMarkAsComplete}
            actionText="Mark as Complete"
            actionDescription="Are you sure you want to mark this todo as complete?"
            actionColor="bg-green-500"
          />
        </SwipeableModal>
      )}
    </View>
  );
};