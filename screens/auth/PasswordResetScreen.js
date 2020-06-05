import { FontAwesome5 } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, View } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  Caption,
  FilledButtonContainer,
  Subtitle,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { signUpBonus } from '../../constants/Rewards';
import firebaseConfig from '../../firebase';
import {
  getCustomersByPhoneNumber,
  updateCustomers,
} from '../../lib/airtable/request';
import {
  encryptPassword,
  formatPhoneNumberInput,
  inputFields,
} from '../../lib/authUtils';
import { logErrorToSentry } from '../../lib/logUtils';
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
    const { forgot } = this.props.route.params;
    const recaptchaVerifier = React.createRef();
    this.state = {
      customer: null,
      success: false,
      modalVisible: false,
      recaptchaVerifier,
      verificationId: null,
      verified: false,
      confirmed: false,
      forgot,
      values: {
        [inputFields.PHONENUM]: '',
        [inputFields.NEWPASSWORD]: '',
        [inputFields.VERIFYPASSWORD]: '',
      },
      errors: {
        [inputFields.PHONENUM]: '',
        [inputFields.NEWPASSWORD]: '',
        [inputFields.VERIFYPASSWORD]: '',
        submit: '',
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
      errors: { ...prevState.errors, [inputField]: errorMsg, submit: '' },
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
      await this.updateError(
        inputField === inputFields.PHONENUM
          ? formatPhoneNumberInput(text)
          : text,
        inputField
      );
    } else {
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          [inputField]:
            inputField === inputFields.PHONENUM
              ? formatPhoneNumberInput(text)
              : text,
        },
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
      this.setState({
        errors: {
          submit: `Error: You must complete the verification pop-up. Make sure your phone number is valid and try again.`,
        },
      });
      this.setModalVisible(false);
      console.log(err);
      logErrorToSentry({
        screen: 'PasswordResetScreen',
        action: 'openRecaptcha',
        error: err,
      });
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
      logErrorToSentry({
        screen: 'PasswordResetScreen',
        action: 'verifyCode',
        error: err,
      });
      return false;
    }
  };

  findCustomer = async () => {
    try {
      let customer = null;
      const customers = await getCustomersByPhoneNumber(
        this.state.values[inputFields.PHONENUM]
      );
      if (customers.length === 1) {
        [customer] = customers;
        if (!this.state.forgot) {
          if (customer.password) {
            Alert.alert(
              '',
              'This phone number already has a password set. Log in to access your account.',
              [
                {
                  text: 'Log In',
                  onPress: () => this.props.navigation.navigate('LogIn'),
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ]
            );
            return false;
          }
        }
        this.setState({ customer });
      } else {
        const errorMsg = 'No account registered with this number';
        this.setState((prevState) => ({
          errors: { ...prevState.errors, [inputFields.PHONENUM]: errorMsg },
        }));
        return false;
      }
    } catch (err) {
      console.log(err);
      logErrorToSentry({
        screen: 'PasswordResetScreen',
        action: 'findCustomer',
        error: err,
      });
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
    if (!this.state.forgot) {
      await updateCustomers(this.state.customer.id, {
        points: (this.state.customer.points || 0) + signUpBonus,
      });
    }
    this.setState({ success: true });
  };

  render() {
    const { errors, values } = this.state;
    const validNumber = !errors[inputFields.PHONENUM];

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
              number={values[inputFields.PHONENUM]}
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
              <BigTitle>
                {this.state.forgot ? 'Set New Password' : 'Set a Password'}
              </BigTitle>
              <FormContainer>
                <AuthTextField
                  fieldType="New Password"
                  value={values[inputFields.NEWPASSWORD]}
                  onBlurCallback={(value) => {
                    this.updateError(value, inputFields.NEWPASSWORD);
                    this.scrollView.scrollToEnd({ animated: true });
                  }}
                  changeTextCallback={(text) =>
                    this.onTextChange(text, inputFields.NEWPASSWORD)
                  }
                  error={errors[inputFields.NEWPASSWORD]}
                />
                <AuthTextField
                  fieldType="Re-enter New Password"
                  value={values[inputFields.VERIFYPASSWORD]}
                  onBlurCallback={(value) =>
                    this.updateError(value, inputFields.VERIFYPASSWORD)
                  }
                  changeTextCallback={(text) =>
                    this.onTextChange(text, inputFields.VERIFYPASSWORD)
                  }
                  error={errors[inputFields.VERIFYPASSWORD]}
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
              <BigTitle>
                {this.state.forgot ? 'Forgot Password' : 'Set a password'}
              </BigTitle>
              <Subtitle style={{ marginTop: 32 }}>
                {this.state.forgot
                  ? 'Enter the phone number connected to your account to reset your password.'
                  : 'If you registered in store, enter your phone number to set a password for your account.'}
              </Subtitle>
              <Caption style={{ marginTop: 8 }} color={Colors.secondaryText}>
                You will recieve a text containing a 6-digit code to verify your
                phone number. Msg & data rates may apply.
              </Caption>
              <FormContainer>
                <AuthTextField
                  fieldType="Phone Number"
                  value={values[inputFields.PHONENUM]}
                  onBlurCallback={(value) =>
                    this.updateError(value, inputFields.PHONENUM)
                  }
                  changeTextCallback={(text) => {
                    this.scrollView.scrollToEnd({ animated: true });
                    this.onTextChange(text, inputFields.PHONENUM);
                  }}
                  error={errors[inputFields.PHONENUM]}
                />
                <Caption
                  style={{ alignSelf: 'center', fontSize: 14 }}
                  color={Colors.error}>
                  {errors.submit}
                </Caption>
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
              <Subtitle style={{ marginTop: 32 }}>
                {this.state.forgot
                  ? 'Your new password was successfully set.'
                  : 'Your account is fully set up! Next time, go straight to Log In to access your account.'}
              </Subtitle>
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
  route: PropTypes.object.isRequired,
};
