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
import { BASE, IMG_KEY } from '../lib/common';

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
    };
  }

  // Sign out function -- it clears the local storage then navigates
  // to the authentication page.
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  // This is what runs when you pull to refresh. It is essentially the
  // same code from the componentDidMount
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getUser(this.state.userId).then(userRecord => {
      let name = userRecord["fields"]["Name"]
      let points = userRecord["fields"]["Points"]
      let transactions = userRecord["fields"]["Transactions"]
      if (transactions) {
        let transactionRecords = transactions.map(id => BASE('Transactions').find(id))
        Promise.all(transactionRecords).then(records => {
          this.setState({
            points: points,
            transactions: records,
            name: name,
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
    const userId = await AsyncStorage.getItem('userId');
    this.setState({
      userId: userId
    })
    this.getUser(userId).then(userRecord => {
      if (userRecord) {
        let points = userRecord["fields"]["Points"]
        let rewardCount = userRecord["fields"]["Rewards"]
        let name = userRecord["fields"]["Name"]
        let transactions = userRecord["fields"]["Transactions"]
        this.setState({
          latestTransaction: transactions[0]
        })
        if (transactions) {
          let transactionRecords = transactions.map(id => BASE('Transactions').find(id))
          Promise.all(transactionRecords).then(records => {
            this.setState({
              points: points,
              transactions: records,
              name: name,
            })
          })
        } else {
          this.setState({
            points: points,
            name: name,
          })
        }
      } else {
        console.error('User data is undefined or empty.')
      }
    }).catch(err => {
      console.error(err)
    })
  }

  // Calls Airtable API to return a promise that
  // will resolve to be a user record.
  async getUser(id) {
    return BASE('Customers').find(id)
  }

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
            <Text style={styles.getStartedText}> {"Welcome, " + this.state.name}</Text>
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText>{this.state.points} / 1000 </MonoText>
            </View>
            <Text style={styles.getStartedText}> {1000 - parseInt(this.state.points) + " points to your next reward"}</Text>
           
          </View>

          <View style={styles.signOutContainer}>
            <Button
              title="Sign out"
              onPress={this._signOutAsync}
              style={styles.signOutButton} />
          </View>
          <View style={styles.signOutContainer}>
            <Button
              title="Go to Camera"
              onPress={() => this.props.navigation.navigate('Camera', {
                transactionId: this.state.latestTransaction,
                customerId: this.state.id
              })}
              style={styles.signOutButton} />
          </View>
        </ScrollView>
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            Your transaction history:
          </Text>
          { this.state.transactions ? 
            this.state.transactions.splice(0, 3).map(transaction => {
              return(
                <View
                  key={transaction.get("transaction_id")}
                  style={[styles.codeHighlightContainer, styles.navigationFilename]}
                  >
                  <MonoText style={styles.codeHighlightText}>
                    Date: {transaction.get("Date")}
                  </MonoText>
                  <MonoText style={styles.codeHighlightText}>
                    Points Redeemed: {transaction.get("Points Rewarded")}
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
    textAlign: 'center',
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
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
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
