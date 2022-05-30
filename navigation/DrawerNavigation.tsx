import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { TabNavigation } from './TabNavigation';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DrawerNavigationProps { }

function CustomDrawerContent(props: DrawerNavigationProps) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView>
      <DrawerItem
        activeBackgroundColor="red"
        inactiveBackgroundColor="white"
        icon={({ color, size }) => (
          <Ionicons name="notifications" color={color} size={size} />
        )}
        label="Notification"
        onPress={() => navigation.navigate('Notification' as any)}
      />
      <DrawerItem
        activeBackgroundColor="red"
        inactiveBackgroundColor="white"
        icon={({ color, size }) => (
          <Ionicons name="list-circle-sharp" color={color} size={size} />
        )}
        label="AddItem"
        onPress={() => navigation.navigate('AddItem' as any)}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export const DrawerNavigation: React.FC<DrawerNavigationProps> = ({ }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Notification"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Nested" component={TabNavigation} />
    </Drawer.Navigator>
  );
};
