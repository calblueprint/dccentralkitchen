import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import RewardsScreen from '../../screens/rewards/RewardsScreen';
import MyStoresStack from './StoresStack';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const RootStack = createStackNavigator();

export default function MyRootStack() {
  return (
    <RootStack.Navigator
      screenOptions={{
        mode: 'modal',
        config,
        headerShown: false,
      }}>
      <RootStack.Screen name="MainStack" component={MyStoresStack} />
      <RootStack.Screen name="RewardsOverlay" component={RewardsScreen} />
    </RootStack.Navigator>
  );
}
