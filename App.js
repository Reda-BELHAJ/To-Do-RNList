import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './Store';

import HomeScreen from './src/Screens/HomeScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import CreateScreen from './src/Screens/CreateScreen';
import SignInScreen from './src/Screens/SignInScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import ResolveAuthScreen from './src/Screens/ResolveAuthScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const HomeTabScreens = () => (
  <Tab.Navigator
    screenOptions={
      ({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'list-circle'
            : 'list-circle-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        size = focused ? size + 7 : size;

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Tasks'}} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const AuthScreens = () => (
  <AuthStack.Navigator >
    <AuthStack.Screen name="ResolveAuthScreen" component={ResolveAuthScreen} options={{headerShown: false}} />
    <AuthStack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}} />
    <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}} />
  </AuthStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <PaperProvider>
          <Stack.Navigator >
            <Stack.Screen name="AuthScreen" component={AuthScreens} options={{headerShown: false}} />
            <Stack.Screen name="HomeTab" component={HomeTabScreens} options={{headerShown: false}} />
            <Stack.Screen name="CreateScreen" component={CreateScreen} options={{title: 'Create a Task'}} />
          </Stack.Navigator>
        </PaperProvider>
      </ReduxProvider>
    </NavigationContainer>
  );
}