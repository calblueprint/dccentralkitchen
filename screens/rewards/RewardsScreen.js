import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Updates } from 'expo';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
  NavButtonContainer,
  NavHeaderContainer,
} from '../../components/BaseComponents';
import HowItWorks from '../../components/rewards/HowItWorks';
import ParticipatingStores from '../../components/rewards/ParticipatingStores';
import PointsHistory from '../../components/rewards/PointsHistory';
import RewardsFAQ from '../../components/rewards/RewardsFAQ';
import RewardsHome from '../../components/rewards/RewardsHome';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import RecordIds from '../../constants/RecordIds';
import { getCustomersById } from '../../lib/airtable/request';
import { clearUserLog, logErrorToSentry } from '../../lib/logUtils';
import { getStoreData } from '../../lib/mapUtils';
import { getCustomerTransactions } from '../../lib/rewardsUtils';
import { styles } from '../../styled/rewards';

const routes = [
  { key: 'home', title: 'My Rewards' },
  { key: 'history', title: 'Points History' },
  { key: 'howitworks', title: 'How It Works' },
];

export default class RewardsScreen extends React.Component {
  constructor(props) {
    super(props);
    const tab = this.props.tab || 0;
    this.state = {
      customer: null,
      transactions: [],
      participating: [],
      // eslint-disable-next-line react/no-unused-state
      index: tab,
      // eslint-disable-next-line react/no-unused-state
      routes,
      isLoading: true,
      isGuest: false,
      logoutIsLoading: false,
    };
  }

  // Load customer record & transactions
  async componentDidMount() {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      const isGuest = customerId === RecordIds.guestCustomerId;
      const customer = await getCustomersById(customerId);
      const transactions = await getCustomerTransactions(customerId);
      const participating = await getStoreData(`NOT({Rewards Accepted} = '')`);

      this.setState({
        isGuest,
        customer,
        transactions,
        participating,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      logErrorToSentry({
        screen: 'RewardsScreem',
        action: 'componentDidMount',
        error: err,
      });
      Alert.alert('Session Expired', 'Refresh the app and log in again.', [
        { text: 'OK', onPress: () => this._logout() },
      ]);
    }
  }

  _logout = async () => {
    // Show the loading indicator
    this.setState({ logoutIsLoading: true });
    await Analytics.logEvent('logout', {
      is_guest: true,
      redirect_to: 'Sign Up', // Redirect not working yet
    });
    // Delay to make sure the event is logged
    const delay = (duration) =>
      new Promise((resolve) => setTimeout(resolve, duration));
    await delay(3000);
    clearUserLog();
    this.props.navigation.navigate('Stores');
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth', { screen: 'SignUp' });
    // Temporary fix: force update to make sure the rewards footer refreshes
    Updates.reload();
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return (
          <RewardsHome
            customer={this.state.customer}
            participating={this.state.participating}
          />
        );
      case 'history':
        return <PointsHistory transactions={this.state.transactions} />;
      case 'howitworks':
        return (
          <HowItWorks
            isGuest={this.state.isGuest}
            participating={this.state.participating}
          />
        );
      default:
        return null;
    }
  };

  renderTabBar = (props) => {
    return (
      <TabBar
        style={styles.tabBar}
        labelStyle={styles.tabBarLabel}
        tabStyle={{ width: 'auto' }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        indicatorStyle={styles.tabBarIndicator}
        scrollEnabled
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <NavHeaderContainer
          vertical
          noShadow
          backgroundColor={Colors.primaryGreen}>
          <NavButtonContainer onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5
              name="arrow-down"
              solid
              size={24}
              color={Colors.lightText}
            />
          </NavButtonContainer>
          <BigTitle
            style={{
              marginLeft: 18,
              color: Colors.lightText,
              fontSize: 36,
            }}>
            Healthy Rewards
          </BigTitle>
        </NavHeaderContainer>
        {this.state.isGuest ? (
          <ScrollView>
            <HowItWorks
              isGuest={this.state.isGuest}
              participating={this.state.participating}
            />
            <ParticipatingStores
              participating={this.state.participating}
              guest
            />
            <FilledButtonContainer
              style={{ marginBottom: 24, alignSelf: 'center' }}
              color={Colors.primaryGreen}
              width="267px"
              onPress={() => this._logout()}>
              {this.state.logoutIsLoading ? (
                <ActivityIndicator color={Colors.lightText} />
              ) : (
                <ButtonLabel color={Colors.lightText}>
                  Sign Up For Rewards
                </ButtonLabel>
              )}
            </FilledButtonContainer>
            <RewardsFAQ />
          </ScrollView>
        ) : (
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
            onIndexChange={(index) => {
              // eslint-disable-next-line react/no-unused-state
              this.setState({ index });
              Analytics.setCurrentScreen(routes[index].title);
            }}
            initialLayout={{
              width: Window.width,
              height: Window.height,
            }}
            style={styles.tabView}
          />
        )}
      </View>
    );
  }
}

RewardsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  tab: PropTypes.number,
};

RewardsScreen.defaultProps = {
  tab: null,
};
