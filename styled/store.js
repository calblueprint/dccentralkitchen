import styled from 'styled-components/native';
import { Title } from '../components/BaseComponents';
import { StyleSheet } from 'react-native';

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
  flex-direction: row;
`;

export const StoreListTitle = styled(Title)`
  text-align: center;
  color: white;
  margin-top: 2.5%;
`;

export const ViewProductsContainer = styled.View`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
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
