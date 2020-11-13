import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { Keyboard } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  ButtonLabel,
  Caption,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { firebaseConfig } from '../../environment';
import {
  getCustomerById,
  getCustomersByPhoneNumber,
  updateCustomer,
} from '../../lib/airtable/request';
import { formatPhoneNumberInput, inputFields } from '../../lib/authUtils';
import { logAuthErrorToSentry, logErrorToSentry } from '../../lib/logUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import validate from '../auth/validation';

export default class PhoneNumberChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    const recaptchaVerifier = React.createRef();
    const { number } = this.props.route.params;
    this.state = {
      customer: null,
      recaptchaVerifier,
      values: {
        [inputFields.PHONENUM]: number,
      },
      errors: {
        [inputFields.PHONENUM]: '',
        submit: '',
      },
    };
    this.completeVerification = this.completeVerification.bind(this);
  }

  // Load customer record
  async componentDidMount() {
    const customerId = await AsyncStorage.getItem('customerId');
    try {
      const customer = await getCustomerById(customerId);

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
      errors: { ...prevState.errors, [inputField]: errorMsg, submit: '' },
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
    if (this.state.errors[inputField] || this.state.errors.submit) {
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

  openRecaptcha = async () => {
    Keyboard.dismiss();
    try {
      const customers = await getCustomersByPhoneNumber(
        this.state.values[inputFields.PHONENUM]
      );
      if (customers.length !== 0) {
        // Don't open catpcha if the phone number is not changing
        if (
          customers.length === 1 &&
          customers[0].id === this.state.customer.id
        ) {
          await this.completeVerification();
          return;
        }
        console.log('Phone number already in use');
        const errorMsg = 'Phone number already in use';
        logAuthErrorToSentry({
          screen: 'PhoneNumberChangeScreen',
          action: 'updatePhoneNumber',
          attemptedPhone: this.state.values[inputFields.PHONENUM],
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
        error: err,
      });
    }
    const number = this.state.values[inputFields.PHONENUM];
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        '+1'.concat(number),
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.state.recaptchaVerifier.current
      );

      this.props.navigation.navigate('Verify', {
        number,
        verificationId,
        resend: this.openRecaptcha,
        callBack: this.completeVerification,
      });
    } catch (err) {
      this.setState({
        errors: {
          submit: `Error: You must complete the verification pop-up. Make sure your phone number is valid and try again.`,
        },
      });
      console.log(err);
      logErrorToSentry({
        screen: 'PhoneNumberChangeScreen',
        action: 'componentDidMount',
        error: err,
      });
    }
  };

  updatePhoneNumber = async () => {
    try {
      await updateCustomer(this.state.customer.id, {
        phoneNumber: this.state.values[inputFields.PHONENUM],
      });
    } catch (err) {
      console.error(
        '[PhoneNumberChangeScreen] (updatePhoneNumber) Airtable:',
        err
      );
      logAuthErrorToSentry({
        screen: 'PhoneNumberChangeScreen',
        action: 'updatePhoneNumber',
        attemptedPhone: this.state.values[inputFields.PHONENUM],
        error: err,
      });
    }
  };

  async completeVerification() {
    Keyboard.dismiss();
    await this.updatePhoneNumber();
    this.props.navigation.navigate('Settings');
  }

  render() {
    const { errors, values } = this.state;
    const validNumber =
      !errors[inputFields.PHONENUM] &&
      values[inputFields.PHONENUM].length === 14;

    return (
      <AuthScreenContainer>
        <FirebaseRecaptchaVerifierModal
          ref={this.state.recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <BackButton onPress={() => this.props.navigation.goBack()}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </BackButton>
        <Caption style={{ marginTop: 8 }} color={Colors.secondaryText}>
          You will receive an SMS for verification. Msg & data rates may apply.
        </Caption>
        <FormContainer>
          <AuthTextField
            fieldType="Phone Number"
            value={this.state.values[inputFields.PHONENUM]}
            onBlurCallback={(value) =>
              this.updateError(value, inputFields.PHONENUM)
            }
            changeTextCallback={(text) =>
              this.onTextChange(text, inputFields.PHONENUM)
            }
            error={this.state.errors[inputFields.PHONENUM]}
          />
          <Caption
            style={{ alignSelf: 'center', fontSize: 14 }}
            color={Colors.error}>
            {errors.submit}
          </Caption>
        </FormContainer>
        <FilledButtonContainer
          style={{ marginTop: 48 }}
          color={!validNumber ? Colors.lightestGreen : Colors.primaryGreen}
          width="100%"
          onPress={() => this.openRecaptcha()}
          disabled={!validNumber}>
          <ButtonLabel color={Colors.lightText}>Update Phone</ButtonLabel>
        </FilledButtonContainer>
      </AuthScreenContainer>
    );
  }
}

PhoneNumberChangeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
