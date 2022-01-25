import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import {
  ButtonLabel,
  FilledButtonContainer,
  OutlinedButtonContainer,
  Subtitle,
  Title,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import { updateCustomer } from '../../lib/airtable/request';
import { notificationTypes, sendTextMessage } from '../../lib/authUtils';
import { logErrorToSentry } from '../../lib/logUtils';
import { PermissionsContainer } from '../../styled/auth';
import { ColumnContainer } from '../../styled/shared';

export default function PermissionsScreen(props) {
  const [step, setStep] = useState(1);

  const enableNotifications = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('customerId');
      const customerId = JSON.parse(jsonValue);
      // Only SMS supported as of 11/14/20
      await updateCustomer(customerId.id, {
        deliveryNotifications: [notificationTypes.SMS],
        generalNotifications: [notificationTypes.SMS],
      });

      const response = await sendTextMessage(
        customerId.id,
        'Healthy Corners: Thank you for joining Healthy Corners notifications. Reply STOP to unsubscribe.'
      );

      console.log(
        response ? '[sendTextMessage] Success' : '[sendTextMessage] Failed'
      );
      navigateMapScreen();
    } catch (err) {
      console.error('[PermissionsScreen] (enableNotifications) Airtable:', err);
      logErrorToSentry({
        screen: 'PermissionsScreen',
        action: 'enableNotifications',
        error: err,
      });
    }
  };

  const navigateStoreSelect = () => {
    props.navigation.navigate('StoreSelect', {
      navigation: props.navigation,
      updateStep: () => {
        setStep(2);
      },
    });
  };

  const navigateMapScreen = async () => {
    props.navigation.navigate('App');
  };

  return (
    <PermissionsContainer>
      <Subtitle color={Colors.secondaryText}>{`Step ${step} of 2`}</Subtitle>
      <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
        <Image
          source={
            step === 1
              ? require('../../assets/images/Onboarding_2.png')
              : require('../../assets/images/Onboarding_3.png')
          }
          style={{
            height: Window.height / 3,
            resizeMode: 'contain',
            marginBottom: 24,
          }}
        />
        <Title textAlign="center">
          {step === 1
            ? 'What are your favorite corner stores?'
            : 'Can we keep in touch?'}
        </Title>
        <Subtitle textAlign="center">
          {step === 1
            ? 'Plan your grocery runs knowing what is in stock, store hours, and more.'
            : 'Get notifications when your store gets new deliveries'}
        </Subtitle>
        {/* Display login/get started buttons */}
        <ColumnContainer style={{ marginTop: 40 }} width="100%">
          <FilledButtonContainer
            color={Colors.primaryGreen}
            onPress={() =>
              step === 1 ? navigateStoreSelect() : enableNotifications()
            }>
            <ButtonLabel color={Colors.lightText}>
              {step === 1 ? 'Search nearby stores' : 'Enable SMS notifications'}
            </ButtonLabel>
          </FilledButtonContainer>
          <OutlinedButtonContainer
            style={{ marginTop: 8 }}
            onPress={() => (step === 1 ? setStep(2) : navigateMapScreen())}>
            <ButtonLabel color={Colors.primaryGreen}>Not now</ButtonLabel>
          </OutlinedButtonContainer>
        </ColumnContainer>
      </View>
    </PermissionsContainer>
  );
}

PermissionsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
