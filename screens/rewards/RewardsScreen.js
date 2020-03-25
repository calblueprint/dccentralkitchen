import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { AsyncStorage, Dimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { Title } from '../../components/BaseComponents';
import PointsHistory from '../../components/rewards/PointsHistory';
import RewardsHome from '../../components/rewards/RewardsHome';
import { getCustomersById } from '../../lib/airtable/request';
import { getCustomerTransactions } from '../../lib/rewardsUtils';
import { BackButton, Container, styles, TopTab } from '../../styled/rewards';

const routes = [
  { key: 'home', title: 'My Rewards' },
  { key: 'history', title: 'Points History' }
];

export default class RewardsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      transactions: [],
      index: 0,
      routes,
      isLoading: true
    };
  }

  // Load customer record & transactions
  async componentDidMount() {
    const customerId = await AsyncStorage.getItem('userId');
    const customer = await getCustomersById(customerId);

    const transactions = await getCustomerTransactions(customerId);
    this.setState({
      customer,
      transactions,
      isLoading: false
    });
  }

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
        {...props}
        indicatorStyle={styles.tabBarIndicator}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <Container>
        <TopTab>
          <BackButton onPress={() => this.props.navigation.navigate('Stores')}>
            <FontAwesome5 name="arrow-down" solid size={24} color="white" />
          </BackButton>
          <Title
            style={{
              marginLeft: '5%',
              color: 'white',
              fontSize: 25,
              paddingBottom: 40
            }}>
            Healthy Rewards
          </Title>
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
