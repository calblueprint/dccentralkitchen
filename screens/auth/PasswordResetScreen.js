import { FontAwesome5 } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  Caption,
  FilledButtonContainer,
  Subhead,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import firebaseConfig from '../../firebase';
import {
  getCustomersByPhoneNumber,
  updateCustomers,
} from '../../lib/airtable/request';
import {
  encryptPassword,
  formatPhoneNumber,
  inputFields,
} from '../../lib/authUtils';
import {
  AuthScreenContainer,
  AuthScrollContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import validate from './validation';
import VerificationScreen from './VerificationScreen';

export default class PasswordResetScreen extends React.Component {
  constructor(props) {
    super(props);
    const recaptchaVerifier = React.createRef();
    this.state = {
      customer: null,
      success: false,
      modalVisible: false,
      recaptchaVerifier,
      verificationId: null,
      verified: false,
      confirmed: false,
      formattedPhoneNumber: '',
      values: {
        [inputFields.PHONENUM]: '',
        [inputFields.NEWPASSWORD]: '',
        [inputFields.VERIFYPASSWORD]: '',
      },
      errors: {
        [inputFields.PHONENUM]: '',
        [inputFields.NEWPASSWORD]: '',
        [inputFields.VERIFYPASSWORD]: '',
      },
    };
  }

  // Check for an error with updated text
  // Set errors and updated text in state
  updateError = async (text, inputField) => {
    let error = false;
    let errorMsg = '';
    // validate returns null if no error is found
    switch (inputField) {
      case inputFields.PHONENUM:
        errorMsg = validate('phoneNumber', text);
        error = errorMsg !== null;
        break;
      case inputFields.NEWPASSWORD:
        errorMsg = validate('password', text);
        error = errorMsg !== null;
        break;
      case inputFields.VERIFYPASSWORD:
        // Compare with new value
        errorMsg =
          this.state.values[inputFields.NEWPASSWORD] === text
            ? null
            : 'Passwords must match';
        error = errorMsg !== null;
        break;
      default:
        console.log('Not reached');
    }
    this.setState((prevState) => ({
      errors: { ...prevState.errors, [inputField]: errorMsg },
      values: { ...prevState.values, [inputField]: text },
      confirmed:
        // Compare with new verifyPassword value
        inputField === inputFields.VERIFYPASSWORD
          ? prevState.verified &&
            prevState.values[inputFields.NEWPASSWORD] === text &&
            !error
          : prevState.verified &&
            prevState.values[inputFields.NEWPASSWORD] ===
              prevState.values[inputFields.VERIFYPASSWORD] &&
            !error,
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
    if (
      this.state.errors[inputField] ||
      inputField === inputFields.NEWPASSWORD ||
      inputFields.VERIFYPASSWORD
    ) {
      await this.updateError(text, inputField);
    } else {
      this.setState((prevState) => ({
        values: { ...prevState.values, [inputField]: text },
      }));
    }
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  openRecaptcha = async () => {
    const duplicate = await this.findCustomer();
    if (!duplicate) {
      return;
    }
    const number = '+1'.concat(this.state.values[inputFields.PHONENUM]);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        number,
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.state.recaptchaVerifier.current
      );
      this.setState({ verificationId });
      this.setModalVisible(true);
    } catch (err) {
      this.setModalVisible(true);
      console.log(err);
    }
  };

  verifyCode = async (code) => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.state.verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);
      this.setState({ verified: true });
      this.setModalVisible(false);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  findCustomer = async () => {
    const formattedPhoneNumber = formatPhoneNumber(
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.state.values[inputFields.PHONENUM]
    );
    this.setState({ formattedPhoneNumber });
    try {
      let customer = null;
      const customers = await getCustomersByPhoneNumber(formattedPhoneNumber);
      if (customers.length === 1) {
        [customer] = customers;
        this.setState({ customer });
      }
    } catch (err) {
      console.log(err);
    }
    return true;
  };

  resetPassword = async () => {
    // We use the record ID generated by Airtable as the salt to encrypt
    const encrypted = await encryptPassword(
      this.state.customer.id,
      this.state.values[inputFields.NEWPASSWORD]
    );
    // Update the created record with the encrypted password
    await updateCustomers(this.state.customer.id, { password: encrypted });
    this.setState({ success: true });
  };

  render() {
    const validNumber = !this.state.errors[inputFields.PHONENUM];
    return (
      <AuthScreenContainer>
        <AuthScrollContainer
          ref={(ref) => {
            this.scrollView = ref;
          }}>
          <FirebaseRecaptchaVerifierModal
            ref={this.state.recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          {this.state.modalVisible && (
            <VerificationScreen
              number={this.state.formattedPhoneNumber}
              visible={this.state.modalVisible}
              verifyCode={this.verifyCode}
              resend={this.openRecaptcha}
              closer={this.setModalVisible}
            />
          )}

          <BackButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </BackButton>
          {this.state.verified && !this.state.success && (
            <View>
              <BigTitle>Set New Password</BigTitle>
              <FormContainer>
                <AuthTextField
                  fieldType="New Password"
                  value={this.state.values[inputFields.NEWPASSWORD]}
                  onBlurCallback={(value) => {
                    this.updateError(value, inputFields.NEWPASSWORD);
                    this.scrollView.scrollToEnd({ animated: true });
                  }}
                  changeTextCallback={(text) =>
                    this.onTextChange(text, inputFields.NEWPASSWORD)
                  }
                  error={this.state.errors[inputFields.NEWPASSWORD]}
                />
                <AuthTextField
                  fieldType="Re-enter New Password"
                  value={this.state.values[inputFields.VERIFYPASSWORD]}
                  onBlurCallback={(value) =>
                    this.updateError(value, inputFields.VERIFYPASSWORD)
                  }
                  changeTextCallback={(text) =>
                    this.onTextChange(text, inputFields.VERIFYPASSWORD)
                  }
                  error={this.state.errors[inputFields.VERIFYPASSWORD]}
                />
              </FormContainer>
              <FilledButtonContainer
                style={{ marginTop: 48, marginBottom: 24 }}
                color={
                  !this.state.confirmed
                    ? Colors.lightestGreen
                    : Colors.primaryGreen
                }
                width="100%"
                onPress={() => this.resetPassword()}
                disabled={!this.state.confirmed}>
                <ButtonLabel color={Colors.lightText}>
                  Reset Password
                </ButtonLabel>
              </FilledButtonContainer>
            </View>
          )}

          {!this.state.verified && !this.state.success && (
            <View>
              <BigTitle>Forgot Password</BigTitle>
              <Subhead style={{ marginTop: 32 }}>
                Enter the phone number connected to your account to reset your
                password.
              </Subhead>
              <Caption style={{ marginTop: 8 }} color={Colors.secondaryText}>
                You will recieve a text containing a 6-digit code to verify your
                phone number. Msg & data rates may apply.
              </Caption>
              <FormContainer>
                <AuthTextField
                  fieldType="Phone Number"
                  value={this.state.values[inputFields.PHONENUM]}
                  onBlurCallback={(value) =>
                    this.updateError(value, inputFields.PHONENUM)
                  }
                  changeTextCallback={(text) => {
                    this.scrollView.scrollToEnd({ animated: true });
                    this.onTextChange(text, inputFields.PHONENUM);
                  }}
                  error={this.state.errors[inputFields.PHONENUM]}
                />
              </FormContainer>
              <FilledButtonContainer
                style={{ marginVertical: 24 }}
                color={
                  !validNumber ? Colors.lightestGreen : Colors.primaryGreen
                }
                width="100%"
                onPress={() => this.openRecaptcha()}
                disabled={!validNumber}>
                <ButtonLabel color={Colors.lightText}>Continue</ButtonLabel>
              </FilledButtonContainer>
            </View>
          )}

          {this.state.success && (
            <View>
              <BigTitle>Success!</BigTitle>
              <Subhead style={{ marginTop: 32 }}>
                Your new password was successfully set.
              </Subhead>
              <FilledButtonContainer
                style={{ marginTop: 48 }}
                color={Colors.primaryGreen}
                width="100%"
                onPress={() => this.props.navigation.navigate('LogIn')}>
                <ButtonLabel color={Colors.lightText}>Go to Log In</ButtonLabel>
              </FilledButtonContainer>
            </View>
          )}
        </AuthScrollContainer>
      </AuthScreenContainer>
    );
  }
}

PasswordResetScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
