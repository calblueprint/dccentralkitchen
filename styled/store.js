import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Body, ButtonContainer } from '../components/BaseComponents';
import Colors from '../constants/Colors';

export const MarkerContainer = styled.View`
  width: 150px
  display: flex
  align-items: center
`;
export const MarkerStoreName = styled.Text`
  font-family: ${props =>
    props.focused ? 'poppins-semibold' : 'poppins-medium'};
  font-size: ${props => (props.focused ? '16px' : '14px')};
  line-height: ${props => (props.focused ? '24px' : '20px')};
  text-align: center
  color: ${Colors.activeText};
`;

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
  padding-bottom: 100px;
`;

export const StoreCardContainer = styled.View`
  margin: ${props =>
    props.includeMargins ? '0 16px 10px 16px' : '0 0 10px 0'};
`;

export const SearchBar = styled(ButtonContainer)`
  padding-top: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 82px;
  margin-left: 42px;
  padding-left: 12px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  elevation: 12;
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

export const StoreDetailText = styled(Body)`
  margin-left: 4px;
  color: ${props =>
    props.greenText ? Colors.primaryGreen : Colors.secondaryText};
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
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  input: {
    fontFamily: 'poppins-regular',
  },
});
