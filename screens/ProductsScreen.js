import React from 'react';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Product from '../components/Product';
import { Button, styles, Title } from '../styles';

class ProductsScreen extends React.Component {
  constructor(props) {
    const { products, navigation, productType } = props.navigation.state.params;
    super(props);
    this.state = {
      products,
      navigation,
      productType
    };
  }

  render() {
    const { products, navigation, productType } = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>{productType}</Title>
        <FlatList
          // TODO @tommypoa refactor styles to use styled-components
          style={styles.container}
          keyExtractor={item => item.id}
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            // TODO @tommypoa: think it would be better to extract the `onPress` here,
            // and possibly create the Button wrapping a Product using a function as with other components, but in-file
            <Button
              onPress={() =>
                navigation.navigate('ProductsDetailed', {
                  currentProduct: item
                })
              }>
              <Product product={item} />
            </Button>
          )}
        />
      </ScrollView>
    );
  }
}

export default ProductsScreen;
