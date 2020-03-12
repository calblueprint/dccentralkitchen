import React from 'react';
import {
  AsyncStorage,
  Dimensions,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import PointsHistory from '../../components/rewards/PointsHistory';
import RewardsHome from '../../components/rewards/RewardsHome';
import { getCustomerTransactions, getUser } from '../../lib/rewardsUtils';
import {
  Container,
  ScrollViewContainer,
  styles,
  TopTab
} from '../../styled/rewards';
import { Body, Caption, Title } from '../../components/BaseComponents';

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
      .then(exists => {
        if (exists) {
          // Get transactions
          getCustomerTransactions(userId).then(transactions => {
            this.setState({ latestTransaction: transactions[0], transactions });
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  // This is what runs when you pull to refresh - (what runs in componentDidMount plus some modifications)
  // It updates the current transactions & user points,
  // sets 'update' to true if the latest transaction is new
  // or if the latest transaction does not have a receipt attached
  // which prompts on the History page
  _onRefresh = async () => {
    this.setState({ refreshing: true });
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
        }
      })
      .catch(err => console.error(err));
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
        style={styles.tabBar}
        labelStyle={styles.tabBarLabel}
        {...props}
        indicatorStyle={styles.tabBarIndicator}
      />
    );
  };

  render() {
    return (
      <Container>
        <TopTab>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Stores')}>
              {/* TODO: change this to a proper icon */}
              <Text style={{ color: 'white', fontSize: 25 }}> ▼ </Text>
            </TouchableOpacity>

            <Title style={{ color: 'white', fontSize: 30 }}>
              Healthy Rewards
            </Title>
          </View>
        </TopTab>
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
      </Container>
    );
  }
}

RewardsScreen.navigationOptions = {
  headerShown: false
};
