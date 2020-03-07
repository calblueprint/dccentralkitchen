import styled from 'styled-components/native';
import { Subhead, Title, Body } from '../components/BaseComponents';

export const Card = styled.View`
  border-bottom-width: 1px;
  border-color: #ebebeb;
  padding: 10px;
  flex: 1;
  flexdirection: column;
  justifycontent: space-between;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  flex: 1;
  justifycontent: flex-start;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  flex: 4;
  justifycontent: flex-end;
  align-content: center;
  align-items: center;
`;

export const LinkSubhead = styled(Subhead)``;

export const ContentText = styled(Body)`
  flex-direction: column;
  flex: 1;
  font-weight: normal;
  color: black;
`;

export const CategoryCard = styled.View`
  background-color: #ebebeb;
  padding: 10px;
  flex-direction: row;
  flex: 1;
`;

export const CategoryContainer = styled.View`
  flex-direction: column;
  align-content: center;
  flex: 1;
`;

export const CategoryIcon = styled.View`
  flex: 1;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

export const HeadingContainer = styled.View`
  flex-direction: row;
  flex: 4;
`;

export const HeadingText = styled(Title)`
  font-weight: normal;
`;

export const TopText = styled(Title)`
  font-style: normal;
  font-weight: 900;
  text-align: center;
  color: black;
  margin-top: 55px;
  font-size: 25px;
`;
