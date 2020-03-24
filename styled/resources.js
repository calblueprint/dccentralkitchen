import styled from 'styled-components/native';
import Colors from '../assets/Colors';
import { NavButton } from '../components/BaseComponents';

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

export const ContentText = styled(Body)`
  flex-direction: column;
  flex: 1;
  font-weight: normal;
  color: black;
`;

export const CategoryCard = styled.View`
  background-color: ${Colors.lighter};
  padding: 10px 18px;
  flex-direction: row;
  flex: 1;
`;

export const CategoryContainer = styled.View`
  flex-direction: column;
  align-content: center;
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

export const HeadingText = styled(Title)`
  font-weight: normal;
`;

export const ResourcesHeaderContainer = styled.View`
  padding-top: 60px;
  height: 106px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  background-color: ${Colors.lightest};
`;

export const BackButton = styled(NavButton)`
  top: -4px;
  left: 12px;
`;
export const TopText = styled(Title)`
  font-style: normal;
  font-weight: 500;
  text-align: center;
  color: black;
  margin-top: 45px;
  font-size: 25px;
`;
