import styled from 'styled-components/native';
import { NavButton } from '../components/BaseComponents';
import Colors from '../constants/Colors';

// eslint-disable-next-line import/prefer-default-export
export const HamburgerButton = styled(NavButton)`
  background-color: ${Colors.bgLight};
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  elevation: 12;
`;
