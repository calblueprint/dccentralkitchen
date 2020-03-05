import styled from 'styled-components/native';
import Colors from '../assets/Colors';

// StartUpScreen

export const StartUpContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-top: 241px;
`;

export const StartUpTitleContainer = styled.View`
  margin-left: 58px;
  margin-right: 47px;
`;

export const StartUpSignInContainer = styled.View`
  margin-top: 108px;
`;

export const StartUpLogInContainer = styled.View`
  margin-top: 16px;
  margin-left: 42px;
  margin-right: 47px;
  width: 286px
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// LoginScreen

export const LoginContainer = styled.View`
  margin: 79px 42px 0 42px;
  background-color: #fff;
`;

// Margin-top value is 140 (figma) - 36 (input margin bottom) = 104px.
export const LoginButtonContainer = styled.View`
  margin-top: 104px;
  margin-bottom: 13px;
  width: 286px;
`;

export const ErrorMsg = styled.Text`
  font-size: 14px;
  text-align: center;
`;

export const LoginInputsContainer = styled.View`
  margin-top: 32px;
`;

// TODO @tommypoa Check if Text Input can take in Text component from BaseComponents
export const Input = styled.TextInput`
  font-size: 18px;
  font-weight: 500;
  width: 291px;
  height: 36px;
  margin-bottom: 36px;
  border-bottom-color: ${Colors.primaryGreen};
  border-bottom-width: 2px;
`;

export const SignUpContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
