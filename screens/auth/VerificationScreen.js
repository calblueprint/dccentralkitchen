import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {
  ButtonContainer,
  ButtonLabel,
  Caption,
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
    this.state = {
      values: { [inputFields.CODE]: '' },
      errors: { [inputFields.CODE]: '' },
      isVerifyLoading: false,
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
      await this.updateError('', inputField);
      this.setState((prevState) => ({
        errors: { ...prevState.errors, [inputField]: '' },
      }));
    }
    this.setState((prevState) => ({
      values: { ...prevState.values, [inputField]: text },
    }));
    this.setState({ values: { [inputFields.CODE]: text } });
  };

  resendCode = async () => {
    const { resend } = this.props.route.params;
    this.props.navigation.goBack();
    await resend();
  };

  verifyCode = async (code) => {
    try {
      const { verificationId, callBack } = this.props.route.params;
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);
      Analytics.logEvent('phone_number_verified');
      await callBack();
      this.setState({ isVerifyLoading: false });
    } catch (err) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [inputFields.CODE]: 'Incorrect verification code, please try again.',
        },
        values: {
          ...prevState.values,
          [inputFields.CODE]: '',
        },
        isVerifyLoading: false,
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
    const { number } = this.props.route.params;
    const validNumber = this.state.values[inputFields.CODE].length === 6;
    return (
      <View style={{ flex: 1 }}>
        <AuthScreenContainer>
          <BackButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          <Subtitle style={{ paddingTop: 32 }}>
            {`Enter the 6-digit code sent to you at ${number}`}
          </Subtitle>
          <FormContainer>
            <SmoothPinCodeInput
              cellStyle={
                this.state.errors[inputFields.CODE] !== ''
                  ? { borderBottomWidth: 2, borderColor: Colors.error }
                  : {
                      borderBottomWidth: 2,
                      borderColor: Colors.lighterGray,
                    }
              }
              cellStyleFocused={
                this.state.errors[inputFields.CODE] !== ''
                  ? { borderColor: Colors.error }
                  : {
                      borderColor: Colors.primaryGreen,
                      backgroundColor: Colors.lightestGreen,
                    }
              }
              textStyle={{
                color: Colors.activeText,
                fontSize: 24,
                fontFamily: 'opensans-regular',
              }}
              ref={(input) => {
                this.pinInput = input;
              }}
              cellSize={42}
              value={this.state.values[inputFields.CODE]}
              codeLength={6}
              onTextChange={(text) => this.onTextChange(text, inputFields.CODE)}
              onFulfill={() => {
                this.setState({ isVerifyLoading: true });
                setTimeout(() => {
                  this.verifyCode(this.state.values[inputFields.CODE]);
                }, 500);
              }}
              animated={false}
              restrictToNumbers
              autoFocus
            />
            <Caption style={{ marginTop: 8 }} color={Colors.error}>
              {this.state.errors[inputFields.CODE] ? `Incorrect code` : ` `}
            </Caption>
            <ButtonContainer
              disabled={this.state.isVerifyLoading}
              color={
                this.state.isVerifyLoading
                  ? Colors.lightestGreen
                  : Colors.primaryGreen
              }
              onPress={async () => this.resendCode(false)}>
              <ButtonLabel noCaps color={Colors.primaryGreen}>
                Resend code
              </ButtonLabel>
            </ButtonContainer>
          </FormContainer>
          <FilledButtonContainer
            style={{ marginTop: 48, marginBottom: 24 }}
            color={!validNumber ? Colors.lightestGreen : Colors.primaryGreen}
            width="100%"
            onPress={() => this.verifyCode(this.state.values[inputFields.CODE])}
            disabled={!validNumber || this.state.isVerifyLoading}>
            {this.state.isVerifyLoading ? (
              <ActivityIndicator color={Colors.lightText} />
            ) : (
              <ButtonLabel color={Colors.lightText}>Verify</ButtonLabel>
            )}
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
