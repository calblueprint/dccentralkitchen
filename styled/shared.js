import styled from 'styled-components/native';

export const RowContainer = styled.View`
  flex-direction: row;
`;

export const ColumnContainer = styled.View`
  flex-direction: column;
`;

export const InLineContainer = styled.View`
  flex-direction: row;
  display: flex;
`;

export const SpaceBetweenRowContainer = styled.View`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;

export const SpaceAroundRowContainer = styled.View`
  flex-direction: row;
  display: flex;
  justify-content: space-around;
`;

export const ScrollCategory = styled.Text`
  font-size: 14px;
  font-weight: normal;
`;

export const PoppinsText = styled.Text`
  font-family: poppins-regular;
`;
