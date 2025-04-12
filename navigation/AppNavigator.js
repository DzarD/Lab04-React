// navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddEventScreen from '../screens/AddEventScreen';
import EditEventScreen from '../screens/EditEventScreen';
import FavoriteEventsScreen from '../screens/FavoriteEventsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#0077A3' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerLeft: () => null }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="AddEvent" component={AddEventScreen} options={{ title: "Add New Event" }} />
      <Stack.Screen name="EditEvent" component={EditEventScreen} options={{ title: "Edit Event" }} />
      <Stack.Screen name="Favorites" component={FavoriteEventsScreen} options={{ title: "Favorite Events" }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
