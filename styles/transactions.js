import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Card = styled.View`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  border-color: grey;
  padding: 20px;
  margin: 5% 5%;
  flex-direction: row;
`;

export const IconContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const ContentContainer = styled.View`
  flex: 4;
  flex-direction: column;
`;


export const MainText = styled.Text`
  font-family: Poppins;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
display: flex;
align-items: center;
color: rgba(0, 0, 0, 0.8);
`;

export const Overline = styled.Text`
 font-family: Poppins;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
color: #999999;
`;





