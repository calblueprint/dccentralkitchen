import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { Keyboard, View } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  ButtonContainer,
  ButtonLabel,
  FilledButtonContainer,
  Subtitle,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { inputFields } from '../../lib/authUtils';
import { logErrorToSentry } from '../../lib/logUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import validate from './validation';

export default class VerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    const {
      number,
      customerId,
      resend,
      verificationId,
    } = this.props.route.params;
    this.state = {
      number,
      customerId,
      resend,
      verificationId,
      values: { [inputFields.CODE]: '' },
      errors: { [inputFields.CODE]: '' },
    };
  }

  updateError = async (text, inputField) => {
    let errorMsg = '';
    // validate returns null if no error is found
    switch (inputField) {
      case inputFields.CODE:
        errorMsg = validate('code', text);
        break;
      default:
        console.log('Not reached');
    }

    this.setState((prevState) => ({
      errors: { ...prevState.errors, [inputField]: errorMsg },
      values: { ...prevState.values, [inputField]: text },
    }));
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

  resendCode = async () => {
    await this.state.resend();
  };

  verifyCode = async (code) => {
    try {
      console.log(this.state.verificationId);
      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.state.verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);
      console.log('VERIFICATION COMPLETE NAVIGATION GOES ON');
      if (this.state.customerId) {
        await AsyncStorage.setItem('customerId', this.state.customerId);
        Keyboard.dismiss();
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('CompleteSignUp', {
          number: this.state.number,
        });
      }
    } catch (err) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [inputFields.CODE]: 'Incorrect verification code, please try again.',
        },
      }));
      console.log(err);
      logErrorToSentry({
        screen: 'VerificationScreen',
        action: 'verifyCode',
        error: err,
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AuthScreenContainer>
          <BackButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          <Subtitle style={{ paddingTop: 32 }}>
            {`Enter the 6-digit code sent to you at \n ${this.state.number}`}
          </Subtitle>
          <FormContainer>
            <AuthTextField
              fieldType="Verification Code"
              value={this.state.values[inputFields.CODE]}
              onBlurCallback={(value) =>
                this.updateError(value, inputFields.CODE)
              }
              changeTextCallback={(text) => {
                this.onTextChange(text, inputFields.CODE);
              }}
              error={this.state.errors[inputFields.CODE]}
            />
            <ButtonContainer onPress={async () => this.resendCode(false)}>
              <ButtonLabel noCaps color={Colors.primaryGreen}>
                Resend code
              </ButtonLabel>
            </ButtonContainer>
          </FormContainer>
          <FilledButtonContainer
            style={{ marginTop: 48, marginBottom: 24 }}
            color={Colors.primaryGreen}
            width="100%"
            onPress={() =>
              this.verifyCode(this.state.values[inputFields.CODE])
            }>
            <ButtonLabel color={Colors.lightText}>Verify Number</ButtonLabel>
          </FilledButtonContainer>
        </AuthScreenContainer>
      </View>
    );
  }
}

VerificationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
