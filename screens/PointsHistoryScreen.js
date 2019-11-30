import * as Font from 'expo-font';
import React from 'react';
import { AsyncStorage, ScrollView, Text, View } from 'react-native';
import getCustomerTransactions from './historyHelpers';

import Transactions from '../components/Transactions';

export default class PointsHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    getCustomerTransactions(userId).then(transactions => {
      this.setState({ transactions });
    });

    Font.loadAsync({
      Poppins: require('../assets/fonts/Poppins-Regular.ttf')
    });
  }

  render() {
    return (
      <View>
        <Text> RECENT TRANSACTIONS</Text>
        <ScrollView>
          {this.state.transactions.map(transaction => (
            <Transactions
              key={transaction.id}
              date={transaction.date}
              points={transaction.points}
              storeName={transaction.storeName}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
