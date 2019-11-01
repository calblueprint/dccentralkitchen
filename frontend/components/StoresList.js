import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StoreCard from './StoreCard';

import { Subtitle, Title, styles } from '../styles.js';

/**
 * @prop
 **/

function StoresList({stores}) {
  return (
    <ScrollView>
      <FlatList
            style={styles.container}
            numColumns={3}
            data={stores}
            renderItem={({ item }) => (
                <StoreCard store={item}/>)}
                keyExtractor={(item, index) => index.toString()}>
        </FlatList>
    </ScrollView>
  );
}

export default StoresList;