import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NotificationScreen } from '../screen/NotificationScreen';
import { AddItemToListScreen } from '../screen/AddItemToListScreen';
import { Notifications } from '../data/Notification';

interface TabNavigationProps { }

export const TabNavigation: React.FC<TabNavigationProps> = ({ }) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'AddItem') {
            iconName = focused ? 'list-circle-sharp' : 'list-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName ?? ''} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        initialParams={Notifications}
      />
      <Tab.Screen name="AddItem" component={AddItemToListScreen} />
    </Tab.Navigator>
  );
};
