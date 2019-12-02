import styled from 'styled-components/native';

export const Card  = styled.View`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  border-color: grey;
  padding: 10px;
  margin: 5% 5%;
  flex-direction: row;
  flex: 1;
`;

export const DateContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const DateText = styled.Text`
  font-family: Poppins;
  font-weight: bold;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  flex: 4;
`;

export const ContentText = styled.Text`
  font-family: Poppins;
  font-weight: normal;
`;
