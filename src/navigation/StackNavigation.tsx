import React, {useEffect, useState} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@app/types';
import {useAppSelector} from '@app/store';
import Splash from '@screens/public/auth/Splash';
import SignIn from '@screens/public/auth/SignIn';
import SignUp from '@screens/public/auth/SignUp';
import {navigationRef} from './RootNaivgation';
import Home from '@screens/protected/home';
import Notifications from '@screens/protected/notifications';
import Resources from '@screens/protected/resources';
import Settings from '@screens/protected/settings';

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const isToken = useAppSelector(state => state.auth.token);

  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const AuthScreens = {
    // Auth
    SignIn: SignIn,
    SignUp: SignUp,
  };

  const MainScreens = {
    // Auth
    Home: Home,
    Settings: Settings,
    Resources: Resources,
    Notifications: Notifications,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // End splash after 1.5 seconds
    }, 1500);

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  const Screens = isToken ? MainScreens : AuthScreens;

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {Object.entries(Screens).map(([name, component], index) => (
          <Stack.Screen
            key={index}
            name={name as keyof RootStackParamList} // Casting the name to RootStackParamList keys
            component={
              component as React.ComponentType<
                StackScreenProps<RootStackParamList>
              >
            }
            options={{gestureEnabled: true}}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
