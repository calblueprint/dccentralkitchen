import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import BASE from '../lib/common';
import Transactions from '../components/Transactions';

const TransTable = BASE('Transactions').select({ view: 'Grid view' });
// const CustTable = BASE('Customers').select({ view: 'Grid view' });

export default class PointsHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    this.getCustomerTransactions(userId).then(trans => {
      this.setState({ transactions: trans });
    });
    console.log(this.state.transactions);
  }

  async getCustomerTransactions(userId) {
    return BASE('Transactions').select()
      .all()
      .then(records => {
        const userTrans = [];
        for (const record of records) {
          const currCustomerId = record.get('Customer');
          if (currCustomerId === userId) {
            userTrans.concat(record);
          }
        }
        return Promise.all(userTrans);
      })
      .then(transactions => {
        const transList = [];
        for (const transaction of transactions) {
          const curr = {
            date: new Date(transaction.get('Date')),
            storeId: transaction.get('Store')[0],
            productsPurchased: transaction.get('Products Purchased'),
            points: transaction.get('Points Rewarded'),
            id: transaction.get('transaction_id')
          };
          transList.concat(curr);
        }
        return transList;
      });
  }

  render() {
    return (
      <View>
          <Text> hi </Text>
        <ScrollView>
          {this.state.transactions.map(transaction => (
            <Transactions
              key={transaction.id}
              date={transaction.date}
              points={transaction.points}
              storeId={transaction.storeId}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
