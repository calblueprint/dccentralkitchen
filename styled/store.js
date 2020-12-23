import { PixelRatio, Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Body, ButtonContainer } from '../components/BaseComponents';
import Colors from '../constants/Colors';

export const MarkerContainer = styled.View`
  max-width: 250px;
  display: flex;
  align-items: center;
`;

export const MarkerStoreName = styled.Text`
  font-family: ${(props) =>
    props.focused ? 'poppins-semibold' : 'poppins-medium'};
  font-size: ${(props) => (props.focused ? '16px' : '14px')};
  line-height: ${(props) => (props.focused ? '24px' : '20px')};
  text-align: center;
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
  background-color: ${Colors.lighterGray};
`;

export const BottomSheetHeaderContainer = styled.View`
  padding-bottom: 8px;
  width: 100%;
`;

export const BottomSheetContainer = styled.View`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  elevation: 7;
  background-color: ${Colors.bgLight};
  padding-bottom: 100px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const StoreCardContainer = styled.View`
  margin: ${(props) =>
    props.includeMargins ? '0 16px 10px 16px' : '0 0 10px 0'};
`;

export const SearchBar = styled(ButtonContainer)`
  padding-top: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 72px;
  margin-left: 32px;
  padding-left: 12px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  elevation: 12;
`;

export const StoreDetailText = styled(Body)`
  margin-left: 4px;
  color: ${(props) =>
    props.greenText ? Colors.primaryGreen : Colors.secondaryText};
`;

export const CancelButton = styled(ButtonContainer)`
  position: absolute;
  left: 12px;
  height: 100%;
  justify-content: center;
`;

// Search bar + chip styles

export const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.bgLight,
  },
  container: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  input: {
    fontFamily: 'poppins-regular',
  },
  tagChip: {
    backgroundColor: Colors.lightestGreen,
    color: Colors.darkerGreen,
    height: PixelRatio.getFontScale() < 1.2 ? 18 : 24,
    marginVertical: 0,
    marginRight: 6,
    marginBottom: 4,
  },
  filterChip: {
    backgroundColor: Colors.lightestOrange,
    color: Colors.darkerOrange,
    height: PixelRatio.getFontScale() < 1.2 ? 24 : 30,
    marginLeft: 6,
    marginVertical: 10,
  },
  selectedFilterChip: {
    backgroundColor: Colors.primaryOrange,
    color: Colors.lightText,
    height: PixelRatio.getFontScale() < 1.2 ? 24 : 30,
    marginLeft: 6,
    marginVertical: 10,
  },
  tagChipDesc: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    maxWidth: '50%',
  },
  tagChipText: {
    minHeight: 16,
    marginVertical: 0,
    marginTop: Platform.OS === 'ios' ? 1 : -3,
    lineHeight: 16,
  },
  filterChipText: {
    minHeight: 20,
    marginVertical: 0,
    marginTop: 4,
    lineHeight: 16,
  },
});
