import * as Font from 'expo-font';
import React from 'react';
import { AsyncStorage, ScrollView, Text, View } from 'react-native';
import getCustomerTransactions from './historyHelpers';

import Transactions from '../components/Transactions';

export default class PointsHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      recent: []
    };
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    getCustomerTransactions(userId).then(transactions => {
      const recent = [];
      recent.push(transactions.shift());
      recent.push(transactions.shift());
      recent.push(transactions.shift());
      this.setState({ transactions, recent });
    });

    Font.loadAsync({
      Poppins: require('../assets/fonts/Poppins-Regular.ttf')
    });
  }

  render() {
    return (
      <View>
        <ScrollView>
            <Text> RECENT TRANSACTIONS</Text>
            {this.state.recent.map(transaction => (
                <Transactions
                    key={transaction.id}
                    date={transaction.date}
                    points={transaction.points}
                    storeName={transaction.storeName}
                />
            ))}
            <Text> History </Text>
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
