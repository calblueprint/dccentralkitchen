import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import ResourcesScreen from '../../screens/resources/ResourcesScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
  },
});

const ResourcesStack = createStackNavigator();

export default function MyResourcesStack() {
  return (
    <ResourcesStack.Navigator
      screenOptions={{
        drawerLabel: 'Rewards',
        headerShown: false,
        cardStyle: { backgroundColor: Colors.lightest },
        config,
      }}>
      <ResourcesStack.Screen name="Resources" component={ResourcesScreen} />
    </ResourcesStack.Navigator>
  );
}
