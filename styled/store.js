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
  box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  padding: 4%;
`;

export const StoreListContainer = styled.View`
  padding: 0 4% 4% 4%;
`;

export const StoreListHeaderContainer = styled.View`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  background-color: ${Colors.primaryOrange};
  margin-bottom: 16px;
`;

export const StoreCardContainer = styled.View`
  margin-bottom: 10px;
  margin-top: 0px;
`;

export const StoreListTitle = styled(Title)`
  text-align: center;
  color: #fff;
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
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
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
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: 'rgba(255,0,0,0)',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  input: {
    fontFamily: 'poppins-regular',
  },
});
