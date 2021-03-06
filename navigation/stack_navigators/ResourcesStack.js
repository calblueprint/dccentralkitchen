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

export default function ResourcesStackNavigator() {
  return (
    <ResourcesStack.Navigator
      screenOptions={{
        drawerLabel: 'Resources',
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
        config,
      }}>
      <ResourcesStack.Screen name="Resources" component={ResourcesScreen} />
    </ResourcesStack.Navigator>
  );
}
