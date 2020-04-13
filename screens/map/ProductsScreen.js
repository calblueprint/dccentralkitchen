import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
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
    const { products, store } = this.props.route.params;
    return (
      <View>
        <NavHeaderContainer withMargin>
          <NavButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </NavButton>
          <NavTitle>{store.storeName}</NavTitle>
        </NavHeaderContainer>
        <ProductListContainer>
          <FlatList
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
            numColumns={2}
            data={products}
            renderItem={({ item }) => (
              <ProductCard
                key={item.id}
                product={item}
                navigation={this.props.navigation}
                store={store}
                displayPoints
              />
            )}
            keyExtractor={item => item.id}
            ListFooterComponent={<View style={{ height: 270 }} />}
          />
        </ProductListContainer>
      </View>
    );
  }
}

ProductsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
