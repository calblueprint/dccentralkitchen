/* eslint-disable react/no-string-refs */
/* eslint-disable react/jsx-curly-brace-presence */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  Body,
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
  Title,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import ONBOARDING_CONTENT from '../../constants/Onboarding';
import RecordIds from '../../constants/RecordIds';
import {
  OnboardingContainer,
  OnboardingContentContainer,
  styles,
} from '../../styled/auth';
import { ColumnContainer } from '../../styled/shared';

export default class OnboardingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pageIndex: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 10);
  }

  get pagination() {
    return (
      // TODO @tommypoa: Move styles to styled folder?
      <Pagination
        dotsLength={ONBOARDING_CONTENT.length}
        activeDotIndex={this.state.pageIndex}
        containerStyle={{ backgroundColor: Colors.bgLight, marginTop: 20 }}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={{ backgroundColor: Colors.primaryGray }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }

  _renderItem = ({ item, _ }) => {
    return (
      <OnboardingContentContainer>
        <Image
          source={item.illustration}
          resizeMode="contain"
          style={{
            height: '70%',
            width: '100%',
            margin: 0,
          }}
        />
        <ColumnContainer>
          <Title style={{ textAlign: 'center' }}>{item.title}</Title>
          <Body style={{ marginTop: 12, textAlign: 'center' }}>
            {item.body}
          </Body>
        </ColumnContainer>
        {/* Display login/get started buttons */}
        {this.state.pageIndex === 4 && (
          <ColumnContainer style={{ marginTop: 12 }}>
            <FilledButtonContainer
              width="100%"
              onPress={() => this.navigateAuth()}>
              <ButtonLabel color="white">Get started</ButtonLabel>
            </FilledButtonContainer>
            <ButtonContainer
              style={{ marginTop: 4, padding: 12 }}
              onPress={async () => this.guestLogin()}>
              <ButtonLabel noCaps color={Colors.primaryGreen}>
                Continue as guest
              </ButtonLabel>
            </ButtonContainer>
          </ColumnContainer>
        )}
      </OnboardingContentContainer>
    );
  };

  guestLogin = async () => {
    const customerObj = {
      id: RecordIds.guestCustomerId,
      showLandingScreen: true,
    };
    const jsonValue = JSON.stringify(customerObj);
    await AsyncStorage.setItem('customerId', jsonValue);
    Analytics.logEvent('guest_login_complete', {
      installation_id: RecordIds.guestCustomerId,
    });
    this.props.navigation.navigate('App');
  };

  navigateAuth() {
    this.props.navigation.navigate('PhoneNumber');
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <OnboardingContainer>
        {/* Display sliding content: 80 = 2 * 40px for marginWidth
        containerCustomStyle height: 337 to bound the size of carousel
        */}
        <Carousel
          data={ONBOARDING_CONTENT}
          useScrollView
          renderItem={this._renderItem}
          onSnapToItem={(index) => {
            this.setState({ pageIndex: index });
          }}
          onScrollBeginDrag={(e) => {
            if (this.state.pageIndex === 4) {
              this.setState({ pageIndex: 3 });
            }
          }}
          sliderWidth={Window.width - 80}
          itemWidth={Window.width - 80}
        />

        {/* Display pagination dots */}
        {this.pagination}
      </OnboardingContainer>
    );
  }
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
