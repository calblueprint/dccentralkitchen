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

  render() {
    const {
      products,
      navigation,
      productType,
      store
    } = this.props.navigation.state.params;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>
          {/* tommypoa98 i think this is so funny */}
          {productType} @ {store.name}
        </Title>

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
                  currentProduct: item,
                  store
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
