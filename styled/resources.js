import styled from 'styled-components/native';
import Colors from '../constants/Colors';

export const ResourceItemCard = styled.View`
  border-bottom-width: 1px;
  border-color: ${Colors.lighter};
  margin-top: 12px;
  margin-left: 24px;
  padding-bottom: 12px;
  margin-right: 24px;
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

export const CategoryIcon = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  padding: 8px
  border-radius: 20px;
  background-color: ${Colors.lighterGreen};
  
`;

export const CategoryHeadingContainer = styled.View`
  flex-direction: row;
  padding-left: 12px;
  align-content: center;
  align-items: center;
  justify-content: center;
`;
