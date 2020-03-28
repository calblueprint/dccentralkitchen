import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { FlatList, View } from 'react-native';
import Colors from '../../assets/Colors';
import { Body, Overline } from '../BaseComponents';
import Transaction from './Transaction';
/**
 * @prop
 * */

function PointsHistory({ transactions, user, updates, navigation }) {
  // Only display if transactions have mounted
  // TODO @kennethlien fix spacing at line 44
  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <Overline style={{ marginTop: 24, marginLeft: 16, marginBottom: 12 }}>
            Recent Transactions
          </Overline>
        }
        initialNumToRender={10}
        data={transactions}
        renderItem={({ item }) => (
          <Transaction
            key={item.id}
            date={item.date}
            pointsEarned={item.pointsEarned}
            storeName={item.storeName}
            subtotal={item.subtotal}
            totalSale={item.totalSale}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              marginTop: 20
            }}>
            <FontAwesome5 name="store" size={64} color={Colors.base} />
            <Body color={Colors.secondaryText}>No history to show.</Body>
          </View>
        }
      />
    </View>
  );
}

export default React.memo(PointsHistory);
