import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../assets/Colors';
import { Title } from '../../components/BaseComponents';
import ProductCard from '../../components/product/ProductCard';
import {
  BackButton,
  ProductListContainer,
  ProductListHeaderContainer
} from '../../styled/product';
import { RowContainer } from '../../styled/shared';

export default class ProductsScreen extends React.Component {
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
          <RowContainer
            style={{ width: '100%' }}
            alignItems="center"
            justifyContent="center">
            <BackButton onPress={() => this.props.navigation.goBack(null)}>
              <FontAwesome5 name="arrow-left" solid size={24} />
            </BackButton>
            <Title color={Colors.activeText} style={{ textAlign: 'center' }}>
              {store.name}
            </Title>
          </RowContainer>
        </ProductListHeaderContainer>
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
ProductsScreen.navigationOptions = {
  headerShown: false
};
