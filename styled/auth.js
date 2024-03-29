import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { NavButtonContainer } from '../components/BaseComponents';
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

// OnboardingScreen
export const OnboardingContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-horizontal: 40px;
  padding: 75px 0px;
`;

// PermissionsScreen
export const PermissionsContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: space-between
  margin: 40px 24px;
`;

export const OnboardingContentContainer = styled.View`
  flex: 1;
`;

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

export const BackButton = styled(NavButtonContainer)`
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
