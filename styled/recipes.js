import styled from 'styled-components/native';
import Colors from '../constants/Colors';

export const RecipeItemCard = styled.View`
  border-bottom-width: 1px;
  border-color: ${Colors.lightestGray};
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
  margin: 0px 4px 0px 8px;
`;

export const CategoryCard = styled.View`
  background-color: ${Colors.lightestGray};
  padding: 10px 24px;
  flex-direction: row;
`;

export const CategoryHeadingContainer = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
`;
