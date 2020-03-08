import styled from 'styled-components/native';
import Colors from '../assets/Colors';

// TODO @tommypoa: Consider creating re-usable containers taking in props for the 3 Auth screens

// Shared Auth Containers

export const AuthScreenContainer = styled.View`
  margin: 79px 42px 0 42px;
  background-color: #fff;
`;

// Default to Login Button margin top: 104px
export const AuthButtonContainer = styled.View`
  margin-top: ${props => props.marginTop || '104px'};
  width: 286px;
`;

// StartUpScreen

export const StartUpContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-top: 241px;
`;

export const StartUpTitleContainer = styled.View`
  margin: 0 12.5%;
`;

export const StartUpSignInContainer = styled.View`
  margin-top: 108px;
  width: 286px;
`;

export const StartUpLogInContainer = styled.View`
  margin: 16px 12.5%;
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

export const InputContainer = styled.View`
  margin-bottom: 36px;
`;

export const InputsContainer = styled.View`
  margin-top: 32px;
`;

// TODO @tommypoa Check if Text Input can take in Text component from BaseComponents
export const TextField = styled.TextInput`
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  height: 36px;
  border-bottom-color: ${props => props.borderColor || Colors.activeText};
  border-bottom-width: 2px;
`;

// SignUpScreen

// TODO @tommypoa: consider adding props to margins to reduce number of containers
export const InputNoticeContainer = styled.View`
  margin-top: 4px;
`;
