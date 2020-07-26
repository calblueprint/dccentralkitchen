import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Colors from '../../constants/Colors';
import CompleteSignUpScreen from '../../screens/auth/CompleteSignUpScreen';
import LogInScreen from '../../screens/auth/LogInScreen';
import OnboardingScreen from '../../screens/auth/OnboardingScreen';
import PasswordResetScreen from '../../screens/auth/PasswordResetScreen';
import PhoneNumberScreen from '../../screens/auth/PhoneNumberScreen';
import SignUpScreen from '../../screens/auth/SignUpScreen';
import VerificationScreen from '../../screens/auth/VerificationScreen';
import WelcomeScreen from '../../screens/auth/WelcomeScreen';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.bgLight },
      }}>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <AuthStack.Screen name="Verify" component={VerificationScreen} />
      <AuthStack.Screen
        name="CompleteSignUp"
        component={CompleteSignUpScreen}
      />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="LogIn" component={LogInScreen} />
      <AuthStack.Screen name="Reset" component={PasswordResetScreen} />
    </AuthStack.Navigator>
  );
}
