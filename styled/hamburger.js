import styled from 'styled-components/native';
import { NavButton } from '../components/BaseComponents';
import { TouchableOpacity } from 'react-native';

//TODO: Fix top to match figma once we figure out iPhone alignment
export const HamburgerButton = styled(NavButton)`
  top: 63px;
  left: 16px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
`;
