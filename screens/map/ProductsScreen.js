import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import {
  NavButton,
  NavHeaderContainer,
  NavTitle,
  Title,
} from '../../components/BaseComponents';
import ProductCard from '../../components/product/ProductCard';
import Colors from '../../constants/Colors';
import { ProductListContainer } from '../../styled/product';
import { ColumnContainer } from '../../styled/shared';

export default class ProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
                productsScreen
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View style={{ width: 20, height: 20 }} />
            )}
            ListHeaderComponent={
              <ColumnContainer style={{ marginBottom: 20 }}>
                <Title color={Colors.activeText}>
                  {`Products (${products.length})`}
                </Title>
              </ColumnContainer>
            }
            ListFooterComponent={<View style={{ height: 400 }} />}
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
