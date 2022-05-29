import React from 'react';
import { Notifications } from './data/Notification';
import { NotificationScreen } from './screen/NotificationScreen';

const App = () => {

  return (
    <NotificationScreen data={Notifications} />
  );
};

export default App;
