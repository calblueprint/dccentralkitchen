import React from 'react';
import { 
  AsyncStorage, 
  Button, 
  Image, 
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl
} from 'react-native';
import { MonoText } from '../components/StyledText';
import BASE from '../lib/common';
import * as Font from "expo-font";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      name: '',
      points: '',
      rewards: [],
      redeemable: {},
      announcements: '',
      transactions: [],
      latestTransaction: '',
      refreshing: false, 
      updates: false
    };
  }

  // This is what runs when you pull to refresh. It is essentially the
  // same code from the componentDidMount
  _onRefresh = () => {
    this.setState({refreshing: true});
    HomeScreen.getUser(this.state.userId).then(userRecord => {
      let name = userRecord["fields"]["Name"]
      let points = userRecord["fields"]["Points"]
      let transactions = userRecord["fields"]["Transactions"]
      if (transactions) {       
        if (this.state.latestTransaction != transactions.slice(-1)[0] ) {
          this.setState({
            latestTransaction: transactions[0],
            updates: true
          })
        } 
        this.setState({
          points, name
        })
        this.setTransactions(transactions).then(() => {
          this.setState({
            refreshing: false
          })
        })
      } else {
        this.setState({
          points: points,
          name: name,
          refreshing: false
        })
      }
    })
  }

  async componentDidMount() {
    Font.loadAsync({
      Poppins: require('../assets/fonts/Poppins-Regular.ttf')
    });
    const userId = await AsyncStorage.getItem('userId');
    HomeScreen.getUser(userId).then(userRecord => {
      if (userRecord) {
        let points = userRecord["fields"]["Points"]
        let name = userRecord["fields"]["Name"]
        let transactions = userRecord["fields"]["Transactions"]
        this.setState({
          points, name, userId
        })
        if (transactions) {
          this.setState({
            latestTransaction: transactions[0]
          })
          this.setTransactions(transactions)
        } 
      } else {
        console.error('User data is undefined or empty.')
      }
    }).catch(err => {
      console.error(err)
    })
  }

  // Helper for setting transactions to state.
  async setTransactions(transactions) {
    let transactionRecords = transactions.map(id => BASE('Transactions').find(id))
    Promise.all(transactionRecords).then(records => {
      let transactionArray = records.map(record => this.createTransactionData(record))
      this.setState({
        transactions: transactionArray,
      })
    })
  }

  createTransactionData(record) {
    const transaction = record.fields;
    return {
      customer: transaction['Customer'],
      phone: transaction['Customer Lookup (Phone #)'],
      transaction_id: transaction['transaction_id'],
      products: transaction['Products Purchased'],
      Date: transaction['Date'],
      "Points Rewarded": transaction["Points Rewarded"],
      Clerk: transaction["Clerk"],
      "Items Redeemed": transaction["Items Redeemed"],
      "Customer Name": transaction["Customer Name"],
      "Store Name": transaction["Store Name"],
      Receipts: transaction["Receipts"]
    };
  }
  
  // Calls Airtable API to return a promise that
  // will resolve to be a user record.
  static async getUser(id) {
    return BASE('Customers').find(id);
  }

  // Sign out function -- it clears the local storage then navigates
  // to the authentication page.
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              {' '}
              {`Welcome, ${this.state.name}`}
            </Text>
            <View
              style={[
                styles.codeHighlightContainer,
                styles.homeScreenFilename
              ]}>
              <MonoText>{this.state.points} total points </MonoText>
            </View>
            <Text style={styles.getStartedText}>
              {' '}
              {`${1000 -
                parseInt(this.state.points) % 1000} points to your next reward`}
            </Text>
          </View>

          <View style={styles.signOutContainer}>
            <Button
              title="Sign out"
              onPress={this._signOutAsync}
              style={styles.signOutButton}
            />
          </View>
          { this.state.updates ?
            <View style={styles.signOutContainer}>
              <Text>New transaction noted, upload your receipt!</Text>
              <Button
                title="Upload Receipt"
                onPress={() => this.props.navigation.navigate('Camera', {
                  transactionId: this.state.latestTransaction,
                  customerId: this.state.userId
                })}
                style={styles.signOutButton} />
            </View>
            : <Text></Text>
          }
        </ScrollView>
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            Your transaction history:
          </Text>
          { this.state.transactions ? 
            this.state.transactions.splice(0, 3).map(transaction => {
              return(
                <View
                  key={transaction["transaction_id"]}
                  style={[styles.codeHighlightContainer, styles.navigationFilename]}
                  >
                  <MonoText style={styles.codeHighlightText}>
                    Date: {transaction["Date"]}
                  </MonoText>
                  <MonoText style={styles.codeHighlightText}>
                    Points Redeemed: {transaction["Points Rewarded"]}
                  </MonoText>
                </View>
              )
            })
            : ''
          }
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    return <Text style={styles.developmentModeText}>~development mode~</Text>;
  }
  return (
    <Text style={styles.developmentModeText}>
      You are not in development mode: your app will run at full speed.
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  helloTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgba(13, 99, 139, 0.8)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 150,
    // marginTop: 20,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  helloMessage: {
    paddingVertical: 10,
    fontSize: 15.5,
    fontWeight: '600',
    color: 'rgba(30, 183, 255, 0.8)',
    lineHeight: 20,
    textAlign: 'left'
  },
  navigationFilename: {
    marginTop: 5
  },
  signOutContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  signOutButton: {
    fontSize: 20,
    paddingVertical: 15
  }
});
