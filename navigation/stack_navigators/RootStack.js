import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RewardsScreen from '../../screens/rewards/RewardsScreen';
import config from '../AppNavigator';
import MyStoresStack from './StoresStack';

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
