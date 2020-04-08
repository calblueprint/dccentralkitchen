import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, Dimensions, Image, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
  NavButton,
  NavHeaderContainer,
} from '../../components/BaseComponents';
import PointsHistory from '../../components/rewards/PointsHistory';
import RewardsHome from '../../components/rewards/RewardsHome';
import Colors from '../../constants/Colors';
import { getCustomersById } from '../../lib/airtable/request';
import { getCustomerTransactions } from '../../lib/rewardsUtils';
import { styles } from '../../styled/rewards';

const routes = [
  { key: 'home', title: 'My Rewards' },
  { key: 'history', title: 'Points History' },
];

export default class RewardsScreen extends React.Component {
  constructor(props) {
    super(props);
    const tab = this.props.tab || 0;
    this.state = {
      customer: null,
      transactions: [],
      index: tab,
      routes,
      isLoading: true,
      isGuest: false,
    };
  }

  // Load customer record & transactions
  async componentDidMount() {
    const customerId = await AsyncStorage.getItem('userId');
    const customer = await getCustomersById(customerId);
    const isGuest = customerId === 'recLKK7cZHboMPEB8';
    const transactions = await getCustomerTransactions(customerId);
    this.setState({
      customer,
      transactions,
      isGuest,
      isLoading: false,
    });
  }

  _logout = async () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <RewardsHome customer={this.state.customer} />;
      case 'history':
        return <PointsHistory transactions={this.state.transactions} />;
      default:
        return null;
    }
  };

  renderTabBar = props => {
    return (
      <TabBar
        style={styles.tabBar}
        labelStyle={styles.tabBarLabel}
        tabStyle={{ width: 'auto' }}
        {...props}
        indicatorStyle={styles.tabBarIndicator}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    if (this.state.isGuest) {
      return (
        <View style={{ flex: 1 }}>
          <NavHeaderContainer vertical backgroundColor={Colors.primaryGreen}>
            <NavButton onPress={() => this.props.navigation.goBack()}>
              <FontAwesome5 name="arrow-down" solid size={24} color="white" />
            </NavButton>
            <BigTitle
              style={{
                marginLeft: 18,
                color: Colors.lightest,
                fontSize: 36,
              }}>
              How it Works
            </BigTitle>
          </NavHeaderContainer>
          <Image
            source={require('../../assets/images/guest.jpeg')}
            style={{
              width: 343,
              height: 537,
              display: 'flex',
              alignContent: 'center',
            }}
          />
          <FilledButtonContainer
            style={{ marginTop: 24, alignSelf: 'center' }}
            color={Colors.primaryGreen}
            width="267px"
            onPress={() => this._logout()}>
            <ButtonLabel color={Colors.lightest}>Sign Up</ButtonLabel>
          </FilledButtonContainer>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <NavHeaderContainer
          vertical
          noShadow
          backgroundColor={Colors.primaryGreen}>
          <NavButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-down" solid size={24} color="white" />
          </NavButton>
          <BigTitle
            style={{
              marginLeft: 18,
              color: Colors.lightest,
              fontSize: 36,
            }}>
            Healthy Rewards
          </BigTitle>
        </NavHeaderContainer>
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          style={styles.tabView}
        />
      </View>
    );
  }
}

RewardsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  tab: PropTypes.any,
};

RewardsScreen.defaultProps = {
  tab: null,
};
