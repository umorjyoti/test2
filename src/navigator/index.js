import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import {AuthContext, AuthProvider} from '../Auth/AuthenticationProvider';
import auth from '@react-native-firebase/auth';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotifyTab from '../components/NotifyTab';
import PhotoTab from '../components/PhotoTab';
import TextTab from '../components/TextTab';
import CalculatorTab from '../components/CalculatorTab';
import {
  BellAlertIcon,
  CalculatorIcon,
  PencilIcon,
  PhotoIcon,
} from 'react-native-heroicons/solid';
import {BLACK, BLUE} from '../constants/strings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Provider = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }
  return (
    <NavigationContainer>
      {user ? <AppScreens /> : <AuthenticationScreen />}
    </NavigationContainer>
  );
};

const AppScreens = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Notify') {
              return <BellAlertIcon size={22} color={focused ? BLUE : BLACK} />;
            } else if (route.name === 'Photo') {
              return <PhotoIcon size={22} color={focused ? BLUE : BLACK} />;
            } else if (route.name === 'Text') {
              return <PencilIcon size={22} color={focused ? BLUE : BLACK} />;
            } else if (route.name === 'Calculator') {
              return (
                <CalculatorIcon size={22} color={focused ? BLUE : BLACK} />
              );
            }
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Notify" component={NotifyTab} />
        <Tab.Screen name="Photo" component={PhotoTab} />
        <Tab.Screen name="Text" component={TextTab} />
        <Tab.Screen name="Calculator" component={CalculatorTab} />
      </Tab.Navigator>
    </>
  );
};

const AuthenticationScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Provider;
