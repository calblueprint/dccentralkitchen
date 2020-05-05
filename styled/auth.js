import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { NavButton } from '../components/BaseComponents';
import Colors from '../constants/Colors';
import { ColumnContainer } from './shared';

// TODO @tommypoa: Consider creating re-usable containers taking in props for the 3 Auth screens

// Shared Auth Containers

export const AuthScreenContainer = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : null,
})`
  flex: 1;
  flex-direction: column;
  margin-horizontal: 42px;
`;
// ScrollView nested inn AuthScreenContainer for keyboard avoiding behavior
export const AuthScrollContainer = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'always',
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

// OnboardingScreen
export const OnboardingContainer = styled.View`
  display: flex;
  flex: 1
  justify-content: center;
  background-color: ${Colors.lightest};
  margin: 200px 40px 75px 40px;
`;

// WelcomeScreen
// TODO @tommypoa: margin-top should be corrected to sit right above keyboard (as in LogIn and SignUp screens)
export const WelcomeContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.lightest};
  margin: 240px 42px;
`;

// LogInScreen

// Used in AuthTextField
// Hardcoded 80px to avoid having the animations when errors show for LoginScreen
export const TextFieldContainer = styled.View`
  margin-bottom: 16px;
  height: 80px;
`;

export const FormContainer = styled(ColumnContainer)`
  justify-content: center;
  align-items: stretch;
  margin-top: 20px;
`;

export const BackButton = styled(NavButton)`
  position: relative;
  margin-top: 50px;
  left: -8px;
  margin-bottom: 8px;
`;

// OnboardingScreen pagination styles
export const styles = StyleSheet.create({
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: Colors.primaryGreen,
  },
});
