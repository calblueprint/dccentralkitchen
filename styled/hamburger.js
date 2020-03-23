import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

//TODO: Figma says top should be 56, but it does not look like it should be 56.
export const HamburgerButton = styled(TouchableOpacity)`
  background-color: #fff;
  width: 40px;
  height: 40px;
  z-index: 100;
  position: absolute;
  top: 20px;
  left: 16px;
  border-radius: 23px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
`;
