import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  NavButton,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import ProductCard from '../../components/product/ProductCard';
import { ProductListContainer } from '../../styled/product';

export default class ProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderProductList = () => {
    const { products, store } = this.props.route.params;
    return products.map((product, i) => {
      return (
        <ProductCard
          key={i}
          product={product}
          navigation={this.props.navigation}
          store={store}
          displayPoints
        />
      );
    });
  };

  render() {
    const { store } = this.props.route.params;
    return (
      <View>
        <NavHeaderContainer withMargin>
          <NavButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </NavButton>
          <NavTitle>{store.storeName}</NavTitle>
        </NavHeaderContainer>
        <ScrollView
          style={{ height: '100%', width: '100%' }}
          showsVerticalScrollIndicator={false}>
          <ProductListContainer>
            {this.renderProductList()}
          </ProductListContainer>
        </ScrollView>
      </View>
    );
  }
}
