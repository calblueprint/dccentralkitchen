import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Touchable = styled.TouchableOpacity`
  backgroundColor: 'white',
  width: 50,
  height: 50,
  zIndex: 100,
  position: 'absolute', 
  top: 50,
  left: 15,
  borderRadius: 23,
  borderColor: '#ffffff',
  borderWidth: 4,
  shadowOpacity: 0.25,
  shadowRadius: 5,
  shadowColor: 'black',
  shadowOffset: { height: 3, width: 4 } 
`;

export const TopText = styled.Text`
  font-style: normal;
  font-weight: 900;
  text-align: center;
  margin-top: 55;
  font-size: 25;
`;
