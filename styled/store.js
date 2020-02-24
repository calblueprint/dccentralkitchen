import styled from 'styled-components/native';

export const StoreModalBar = styled.View`
  border: 1px solid black;
  background-color: black
  height: 5px;
  width: 50px;
  border-radius: 5px;
  margin: 2% 0% 0% 42%;
`;

export const StoreModal = styled.View`
  background-color: #fff;
  opacity: 0.8;
`;

export const SearchBar = styled.TouchableOpacity`
  background-color: white;
  align-items: center;
  margin: 1%;
  border-radius: 5px;
`;

export const TopText = styled.Text`
  font-style: normal;
  font-weight: 900;
  text-align: center;
  margin-top: 10px;
  font-size: 25px;
`;
