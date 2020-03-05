import styled from 'styled-components/native';
import { Subhead, Title, Body } from '../components/BaseComponents';

export const Card = styled.View`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  border-color: grey;
  padding: 10px;
  margin: 2% 5%;
  flex-direction: row;
  flex: 1;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const IconContainer = styled.View`
  flex-direction: column;
  flex: 4;
`;

export const LinkSubhead = styled(Subhead)``;

export const ContentText = styled(Body)`
  font-weight: normal;
  color: black;
`;

export const TopText = styled(Title)`
  font-style: normal;
  font-weight: 900;
  text-align: center;
  color: black;
  margin-top: 55px;
  font-size: 25px;
`;
