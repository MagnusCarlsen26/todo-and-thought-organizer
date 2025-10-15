import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import ViewTodos from './src/tabs/ViewTodos';
import AddScreen from './src/tabs/AddScreen';
import ViewNotes from './src/tabs/ViewNotes';

import { AddIcon, TodosIcon, NotesIcon } from './src/assets/svgs/navSvgs';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1 bg-slate-950">
      <NavigationContainer theme={DarkTheme}>
        <StatusBar style="light" backgroundColor="#0b0f16" />
        <Tab.Navigator 
          screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#93c5fd',
            tabBarInactiveTintColor: '#6b7280',
            tabBarStyle: {
              backgroundColor: '#0b0f16',
              borderTopColor: '#111827'
            },
            tabBarLabelStyle: {
              fontSize: 12
            }
          }}
          initialRouteName="Todos"
        >
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
    </GestureHandlerRootView>
  );
}