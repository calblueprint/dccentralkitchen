import styled from 'styled-components/native';
import Colors from '../constants/Colors';

export const Card = styled.View`
  border-width: 1px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14);
  border-color: ${Colors.lighter};
  background-color: ${Colors.lightest};
  margin: 8px 0;
  padding: 16px 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  margin-left: 12px;
  flex: 1;
  justify-content: flex-start;
`;
