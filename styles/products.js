import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Notice = styled.Text`
  font-size: 12px;
  margin: 2% 5%;
`;

export const ProductContainer = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 5% 5%;
  box-shadow: 0px 10px 20px #e3e1e1;
`;

export const ProductBody = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;

export const ImageContainer = styled.View`
  flexdirection: row;
`;
// TODO @tommypoa re-work styles used in ProductDetailedScreen
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20
  },
  imageContainer: {
    flexDirection: 'row'
  },
  item: {
    backgroundColor: '#919191',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 4
  },
  storesModal: {
    backgroundColor: 'white',
    opacity: 0.8
  }
});
