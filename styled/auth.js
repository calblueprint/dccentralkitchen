import styled from 'styled-components/native';

export const SignUpContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const Input = styled.TextInput`
  width: 350px;
  height: 55px;
  background-color: #008550;
  margin: 10px;
  padding: 8px;
  border-radius: 14px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  align-content: center;
`;

export const LoginContainer = styled.View`
  flex: 1;
  background-color: #fff;
  margin-top: 20%;
  align-content: center;
`;

export const ErrorMsg = styled.Text`
  font-size: 14px;
  text-align: center;
`;
