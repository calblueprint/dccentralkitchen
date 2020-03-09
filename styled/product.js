import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../assets/Colors';
import { Title } from '../components/BaseComponents';

export const ProductListHeaderContainer = styled.View`
  padding-top: 45px;
  height: 106px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
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
  margin-top: 80px;
  margin-left: 16px;
`;

export const ProductInfoCaptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

export const ProductInfoImageContainer = styled.View`
  margin-top: 80px;
`;

export const ProductNoticeContainer = styled.View`
  margin-top: 2%;
`;

// TODO @tommypoa re-work styles used in ProductDetailedScreen
export const styles = StyleSheet.create({
  horizontalScroll: {
    paddingTop: 5,
    paddingLeft: 9,
    paddingBottom: 13,
    alignItems: 'center'
  }
});
