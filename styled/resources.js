import styled from 'styled-components/native';
import Colors from '../assets/Colors';
import { Body, Title } from '../components/BaseComponents';

export const Card = styled.View`
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

export const HeadingContainer = styled.View`
  flex-direction: row;
  padding-left: 12px;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

export const HeadingText = styled(Title)`
  font-weight: normal;
`;

export const TopText = styled(Title)`
  font-style: normal;
  font-weight: 500;
  text-align: center;
  color: black;
  margin-top: 45px;
  font-size: 25px;
`;
