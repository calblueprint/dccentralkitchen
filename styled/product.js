import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../assets/Colors';
import { Title } from '../components/BaseComponents';

export const ProductListHeaderContainer = styled.View`
  padding-top: 45px;
  height: 106px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : Colors.lightest};
`;

export const ProductListContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20%;
`;

export const ProductListTitle = styled(Title)`
  text-align: center;
`;

export const ProductCardContainer = styled.View`
  margin-right: 10px;
`;

export const ProductInfoContainer = styled.View`
  width: 80%;
  padding: 5%;
`;

export const ProductInfoCaptionContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
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
    padding: '1%',
    alignItems: 'center'
  }
});
