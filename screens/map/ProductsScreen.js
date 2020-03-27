import React from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProductCard from '../../components/product/ProductCard';
import {
  ProductListHeaderContainer,
  ProductListContainer,
  ProductListTitle,
} from '../../styled/product';
import Colors from '../../assets/Colors';

class ProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderProductList = () => {
    const { products, store } = this.props.navigation.state.params;
    return products.map((product, i) => {
      return (
        <ProductCard
          key={i}
          product={product}
          navigation={this.props.navigation}
          store={store}
        />
      );
    });
  };

  render() {
    const { products, store } = this.props.navigation.state.params;
    return (
      <View>
        <ProductListHeaderContainer>
          <ProductListTitle color={Colors.black}>{store.name}</ProductListTitle>
        </ProductListHeaderContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}>
          {/* <Title>Products ({products.length})</Title> */}
          <ProductListContainer>
            {this.renderProductList()}
          </ProductListContainer>
        </ScrollView>
      </View>
    );
  }
}

export default ProductsScreen;
