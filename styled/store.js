import styled from 'styled-components/native';
import { Title, ButtonContainer } from '../components/BaseComponents';
import { StyleSheet } from 'react-native';

export const StoreModalBar = styled.View`
  border: 1px solid black;
  background-color: black
  height: 5px;
  width: 50px;
  border-radius: 5px;
  margin: 2% 0% 0% 42%;
`;

export const BottomSheetHeaderContainer = styled.View`
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px -2px 1px;
`;

export const BottomSheetContainer = styled.View`
  background-color: #fff;
  padding: 2.5%;
`;

export const StoreListContainer = styled.View`
  background-color: #fff;
  opacity: 0.8;
  padding: 4%;
`;

export const StoreListHeaderContainer = styled.View`
  background-color: #f07723;
  opacity: 0.8;
`;

export const StoreCardContainer = styled.View`
  margin: 7.5px;
`;

export const StoreListTitle = styled(Title)`
  text-align: center;
  color: white;
  margin-top: 2.5%;
`;

export const SearchBar = styled(ButtonContainer)`
  background-color: white;
  align-items: center;
  justify-content: center;
  margin: 5% 25%;
  height: 5%
  border-radius: 20px;
`;

export const EBTStatusBar = styled.View`
  display: flex;
  flex-direction: row;
  background-color: green;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 50%;
  border-radius: 20px;
`;

// FlatList styles

export const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'white'
  },
  container: {
    backgroundColor: '#f07723',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  input: {
    fontFamily: 'Arial' // @tommpoa TODO – load poppins!
  },
  searchIcon: {
    color: '#f07723'
  }
});
