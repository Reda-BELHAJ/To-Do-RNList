import React, { useState, useEffect, useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
      registerForPushNotificationsAsync().then(token =>
          setExpoPushToken(token)
      );

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
      });
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
          const {notification: {request: {content: {data: {screen}}}}} = response
          if (screen) {
              props.navigation.navigate(screen)
          }
      });

      return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
      };
  }, []);

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

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
      const {status: existingStatus} = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
          const {status} = await Notifications.requestPermissionsAsync();
          finalStatus = status;
          console.log("existingStatus",existingStatus)
      }
      if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          console.log("finalStatus",finalStatus)
          return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
      alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          showBadge: true,
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FE9018',
      });
  }

  return token;
}