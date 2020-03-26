import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../assets/Colors';
import { ButtonContainer } from '../components/BaseComponents';

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

export const StoreCardContainer = styled.View`
  margin: 0 16px 10px 16px;
`;

export const SearchBar = styled(ButtonContainer)`
  padding-top: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 92px;
  margin-left: 52px;
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

export const CancelButton = styled(ButtonContainer)`
  position: absolute;
  left: 12px;
  height: 100%;
  justify-content: center;
`;

// Search bar styles

export const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#fff'
  },
  container: {
    backgroundColor: 'rgba(255,0,0,0)',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  input: {
    fontFamily: 'poppins-regular'
  }
});
