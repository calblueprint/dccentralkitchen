import * as Font from 'expo-font';
import React from 'react';
import { AsyncStorage, ScrollView, Text, View } from 'react-native';

import Transactions from '../components/Transactions';
import getCustomerTransactions from './historyHelpers';

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
      // TODO @kyleqhua you'll want to split out the three most recent transations into a separate array; maybe call it 'recents'
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
          {/* TODO @kyleqhua here, display recents first and add appropriate FE dividers etc */}
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
