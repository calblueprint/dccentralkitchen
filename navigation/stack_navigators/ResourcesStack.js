import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ResourcesScreen from '../../screens/resources/ResourcesScreen';
import config from '../AppNavigator';

const ResourcesStack = createStackNavigator();

export default function MyResourcesStack() {
  return (
    <ResourcesStack.Navigator
      screenOptions={{ drawerLabel: 'Rewards', headerShown: false, config }}>
      <ResourcesStack.Screen name="Resources" component={ResourcesScreen} />
    </ResourcesStack.Navigator>
  );
}
