import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { NavButtonContainer } from '../components/BaseComponents';
import Colors from '../constants/Colors';

// eslint-disable-next-line import/prefer-default-export
export const MapButtonStyling = styled(NavButtonContainer)`
  padding-top: ${Platform.OS === 'ios' ? '3px' : '1px'};
  display: flex;
  width: 40px;
  height: 40px;
  margin-left: 12px;
  margin-right: 12px;
  background-color: ${Colors.bgLight};
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
  elevation: 12;
`;
