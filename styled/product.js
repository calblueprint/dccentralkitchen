import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Caption } from '../components/BaseComponents';

export const ProductCardContainer = styled.View``;

export const ProductInfoContainer = styled.View`
  width: 80%;
  padding: 5%;
`;

export const ProductInfoCaptionContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;

  ${Caption} {
    margin-right: 100px;
  }
`;

export const ProductInfoImageContainer = styled.View`
  margin-top: 7.5%;
`;

export const ProductNoticeContainer = styled.View`
  margin-top: 2%;
`;

// TODO @tommypoa re-work styles used in ProductDetailedScreen
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20
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
  },
  horizontalScroll: {
    padding: '5%',
    alignItems: 'center'
  }
});
