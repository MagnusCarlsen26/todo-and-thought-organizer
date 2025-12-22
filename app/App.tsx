import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import requestNotificationPermission from './src/utils/permissions/notificationPermission';
import * as Notifications from 'expo-notifications';
import { AddIcon, TodosIcon, NotesIcon } from './src/assets/svgs/navSvgs';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import AddScreen from './src/tabs/AddScreen';
import ViewTodos from './src/tabs/ViewTodos';
import ViewNotes from './src/tabs/ViewNotes';
import SideBar from './src/components/sideBar/sideBar';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // Use new fields per expo-notifications 0.32+:
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

    useEffect(() => {
      requestNotificationPermission();
    }, []);

    return (
    <GestureHandlerRootView className="flex-1 bg-slate-950">
      <NavigationContainer theme={DarkTheme}>
        <StatusBar style="light" backgroundColor="#0b0f16" />
        <Drawer.Navigator drawerContent={props => <SideBar />}>
          <Drawer.Screen name=" " component={AppTabs} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const AppTabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        
      }}
      initialRouteName="Add"
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
  );
}

const screenOptions = {headerShown: false,
        tabBarActiveTintColor: '#93c5fd',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#0b0f16',
          borderTopColor: '#111827'
        },
        tabBarLabelStyle: {
          fontSize: 12
        }}