import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Title, ButtonContainer } from '../components/BaseComponents';
import Colors from '../assets/Colors';

export const DragBar = styled.View`
  background-color: ${Colors.secondaryText};
  height: 4px;
  width: 50px;
  border-radius: 5px;
  margin: 8px auto 0px auto;
`;

export const DividerBar = styled.View`
  margin-top: 16px;
  height: 1px;
  width: 100%;
  background-color: ${Colors.light};
`;

export const BottomSheetHeaderContainer = styled.View`
  background-color: #fff;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
`;

export const BottomSheetContainer = styled.View`
  background-color: #fff;
  padding: 4%;
`;

export const StoreListContainer = styled.View`
  background-color: #fff;
  padding: 4%;
`;

export const StoreListHeaderContainer = styled.View`
  background-color: ${Colors.primaryOrange};
`;

export const StoreCardContainer = styled.View`
  margin-bottom: 10px;
  margin-top: 0px;
`;

export const StoreListTitle = styled(Title)`
  text-align: center;
  color: white;
  margin-top: 45px;
`;

export const SearchBar = styled(ButtonContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 20px 20%;
  padding-left: 12px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
`;

export const EBTStatusBar = styled.View`
  display: flex;
  flex-direction: row;
  padding-top: 1px;
  padding-left: 6px;
  padding-right: 9px;
  background-color: ${Colors.lightestGreen};
  align-items: center;
  justify-content: space-between;
  width: 48px;
  height: 18px;
  border-radius: 20px;
  margin-top: 6px;
  margin-left: 6px;
`;

// FlatList styles

export const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'white'
  },
  container: {
    backgroundColor: 'rgba(255,0,0,0)',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  input: {
    fontFamily: 'Arial' // @tommpoa TODO – load poppins!
  },
  searchIcon: {
    color: Colors.primaryOrange
  }
});
