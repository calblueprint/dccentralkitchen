import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
  NavHeaderContainer,
  Subtitle,
  Title,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { HowItWorksContainer } from '../../styled/rewards';
import { ColumnContainer } from '../../styled/shared';

export default function GettingStartedScreen(props) {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer
        vertical
        noShadow
        backgroundColor={Colors.primaryGreen}>
        <BigTitle
          style={{
            color: Colors.lightText,
            fontSize: 36,
            marginLeft: 60,
          }}>
          Getting Started
        </BigTitle>
      </NavHeaderContainer>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 16,
        }}>
        <HowItWorksContainer>
          <Image
            source={require('../../assets/images/Onboarding_2.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              height: 140,
              marginRight: 12,
            }}
          />
          <ColumnContainer style={{ flex: 1 }}>
            <Title>Find Stores Near You</Title>
            <Subtitle>
              Explore the map to discover nearby stores stocking healthy fruits
              and vegetables
            </Subtitle>
          </ColumnContainer>
        </HowItWorksContainer>

        <HowItWorksContainer>
          <Image
            source={require('../../assets/images/Onboarding_3.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              height: 140,
              marginRight: 12,
            }}
          />
          <ColumnContainer style={{ flex: 1 }}>
            <Title>Know What&apos;s In Stock</Title>
            <Subtitle>
              See what products are available when you leave the house
            </Subtitle>
          </ColumnContainer>
        </HowItWorksContainer>

        <HowItWorksContainer>
          <Image
            source={require('../../assets/images/Onboarding_5.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              height: 140,
              marginRight: 12,
            }}
          />
          <ColumnContainer style={{ flex: 1 }}>
            <Title>Stay Informed</Title>
            <Subtitle>
              Access our resource database to help you continue eating and
              living healthy.
            </Subtitle>
          </ColumnContainer>
        </HowItWorksContainer>

        <View style={styles.checkboxContainer}>
          <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={styles.label}>Do not show again</Text>
        </View>

        <FilledButtonContainer
          width="100%"
          style={{ marginTop: 60 }}
          onPress={() => {
            props.navigation.navigate('Stores');
          }}>
          <ButtonLabel color="white">Continue To App</ButtonLabel>
        </FilledButtonContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

GettingStartedScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
