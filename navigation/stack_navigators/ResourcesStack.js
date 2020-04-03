import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import ResourcesScreen from '../../screens/resources/ResourcesScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ResourcesStack = createStackNavigator();

export default function MyResourcesStack() {
  return (
    <ResourcesStack.Navigator
      screenOptions={{ drawerLabel: 'Rewards', headerShown: false, config }}>
      <ResourcesStack.Screen name="Resources" component={ResourcesScreen} />
    </ResourcesStack.Navigator>
  );
}
