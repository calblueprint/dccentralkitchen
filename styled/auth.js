import styled from 'styled-components/native';
import Colors from '../assets/Colors';

// TODO @tommypoa: Consider creating re-usable containers taking in props for the 3 Auth screens

// Shared Auth Containers

export const AuthScreenContainer = styled.View`
  margin: 79px 42px 0 42px;
  background-color: #fff;
`;

// WelcomeScreen
// TODO @tommypoa: margin-top should be corrected to sit right above keyboard (as in Login and SignUp screens)
export const WelcomeContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 241px 42px;
`;

export const WelcomeTitleContainer = styled.View`
  margin: 0 12.5%;
`;

export const WelcomeLoginContainer = styled.View`
  width: 291px
  margin: 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// LoginScreen

// Margin-top value is 140 (figma) - 36 (input margin bottom) = 104px.

export const ForgotPasswordButtonContainer = styled.View`
  margin-top: 13px;
`;

export const ErrorMsg = styled.Text`
  font-size: 14px;
  text-align: center;
`;

export const TextFieldContainer = styled.View`
  margin-bottom: 36px;
`;

export const FormContainer = styled.View`
  margin-top: 32px;
`;

// TODO @tommypoa Check if Text Input can take in Text component from BaseComponents
export const TextField = styled.TextInput`
  font-family: poppins-regular;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  height: 36px;
  border-bottom-color: ${props => props.borderColor || Colors.activeText};
  border-bottom-width: 2px;
`;
