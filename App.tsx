import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { MenuProvider } from './context/MenuContext';

export default function App() {
  return (
    <MenuProvider>
      <AppNavigator />
    </MenuProvider>
  );
}
