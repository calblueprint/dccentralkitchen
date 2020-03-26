import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ProductListContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20%;
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
