import { View, Text, ScrollView } from 'react-native';
import { dateCategorizeTodos } from '../utils/viewTodos/dateCategorizeTodos';
import TodoItem from '../components/viewTodos/TodoItem';
import { useEffect, useState } from 'react';
import CategorizationModal from '../components/addScreen/CategorizationModal';
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
                "hour": 8,
                "minute": 0
            },
            "snooze": {
                "snoozeHours": 1
            }
        }
    },
    {
        "todo": {
            "heading": "Go for a walk",
            "description": "I also have to go for a walk tomorrow."
        },
        "category": {
            "category": "other",
            "subcategory": "other"
        },
        "reminder": {
            "date": {
                "year": 2025,
                "month": 10,
                "day": 16
            },
            "time": {
                "hour": 12,
                "minute": 30
            },
            "snooze": {
                "snoozeHours": 60
            }
        }
    }
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
    // await storeTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  const handleMarkAsComplete = async (todo: ValidTodo) => {
    // User will fill this function to mark todo as complete
    console.log("Marking as complete:", todo.todo.heading);
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
    </View>
  );
};