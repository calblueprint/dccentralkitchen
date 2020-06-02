import { FontAwesome5 } from '@expo/vector-icons';
import { Updates } from 'expo';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, View } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  Caption,
  FilledButtonContainer,
  Subtitle,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import firebaseConfig from '../../firebase';
import {
  getCustomersById,
  getCustomersByPhoneNumber,
  updateCustomers,
} from '../../lib/airtable/request';
import { formatPhoneNumberInput, inputFields } from '../../lib/authUtils';
import { logAuthErrorToSentry, logErrorToSentry } from '../../lib/logUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import validate from '../auth/validation';
import VerificationScreen from '../auth/VerificationScreen';

export default class PhoneNumberChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    const recaptchaVerifier = React.createRef();
    this.state = {
      customer: null,
      success: false,
      modalVisible: false,
      recaptchaVerifier,
      verificationId: null,
      values: {
        [inputFields.PHONENUM]: '',
      },
      errors: {
        [inputFields.PHONENUM]: '',
      },
    };
  }

  // Load customer record
  async componentDidMount() {
    const customerId = await AsyncStorage.getItem('customerId');
    try {
      const customer = await getCustomersById(customerId);

      this.setState({ customer });
    } catch (err) {
      console.error(err);
      logErrorToSentry({
        screen: 'PhoneNumberChangeScreen',
        action: 'componentDidMount',
        error: err,
      });
    }
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
    try {
      // Update the created record with the new number
      const duplicateCustomers = await getCustomersByPhoneNumber(
        this.state.values[inputFields.PHONENUM]
      );
      if (duplicateCustomers.length !== 0) {
        console.log('Duplicate customer');
        const errorMsg = 'Phone number already in use.';
        logAuthErrorToSentry({
          screen: 'PhoneNumberChangeScreen',
          action: 'updatePhoneNumber',
          attemptedPhone: this.state.values[inputFields.PHONENUM],
          attemptedPass: null,
          error: errorMsg,
        });
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            [inputFields.PHONENUM]: errorMsg,
          },
        }));
        return;
      }
    } catch (err) {
      console.error(
        '[PhoneNumberChangeScreen] (checkDuplicateCustomers) Airtable:',
        err
      );
      logAuthErrorToSentry({
        screen: 'PhoneNumberChangeScreen',
        action: 'checkDuplicateCustomers',
        attemptedPhone: this.state.values[inputFields.PHONENUM],
        attemptedPass: null,
        error: err,
      });
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
      logErrorToSentry({
        screen: 'PhoneNumberChangeScreen',
        action: 'componentDidMount',
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
      this.setModalVisible(false);
      await this.updatePhoneNumber();
      return true;
    } catch (err) {
      console.log(err);
      logErrorToSentry({
        screen: 'PhoneNumberChangeScreen',
        action: 'verifyCode',
        error: err,
      });
      return false;
    }
  };

  updatePhoneNumber = async () => {
    try {
      await updateCustomers(this.state.customer.id, {
        phoneNumber: this.state.values[inputFields.PHONENUM],
      });
      this.setState({ success: true });
    } catch (err) {
      console.error(
        '[PhoneNumberChangeScreen] (updatePhoneNumber) Airtable:',
        err
      );
      logAuthErrorToSentry({
        screen: 'PhoneNumberChangeScreen',
        action: 'updatePhoneNumber',
        attemptedPhone: this.state.values[inputFields.PHONENUM],
        attemptedPass: null,
        error: err,
      });
    }
  };

  render() {
    const { errors, values } = this.state;

    const permission =
      values[inputFields.PHONENUM] && !errors[inputFields.PHONENUM];

    return (
      <AuthScreenContainer>
        <FirebaseRecaptchaVerifierModal
          ref={this.state.recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        {this.state.modalVisible && (
          <VerificationScreen
            number={this.state.values[inputFields.PHONENUM]}
            visible={this.state.modalVisible}
            verifyCode={this.verifyCode}
            resend={this.openRecaptcha}
            closer={this.setModalVisible}
          />
        )}

        {!this.state.success && (
          <View>
            <BackButton onPress={() => this.props.navigation.goBack()}>
              <FontAwesome5 name="arrow-left" solid size={24} />
            </BackButton>
            <BigTitle>Change Phone Number</BigTitle>
            <Caption style={{ marginTop: 8 }} color={Colors.secondaryText}>
              You will recieve a text containing a 6-digit code to verify this
              phone number. Msg & data rates may apply.
            </Caption>
            <FormContainer>
              <AuthTextField
                fieldType="New Phone Number"
                value={this.state.values[inputFields.PHONENUM]}
                onBlurCallback={(value) =>
                  this.updateError(value, inputFields.PHONENUM)
                }
                changeTextCallback={(text) =>
                  this.onTextChange(text, inputFields.PHONENUM)
                }
                error={this.state.errors[inputFields.PHONENUM]}
              />
            </FormContainer>
            <FilledButtonContainer
              style={{ marginTop: 48 }}
              color={!permission ? Colors.lightestGreen : Colors.primaryGreen}
              width="100%"
              onPress={() => this.openRecaptcha()}
              disabled={!permission}>
              <ButtonLabel color={Colors.lightText}>Change Number</ButtonLabel>
            </FilledButtonContainer>
          </View>
        )}

        {this.state.success && (
          <View>
            <BackButton />
            <BigTitle>Success!</BigTitle>
            <Subtitle style={{ marginTop: 32 }}>
              {`Your phone number was successfully changed to ${
                this.state.values[inputFields.PHONENUM]
              }. Refresh to see changes.`}
            </Subtitle>
            <FilledButtonContainer
              style={{ marginTop: 48 }}
              color={Colors.primaryGreen}
              width="100%"
              onPress={() => Updates.reload()}>
              <ButtonLabel color={Colors.lightText}>Refresh</ButtonLabel>
            </FilledButtonContainer>
          </View>
        )}
      </AuthScreenContainer>
    );
  }
}

PhoneNumberChangeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
