import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Window from '../../constants/Layout';
import { HowItWorksContainer } from '../../styled/rewards';
import { ColumnContainer } from '../../styled/shared';
import { DragBar } from '../../styled/store';

export default function GettingStartedScreen({ route, navigation }) {
  const [checked, setChecked] = React.useState(false);
  const { customerId } = route.params;

  async function handleCheckbox() {
    setChecked(!checked);
    const customerObj = {
      id: customerId.id,
      showLandingScreen: checked,
    };
    const jsonValue = JSON.stringify(customerObj);
    await AsyncStorage.setItem('customerId', jsonValue);
  }

  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer
        vertical
        noShadow
        backgroundColor={Colors.primaryGreen}
        paddingTop={0}
        alignItems="center"
        height={Window.height * (10 / 100)}>
        <DragBar
          style={{ backgroundColor: Colors.lightText, marginBottom: 'auto' }}
        />
        <BigTitle
          style={{
            color: Colors.lightText,
            fontSize: 36,
            marginBottom: 'auto',
          }}>
          Getting Started
        </BigTitle>
      </NavHeaderContainer>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2%',
          height: Window.height * (75 / 100),
        }}>
        <View>
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
                Explore the map to discover nearby stores stocking healthy
                fruits and vegetables
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
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            onPress={handleCheckbox}
            color={Colors.primaryGreen}
          />
          <Text style={styles.label}>Do not show again</Text>
        </View>

        <FilledButtonContainer
          width="90%"
          onPress={() => {
            navigation.navigate('Stores');
          }}>
          <ButtonLabel color="white">Continue To App</ButtonLabel>
        </FilledButtonContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
  },

  label: {
    margin: 8,
  },
});

GettingStartedScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
