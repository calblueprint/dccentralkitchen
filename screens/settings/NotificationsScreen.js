import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Switch } from 'react-native-paper';
import {
  Body,
  ButtonLabel,
  FilledButtonContainer,
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
  Subtitle,
  Title,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { getCustomerById, updateCustomer } from '../../lib/airtable/request';
import { getAsyncCustomerAuth, notificationTypes } from '../../lib/authUtils';
import { logErrorToSentry } from '../../lib/logUtils';
import { ContentContainer, ResourceItemCard } from '../../styled/resources';

export default class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generalNotifs: {
        [notificationTypes.SMS]: false,
        [notificationTypes.PUSH]: false,
      },
      deliveryNotifs: {
        [notificationTypes.SMS]: false,
        [notificationTypes.PUSH]: false,
      },
    };
  }

  async componentDidMount() {
    try {
      const customerId = await getAsyncCustomerAuth();
      if (customerId != null) {
        const customer = await getCustomerById(customerId.id);
        if (customer.generalNotifications) {
          customer.generalNotifications.forEach((element) => {
            this.setState((prevState) => ({
              generalNotifs: {
                ...prevState.generalNotifs,
                [notificationTypes[element.toUpperCase()]]: true,
              },
              deliveryNotifs: { ...prevState.deliveryNotifs },
            }));
          });
        }
        if (customer.deliveryNotifications) {
          customer.deliveryNotifications.forEach((element) => {
            this.setState((prevState) => ({
              generalNotifs: {
                ...prevState.generalNotifs,
              },
              deliveryNotifs: {
                ...prevState.deliveryNotifs,
                [notificationTypes[element.toUpperCase()]]: true,
              },
            }));
          });
        }
      }
    } catch (err) {
      console.error('[NotificationsScreen] Airtable:', err);
      logErrorToSentry({
        screen: 'NotificationsScreen',
        action: 'componentDidMount',
        error: err,
      });
    }
  }

  // TODO: consolidate these?

  toggleGeneralNotif = (notificationType) => {
    this.setState((prevState) => {
      return {
        generalNotifs: {
          ...prevState.generalNotifs,
          [notificationType]: !prevState.generalNotifs[notificationType],
        },
        deliveryNotifs: {
          ...prevState.deliveryNotifs,
        },
      };
    });
  };

  toggleDeliveryNotif = (notificationType) => {
    this.setState((prevState) => {
      return {
        generalNotifs: {
          ...prevState.generalNotifs,
        },
        deliveryNotifs: {
          ...prevState.deliveryNotifs,
          [notificationType]: !prevState.deliveryNotifs[notificationType],
        },
      };
    });
  };

  saveNotificationsSettings = async () => {
    try {
      const customerId = await getAsyncCustomerAuth();
      const generalPrefs = Object.keys(this.state.generalNotifs).filter(
        function(type) {
          return this.state.generalNotifs[type];
        }.bind(this)
      );

      const deliveryPrefs = Object.keys(this.state.deliveryNotifs).filter(
        function(type) {
          return this.state.deliveryNotifs[type];
        }.bind(this)
      );

      await updateCustomer(customerId.id, {
        generalNotifications: generalPrefs,
        deliveryNotifications: deliveryPrefs,
      });
      await this.props.navigation.goBack();
    } catch (err) {
      console.error(
        '[NotificationsScreen] (saveNotificationsSettings) Airtable:',
        err
      );
      logErrorToSentry({
        screen: 'NotificationsScreen',
        action: 'saveNotificationsSettings',
        error: err,
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavHeaderContainer withMargin>
          <NavButtonContainer onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </NavButtonContainer>
          <NavTitle>Notifications</NavTitle>
        </NavHeaderContainer>
        <ScrollView>
          <ResourceItemCard>
            <ContentContainer>
              <Title color={Colors.activeText}>Delivery Alerts</Title>
              <Body color={Colors.secondaryText}>
                Get notified when your favorite stores get new products
                delivered.
              </Body>
            </ContentContainer>
          </ResourceItemCard>
          <ResourceItemCard>
            <Subtitle color={Colors.activeText}>Text messages</Subtitle>
            <Switch
              style={{ marginLeft: 4 }}
              value={this.state.deliveryNotifs[notificationTypes.SMS]}
              onValueChange={() =>
                this.toggleDeliveryNotif(notificationTypes.SMS)
              }
              color={Colors.primaryGreen}
            />
          </ResourceItemCard>
          {/* 11/14/20 Temporarily removed until push notifications are supported */}
          {/* <ResourceItemCard>
            <Subtitle color={Colors.activeText}>Push notifications</Subtitle>
            <Switch
              style={{ marginLeft: 4 }}
              value={this.state.deliveryNotifs[notificationTypes.PUSH]}
              onValueChange={() =>
                this.toggleDeliveryNotif(notificationTypes.PUSH)
              }
              color={Colors.primaryGreen}
            />
          </ResourceItemCard> */}
          <ResourceItemCard style={{ paddingTop: 32 }}>
            <ContentContainer>
              <Title color={Colors.activeText}>Discounts and News</Title>
              <Body color={Colors.secondaryText}>
                Special offers, recommendations, store updates, and more.
              </Body>
            </ContentContainer>
          </ResourceItemCard>
          <ResourceItemCard>
            <Subtitle color={Colors.activeText}>Text messages</Subtitle>
            <Switch
              style={{ marginLeft: 4 }}
              value={this.state.generalNotifs[notificationTypes.SMS]}
              onValueChange={() =>
                this.toggleGeneralNotif(notificationTypes.SMS)
              }
              color={Colors.primaryGreen}
            />
          </ResourceItemCard>
          {/* 11/14/20 Temporarily removed until push notifications are supported */}
          {/* <ResourceItemCard>
            <Subtitle color={Colors.activeText}>Push notifications</Subtitle>
            <Switch
              style={{ marginLeft: 4 }}
              value={this.state.generalNotifs[notificationTypes.PUSH]}
              onValueChange={() =>
                this.toggleGeneralNotif(notificationTypes.PUSH)
              }
              color={Colors.primaryGreen}
            />
          </ResourceItemCard> */}
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: 24,
          }}>
          <FilledButtonContainer
            onPress={() => this.saveNotificationsSettings()}>
            <ButtonLabel color={Colors.lightText}>Save Changes</ButtonLabel>
          </FilledButtonContainer>
        </View>
      </View>
    );
  }
}

NotificationsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
