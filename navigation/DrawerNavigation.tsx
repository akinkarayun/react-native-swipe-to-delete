import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import React from 'react'
import { Notifications } from '../data/Notification';
import { AddItemToListScreen } from '../screen/AddItemToListScreen';
import { NotificationScreen } from '../screen/NotificationScreen';
import { TabNavigation } from './TabNavigation';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/core';

interface DrawerNavigationProps {

}





// function CustomDrawerContent({ props }: any) {
//   const navigation = useNavigation()

//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="AddItem"
//         onPress={() => navigation.navigate('AddItem' as any)}
//       />
//     </DrawerContentScrollView>
//   );
// }



const Drawer = createDrawerNavigator();

export const DrawerNavigation: React.FC<DrawerNavigationProps> = ({ }) => {
  return (
    <Drawer.Navigator
    // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Notification" component={TabNavigation} />
      <Drawer.Screen name="AddItem" component={AddItemToListScreen} />

      {/* <Drawer.Screen name="AddItem" component={TabNavigation} /> */}
    </Drawer.Navigator>
  );
}