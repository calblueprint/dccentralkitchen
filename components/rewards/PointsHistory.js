import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import Colors from '../../constants/Colors';
import { Body, Overline } from '../BaseComponents';
import Transaction from './Transaction';

/**
 * @prop
 * */

function PointsHistory({ transactions }) {
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
            rewardsUnlocked={item.rewardsUnlocked}
            rewardsApplied={item.rewardsApplied}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
              paddingLeft: 32,
              paddingRight: 32,
            }}>
            <FontAwesome5
              name="store"
              size={64}
              color={Colors.base}
              style={{ marginBottom: 12 }}
            />
            <Body color={Colors.secondaryText}>No history to show.</Body>
            <Body color={Colors.secondaryText} style={{ textAlign: 'center' }}>
              Find Healthy Rewards stores to earn points and unlock rewards!
            </Body>
          </View>
        }
      />
    </View>
  );
}

PointsHistory.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default React.memo(PointsHistory);
