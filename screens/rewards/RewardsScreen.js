import React from 'react';
import {
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabView } from 'react-native-tab-view';

import { MonoText } from '../../components/StyledText';
import RewardsHome from '../../components/RewardsHome';
import { getCustomerTransactions, getUser } from './rewardsHelpers';

export default class RewardsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: null,
        points: null,
        name: null
      },
      transactions: [],
      latestTransaction: '',
      refreshing: false,
      updates: false,
      index: 0
    };
  }

  // Load user record & transactions
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    getUser(userId)
      .then(userRecord => {
        if (userRecord) {
          const user = {
            id: userId,
            points: userRecord.fields.Points,
            name: userRecord.fields.Name
          };
          this.setState({ user });
          return true;
        }
        console.error('User data is undefined or empty.');
        return false;
      })
      .then(exists => {
        if (exists) {
          // Get transactions
          getCustomerTransactions(userId).then(transactions => {
            const latestTransaction = transactions[0];
            this.setState({ transactions, latestTransaction });
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <RewardsHome rewardsInfo={this.state} />;
      case 'history':
        return null;
      default:
        return null;
    }
  };

  // Sign out function -- it clears the local storage then navigates
  // to the authentication page.
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _getTransactions = () => {
    return (
      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>Your transaction history:</Text>
        {this.state.transactions
          ? this.state.transactions.splice(0, 3).map(transaction => {
              return (
                <View
                  key={transaction.transaction_id}
                  style={[
                    styles.codeHighlightContainer,
                    styles.navigationFilename
                  ]}>
                  <MonoText style={styles.codeHighlightText}>
                    Date: {transaction.Date}
                  </MonoText>
                  <MonoText style={styles.codeHighlightText}>
                    Points Redeemed: {transaction['Points Rewarded']}
                  </MonoText>
                </View>
              );
            })
          : ''}
      </View>
    );
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
          }>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../../assets/images/robot-dev.png')
                  : require('../../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              {' '}
              {`Welcome, ${this.state.user.name}`}
            </Text>
            <View
              style={[
                styles.codeHighlightContainer,
                styles.RewardsScreenFilename
              ]}>
              <MonoText>{this.state.user.points} total points </MonoText>
            </View>
            <Text style={styles.getStartedText}>
              {' '}
              {`${1000 -
                (parseInt(this.state.user.points) %
                  1000)} points to your next reward`}
            </Text>
          </View>
          {/* Signout Button */}
          <View style={styles.signOutContainer}>
            <Button
              title="Sign out"
              onPress={this._signOutAsync}
              style={styles.signOutButton}
            />
          </View>
          {/* Prompt to upload receipt */}
          {this.state.updates ? (
            <View style={styles.signOutContainer}>
              <Text>New transaction noted, upload your receipt!</Text>
              <Button
                title="Upload Receipt"
                onPress={() =>
                  this.props.navigation.navigate('Camera', {
                    transactionId: this.state.latestTransaction,
                    customerId: this.state.user.id
                  })
                }
                style={styles.signOutButton}
              />
            </View>
          ) : (
            <Text />
          )}
        </ScrollView>
        {/* <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          style={styles.container}
        /> */}
      </View>
    );
  }
}

RewardsScreen.navigationOptions = {
  header: null
};

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
