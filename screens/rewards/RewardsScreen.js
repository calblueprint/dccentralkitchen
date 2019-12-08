import React from 'react';
import * as Font from 'expo-font';
import {
  AsyncStorage,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import RewardsHome from '../../components/RewardsHome';
import PointsHistory from '../../components/PointsHistory';
import { getCustomerTransactions, getUser } from './rewardsHelpers';

const routes = [
  { key: 'home', title: 'My Rewards' },
  { key: 'history', title: 'Points History' }
];
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
      refreshing: false,
      updates: false,
      index: 0,
      routes
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
      .then(async exists => {
        if (exists) {
          // Get transactions
          await getCustomerTransactions(userId).then(transactions => {
            this.setState({ latestTransaction: transactions[0], transactions });
          });
        }
      })
      .catch(err => {
        console.error(err);
      });

    await Font.loadAsync({
      Poppins: require('../../assets/fonts/Poppins-Regular.ttf')
    });
  }

  // This is what runs when you pull to refresh - it updates the current transactions
  // Sets 'update' to true if the latest transaction is new
  // or if the latest transaction does not have a receipt attached
  // which prompts on the History page
  _onRefresh = async () => {
    this.setState({ refreshing: true });
    getCustomerTransactions(this.state.user.id).then(transactions => {
      if (this.state.latestTransaction !== transactions[0]) {
        this.setState({
          latestTransaction: transactions[0],
          transactions
        });
      }
      if (this.state.latestTransaction.receipts == null) {
        this.setState({ updates: true });
      }
      this.setState({ refreshing: false });
    });
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return (
          <RewardsHome
            user={this.state.user}
            transactions={this.state.transactions}
          />
        );
      case 'history':
        return (
          <PointsHistory
            user={this.state.user}
            transactions={this.state.transactions}
            updates={this.state.updates}
            navigation={this.props.navigation}
          />
        );
      default:
        return null;
    }
  };

  // TODO refactor to use style-components; jank af right now
  // TODO use Poppins for the font
  renderTabBar = props => {
    return (
      <TabBar
        style={{
          backgroundColor: '#008550',
          elevation: 0,
          borderBottomWidth: 0,
          height: 50
        }}
        labelStyle={{
          color: 'white',
          textTransform: 'capitalize',
          fontSize: 16,
          fontWeight: 'bold'
        }}
        {...props}
        indicatorStyle={{ backgroundColor: '#fff', height: 2.5 }}
      />
    );
  };

  // // Sign out function -- it clears the local storage then navigates
  // // to the authentication page.
  // _signOutAsync = async () => {
  //   await AsyncStorage.clear();
  //   this.props.navigation.navigate('Auth');
  // };

  render() {
    return (
      <View style={styles.container}>
        {/* Pull-to-refresh functionality */}
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <Text styles={{ fontSize: 24 }}> Healthy Rewards </Text>
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
            }}
            style={styles.tabView}
          />
        </ScrollView>
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
  contentContainer: {
    paddingTop: 30
  },
  rewardsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgba(13, 99, 139, 0.8)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabView: {
    flex: 1
  }
});
