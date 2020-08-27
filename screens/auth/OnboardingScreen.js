import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
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
            flex: 1,
            height: '100%',
            width: '100%',
          }}
        />
        <ColumnContainer>
          <Title style={{ textAlign: 'center' }}>{item.title}</Title>
          <Body style={{ marginTop: 12, textAlign: 'center' }}>
            {item.body}
          </Body>
        </ColumnContainer>
      </OnboardingContentContainer>
    );
  };

  guestLogin = async () => {
    await AsyncStorage.setItem('customerId', RecordIds.guestCustomerId);
    Analytics.logEvent('guest_login_complete', {
      installation_id: Constants.installationId,
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
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({ pageIndex: index })}
          sliderWidth={Window.width - 80}
          itemWidth={Window.width - 80}
        />

        {/* Display pagination dots */}
        {this.pagination}

        {/* Display login/get started buttons */}
        <ColumnContainer style={{ marginTop: 20 }}>
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
      </OnboardingContainer>
    );
  }
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
