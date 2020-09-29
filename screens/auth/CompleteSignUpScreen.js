import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { Keyboard, View } from 'react-native';
import * as Sentry from 'sentry-expo';
import AuthTextField from '../../components/AuthTextField';
import {
  ButtonLabel,
  FilledButtonContainer,
  Subtitle,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { newSignUpBonus } from '../../constants/Rewards';
import { createCustomers, createPushTokens } from '../../lib/airtable/request';
import { inputFields } from '../../lib/authUtils';
import {
  logAuthErrorToSentry,
  logErrorToSentry,
  setUserLog,
} from '../../lib/logUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';

export default class CompleteSignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    const { number } = this.props.route.params;
    this.state = {
      number,
      values: {
        [inputFields.NAME]: '',
      },
      errors: {
        [inputFields.NAME]: '',
      },
    };
  }

  handleSubmit = async () => {
    try {
      this.completeSignUp();
    } catch (err) {
      console.error('[CompleteSignUpScreen] (handleSubmit) Airtable:', err);
      logAuthErrorToSentry({
        screen: 'CompleteSignUpScreen',
        action: 'handleSubmit',
        attemptedPhone: null,
        error: err,
      });
    }
    Keyboard.dismiss();
  };

  // Check for an error with updated text
  // Set errors and updated text in state
  updateError = async (text, inputField) => {
    let error = false;
    let errorMsg = '';
    // validate returns null if no error is found
    switch (inputField) {
      case inputFields.NAME:
        error = !text.replace(/\s/g, '').length;
        if (error) errorMsg = 'Name cannot be blank';
        break;
      default:
        console.log('Not reached');
    }
    this.setState((prevState) => ({
      errors: { ...prevState.errors, [inputField]: errorMsg },
      values: { ...prevState.values, [inputField]: text },
    }));

    return error;
  };

  // onBlur callback is required in case customer taps on field, does nothing, and taps out
  onBlur = async (inputField) => {
    await this.updateError(inputField);
  };

  // onTextChange does a check before updating errors
  // It can only remove errors, not trigger them
  onTextChange = async (text, inputField) => {
    // Only update error if there is currently an error
    if (this.state.errors[inputField]) {
      await this.updateError(text, inputField);
    } else {
      this.setState((prevState) => ({
        values: { ...prevState.values, [inputField]: text },
      }));
    }
  };

  // Add customer to Airtable, creating a push token record first.
  addCustomer = async () => {
    const { token, values } = this.state;
    const name = values[inputFields.NAME];
    const phoneNumber = this.state.number;
    try {
      let pushTokenId = null;
      if (token) {
        pushTokenId = await createPushTokens({ token });
      }
      const customerId = await createCustomers({
        name,
        phoneNumber,
        points: newSignUpBonus,
        pushTokenIds: pushTokenId ? [pushTokenId] : null,
      });
      // If signup succeeds, register the user for analytics and logging
      setUserLog({ id: customerId, name, phoneNumber });
      Analytics.logEvent('sign_up_complete', {
        customer_id: customerId,
      });
      Sentry.captureMessage('Sign Up Successful');
      return customerId;
    } catch (err) {
      console.error('[CompleteSignUpScreen] (addCustomer) Airtable:', err);
      logErrorToSentry({
        screen: 'CompleteSignUpScreen',
        action: 'addCustomer',
        error: err,
      });
    }
    return null;
  };

  _asyncSignUp = async (customerId) => {
    await AsyncStorage.setItem('customerId', customerId);
    Keyboard.dismiss();
    this.props.navigation.navigate('Permissions');
  };

  completeSignUp = async () => {
    const customerId = await this.addCustomer();
    await this._asyncSignUp(customerId);
  };

  render() {
    const { errors, values } = this.state;

    const permission = values[inputFields.NAME] && !errors[inputFields.NAME];

    return (
      <AuthScreenContainer>
        <View>
          <BackButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          <Subtitle>What is your name?</Subtitle>
          <FormContainer>
            <AuthTextField
              fieldType="Name"
              value={this.state.values[inputFields.NAME]}
              onBlurCallback={(value) =>
                this.updateError(value, inputFields.NAME)
              }
              changeTextCallback={async (text) =>
                this.onTextChange(text, inputFields.NAME)
              }
              error={this.state.errors[inputFields.NAME]}
            />
          </FormContainer>
          <FilledButtonContainer
            style={{ marginTop: 48 }}
            color={!permission ? Colors.lightestGreen : Colors.primaryGreen}
            width="100%"
            onPress={() => this.handleSubmit()}
            disabled={!permission}>
            <ButtonLabel color={Colors.lightText}>Finish</ButtonLabel>
          </FilledButtonContainer>
        </View>
      </AuthScreenContainer>
    );
  }
}

CompleteSignUpScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
