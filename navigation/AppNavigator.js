import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Analytics from 'expo-firebase-analytics';
import React from 'react';
import Colors from '../constants/Colors';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import DrawerContent from './DrawerContent';
import AuthStackNavigator from './stack_navigators/AuthStack';
import ResourcesStackNavigator from './stack_navigators/ResourcesStack';
import StoresStackNavigator from './stack_navigators/StoresStack';

const Drawer = createDrawerNavigator();

const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={{ width: 189 }}
      drawerContentOptions={{
        labelStyle: {
          fontFamily: 'poppins-medium',
          fontWeight: 'normal',
          fontSize: 20,
          color: Colors.activeText,
        },
        activeTintColor: Colors.primaryGreen,
        itemStyle: { marginVertical: 0, marginHorizontal: 0, borderRadius: 0 },
      }}>
      <Drawer.Screen
        name="Stores"
        component={StoresStackNavigator}
        options={{ title: 'Stores', swipeEnabled: false }}
      />
      {/* <Drawer.Screen
        name="Rewards"
        options={{ title: 'Points History', drawerLockMode: 'locked-closed' }}>
        {props => <RewardsScreen {...props} tab={1} />}
      </Drawer.Screen> */}
      <Drawer.Screen
        name="Resources"
        component={ResourcesStackNavigator}
        options={{ title: 'Resources', swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
}

const AppStack = createStackNavigator();

export default function createAppContainer() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        if (previousRouteName !== currentRouteName) {
          Analytics.setCurrentScreen(currentRouteName);
        }
        routeNameRef.current = currentRouteName;
      }}>
      <AppStack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.lightest },
          gestureEnabled: false,
        }}>
        <AppStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <AppStack.Screen
          name="App"
          component={DrawerNavigator}
          options={{ animationEnabled: false }}
        />
        <AppStack.Screen name="Auth" component={AuthStackNavigator} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
