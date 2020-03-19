import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

//TODO: Fix top to match figma once we figure out iPhone alignment
export const HamburgerButton = styled(TouchableOpacity)`
  background-color: #fff;
  width: 40px;
  height: 40px;
  zindex: 100;
  position: absolute;
  top: 63px;
  left: 16px;
  border-radius: 23px;
  border-width: 4px;
  border-color: #fff;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
`;
