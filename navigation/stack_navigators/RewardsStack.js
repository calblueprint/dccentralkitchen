import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import RewardsScreen from '../../screens/rewards/RewardsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerMode: 'none',
  },
});

const RewardsStack = createStackNavigator();

export default function RewardsStackNavigator() {
  return (
    <RewardsStack.Navigator
      screenOptions={{
        cardOverlayEnabled: true,
        drawerLabel: 'Rewards',
        gestureEnabled: true,
        headerShown: false,
        cardStyle: { backgroundColor: Colors.lightest },
        config,
      }}>
      <RewardsStack.Screen
        name="RewardsOverlay"
        component={RewardsScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          gestureDirection: 'vertical',
          gestureResponseDistance: {
            vertical: 162 + useSafeArea().top,
          },
        }}
      />
    </RewardsStack.Navigator>
  );
}
