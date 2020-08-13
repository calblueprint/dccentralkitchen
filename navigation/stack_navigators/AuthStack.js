import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Colors from '../../constants/Colors';
import CompleteSignUpScreen from '../../screens/auth/CompleteSignUpScreen';
import OnboardingScreen from '../../screens/auth/OnboardingScreen';
import PhoneNumberScreen from '../../screens/auth/PhoneNumberScreen';
import VerificationScreen from '../../screens/auth/VerificationScreen';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
      }}>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <AuthStack.Screen name="Verify" component={VerificationScreen} />
      <AuthStack.Screen
        name="CompleteSignUp"
        component={CompleteSignUpScreen}
      />
    </AuthStack.Navigator>
  );
}
