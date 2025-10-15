import { View, Text, ScrollView } from 'react-native';
import { dateCategorizeTodos } from '../utils/viewTodos/dateCategorizeTodos';
import TodoItem from '../components/viewTodos/TodoItem';
import { useEffect, useState } from 'react';
import CategorizationModal from '../components/addScreen/CategorizationModal';
import { ValidTodo } from '../constants/todo.type';
import { DARK_COLORS } from '../constants/categoryPalette';
// import { getTodosAsyncStorage } from '../service/asyncStorageService';

export default function ViewTodos() {

  const [todos, setTodos] = useState<ValidTodo[]>([
    {
      "todo": {
          "heading": "Go for a walk",
          "description": "I also have to go for a walk tomorrow."
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
              "hour": 12,
              "minute": 30
          },
          "snooze": {
              "snoozeHours": 60
          }
      }
    },
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
    <View className="m-1" style={{ backgroundColor: DARK_COLORS.appBackground }}>
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
        />
      )}
    </View>
  );
};