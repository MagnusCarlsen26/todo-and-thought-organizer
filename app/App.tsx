import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewTodos from './src/tabs/ViewTodos';
import AddScreen from './src/tabs/AddScreen';
import ViewNotes from './src/tabs/ViewNotes';

import { AddIcon, TodosIcon, NotesIcon } from './src/assets/svgs/navSvgs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>

        <Tab.Screen
          name="Todos"
          component={ViewTodos}
          options={{
            tabBarIcon: ({ color, size }) => <TodosIcon color={color} size={size} />
          }} 
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({ color, size }) => <AddIcon color={color} size={size} />
          }} 
        />
        <Tab.Screen
          name="Notes"
          component={ViewNotes}
          options={{
            tabBarIcon: ({ color, size }) => <NotesIcon color={color} size={size} />
          }} 
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}