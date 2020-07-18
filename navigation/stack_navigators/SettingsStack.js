import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Colors from '../../constants/Colors';
import NameChangeScreen from '../../screens/settings/NameChangeScreen';
import PhoneNumberChangeScreen from '../../screens/settings/PhoneNumberChangeScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';

const SettingsStack = createStackNavigator();

export default function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
        gestureEnabled: false,
      }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Name" component={NameChangeScreen} />
      <SettingsStack.Screen name="Number" component={PhoneNumberChangeScreen} />
    </SettingsStack.Navigator>
  );
}
