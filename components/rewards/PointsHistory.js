import { FontAwesome5 } from '@expo/vector-icons';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { SectionList, View } from 'react-native';
import Colors from '../../constants/Colors';
import { Body } from '../BaseComponents';
import CategoryBar from '../resources/CategoryBar';
import Transaction from './Transaction';

/**
 * @prop
 * */

function PointsHistory({ transactions }) {
  const groupedTransactions = _.groupBy(transactions, (transaction) =>
    moment(transaction.date)
      .startOf('month')
      .format('MMMM YYYY')
  );
  const sections = [];
  Object.entries(groupedTransactions).forEach(([month, tactions]) => {
    sections.push({
      month,
      data: tactions,
    });
  });

  return (
    <View>
      <SectionList
        sections={sections}
        initialNumToRender={10}
        renderSectionHeader={({ section }) =>
          section.data.length > 0 ? (
            <CategoryBar mini title={section.month} />
          ) : null
        }
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
            storeId={item.storeId}
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
              color={Colors.primaryGray}
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
