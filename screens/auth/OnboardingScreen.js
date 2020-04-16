import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  Body,
  ButtonLabel,
  FilledButtonContainer,
  Title,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import {
  ONBOARDING_CONTENT,
  ONBOARDING_IMAGES,
} from '../../constants/Onboarding';
import { OnboardingContainer } from '../../styled/auth';
import {
  JustifyCenterContainer,
  SpaceBetweenRowContainer,
} from '../../styled/shared';

export default class OnboardingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pageIndex: 0,
    };
  }

  get pagination() {
    return (
      // TODO @tommypoa: Move styles to styled folder?
      <Pagination
        dotsLength={ONBOARDING_CONTENT.length}
        activeDotIndex={this.state.pageIndex}
        containerStyle={{ backgroundColor: Colors.lightest, marginTop: 20 }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 1,
          backgroundColor: Colors.primaryGreen,
        }}
        inactiveDotStyle={{
          backgroundColor: Colors.base,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }

  navigateWelcome() {
    this.props.navigation.navigate('Welcome');
  }

  navigateLogIn() {
    this.props.navigation.navigate('LogIn');
  }

  _renderItem({ item, index }) {
    return (
      <JustifyCenterContainer>
        <Image
          source={ONBOARDING_IMAGES[index]}
          style={{ height: 55, width: 190 }}
        />
        <Title style={{ marginTop: 200 }}>{item.title}</Title>
        <Body style={{ marginTop: 12, textAlign: 'center' }}>{item.body}</Body>
      </JustifyCenterContainer>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 10);
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <OnboardingContainer>
        {/* Display sliding content */}
        <Carousel
          data={ONBOARDING_CONTENT}
          renderItem={this._renderItem}
          onSnapToItem={index => this.setState({ pageIndex: index })}
          sliderWidth={300}
          itemWidth={300}
        />

        {/* Display pagination dots */}
        {this.pagination}

        {/* Display login/get started buttons */}
        <SpaceBetweenRowContainer style={{ marginTop: 20 }}>
          <FilledButtonContainer
            width="48%"
            color={Colors.lighterGreen}
            onPress={() => this.navigateLogIn()}>
            <ButtonLabel color="white">Log In</ButtonLabel>
          </FilledButtonContainer>
          <FilledButtonContainer
            width="48%"
            onPress={() => this.navigateWelcome()}>
            <ButtonLabel color="white">Get started</ButtonLabel>
          </FilledButtonContainer>
        </SpaceBetweenRowContainer>
      </OnboardingContainer>
    );
  }
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
