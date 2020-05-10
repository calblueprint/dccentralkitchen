import styled from 'styled-components/native';
import Colors from '../constants/Colors';

export const ResourceItemCard = styled.View`
  border-bottom-width: 1px;
  border-color: ${Colors.lighter};
  margin: 12px 24px 0 24px;
  padding-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
`;

export const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 12px;
`;

export const CategoryCard = styled.View`
  background-color: ${Colors.lighter};
  padding: 10px 18px;
  flex-direction: row;
  flex: 1;
`;

export const CategoryHeadingContainer = styled.View`
  flex-direction: row;
  padding-left: 12px;
  align-content: center;
  align-items: center;
  justify-content: center;
`;
