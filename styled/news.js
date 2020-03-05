import styled from 'styled-components/native';
import { PoppinsText } from './shared';

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

export const DateContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const DateText = styled(PoppinsText)`
  font-weight: bold;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  flex: 4;
`;

export const ContentText = styled(PoppinsText)`
  font-weight: normal;
`;

export const TopText = styled(PoppinsText)`
  font-style: normal;
  font-weight: 900;
  text-align: center;
  margin-top: 55px;
  font-size: 25px;
`;
