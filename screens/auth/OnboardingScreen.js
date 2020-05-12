import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  Body,
  ButtonLabel,
  FilledButtonContainer,
  Title,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import ONBOARDING_CONTENT from '../../constants/Onboarding';
import { OnboardingContainer, styles } from '../../styled/auth';
import {
  ColumnContainer,
  SpaceBetweenColumnContainer,
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
        containerStyle={{ backgroundColor: Colors.lightest, marginTop: 20 }}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={{ backgroundColor: Colors.base }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }

  _renderItem = ({ item, _ }) => {
    return (
      <SpaceBetweenColumnContainer>
        <View
          style={{
            flex: 1,
          }}>
          <Image
            source={item.illustration}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
        </View>
        <ColumnContainer>
          <Title style={{ textAlign: 'center' }}>{item.title}</Title>
          <Body style={{ marginTop: 12, textAlign: 'center' }}>
            {item.body}
          </Body>
        </ColumnContainer>
      </SpaceBetweenColumnContainer>
    );
  };

  navigateWelcome() {
    this.props.navigation.navigate('Welcome');
  }

  navigateLogIn() {
    this.props.navigation.navigate('LogIn');
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
          containerCustomStyle={{
            maxHeight: 1000,
            backgroundColor: 'yellow',
          }}
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
