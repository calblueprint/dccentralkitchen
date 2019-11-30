import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Font from 'expo-font';
import BASE from '../lib/common';
import Transactions from '../components/Transactions';
Font.loadAsync({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
});
const TransTable = BASE('Transactions').select({ view: 'Grid view' });
// const CustTable = BASE('Customers').select({ view: 'Grid view' });

let transList = [];
const getCustomerTransactions = function async(userId) {
  return BASE('Transactions')
    .select({ view: 'Transactions' })
    .all()
    .then(records => {
      let userTrans = [];
      //console.log(userId)
      for (const record of records) {
        const currCustomerId = record.get('Customer');
        if (currCustomerId) {
            //console.log(currCustomerId[0])
            if (currCustomerId[0] === userId) {
                userTrans.push(record);
            }
        }
      }
      //console.log(userTrans)
      return Promise.all(userTrans);
    })
    .then(transactions => {
      for (const transaction of transactions) {
        const curr = {
          date: new Date(transaction.get('Date')),
          storeId: transaction.get('Store'),
          productsPurchased: transaction.get('Products Purchased'),
          points: transaction.get('Points Rewarded'),
          id: transaction.get('transaction_id')
        };
        transList.push(curr);
      }
      transList.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      })
      console.log(transList)
      return transList;
    });
};

export default class PointsHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    getCustomerTransactions(userId).then(console.log);
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
              storeId={transaction.storeId}
            />
          ))}
          <Transactions
              date={new Date()}
              points={111}
              storeId={'Hi'}/>
        </ScrollView>
      </View>
    );
  }
}
