import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 5% 5% 0%;
`;
export const Subtitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 2% 5%;
`;

export const H3 = styled.Text`
  font-size: 12px;
  margin: 1% 6.5%;
`;

export const Notice = styled.Text`
  font-size: 12px;
  margin: 2% 5%;
`;

export const ScrollCategory = styled.Text`
  font-size: 16px;
  font-weight: bold;
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

export const Button = styled.TouchableOpacity`
  flex: 1 1 0;
`;

export const ButtonText = styled.Text`
  color: white;
  padding: 7.5px 7.5px;
`;

export const StoreModalBar = styled.View`
  border: 1px solid black;
  background-color: black
  height: 5px;
  width: 50px;
  border-radius: 5px;
  margin: 2% 0% 2% 42%;
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
