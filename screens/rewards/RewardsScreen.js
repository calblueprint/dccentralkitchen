import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, ScrollView, View } from 'react-native';
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
import RewardsHome from '../../components/rewards/RewardsHome';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import RecordIds from '../../constants/RecordIds';
import { getCustomersById } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';
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
    };
  }

  // Load customer record & transactions
  async componentDidMount() {
    const customerId = await AsyncStorage.getItem('customerId');
    const isGuest = customerId === RecordIds.guestCustomerId;
    try {
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
    }
  }

  _logout = async () => {
    this.props.navigation.goBack();
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth', { screen: 'SignUp' });
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
            <FontAwesome5 name="arrow-down" solid size={24} color="white" />
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
              <ButtonLabel color={Colors.lightText}>
                Sign Up For Rewards
              </ButtonLabel>
            </FilledButtonContainer>
          </ScrollView>
        ) : (
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
            // eslint-disable-next-line react/no-unused-state
            onIndexChange={(index) => this.setState({ index })}
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
