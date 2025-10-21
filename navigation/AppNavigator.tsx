import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import GuestMenuScreen from '../screens/GuestMenuScreen';
import GuestFilterScreen from '../screens/GuestFilterScreen';
import MenuManagementScreen from '../screens/MenuManagementScreen';
import DishSelectionScreen from '../screens/DishSelectionScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  GuestMenu: { filter?: string } | undefined;
  GuestFilter: undefined;
  MenuManagement: undefined;
  DishSelection: { course: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="GuestMenu" component={GuestMenuScreen} />
        <Stack.Screen name="GuestFilter" component={GuestFilterScreen} />
        <Stack.Screen name="MenuManagement" component={MenuManagementScreen} />
        <Stack.Screen name="DishSelection" component={DishSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
