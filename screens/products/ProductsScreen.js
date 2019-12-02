import React from 'react';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Product from '../../components/Product';
import { styles } from '../../styles/products';
import { Button, Title } from '../../styles/shared';

class ProductsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderProduct = product => {
    return (
      <Button
        onPress={() =>
          navigation.navigate('ProductsDetailed', {
            currentProduct: product,
            store
          })
        }>
        <Product product={product} />
      </Button>
    );
  };

  render() {
    const {
      products,
      navigation,
      productType,
      store
    } = this.props.navigation.state.params;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>{store.name}</Title>
        <Title>{productType}</Title>

        <FlatList
          // TODO @tommypoa refactor styles to use styled-components
          style={styles.container}
          keyExtractor={item => item.id}
          numColumns={2}
          data={products}
          renderItem={({ item }) => this.renderProduct(item)}
        />
      </ScrollView>
    );
  }
}

export default ProductsScreen;
