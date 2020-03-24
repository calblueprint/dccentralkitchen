import styled from 'styled-components/native';
import Colors from '../assets/Colors';
import { NavButton } from '../components/BaseComponents';

export const HeaderContainer = styled.View`
  padding-top: 60px;
  height: ${props => props.height || '106px'};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : Colors.lightest};
`;

// margin-bottom: 16px;
export const BackButton = styled(NavButton)`
  top: -4px;
  left: 12px;
`;
