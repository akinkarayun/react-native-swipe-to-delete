import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './navigation/DrawerNavigation';
import { TabNavigation } from './navigation/TabNavigation';

const App = () => {

  return (
    <>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </>

  );
};

export default App;



