import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, Button, Keyboard, View } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  ButtonLabel,
  Caption,
  FilledButtonContainer,
  Subtitle,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { env, firebaseConfig } from '../../environment';
import { getCustomersByPhoneNumber } from '../../lib/airtable/request';
import { formatPhoneNumberInput, inputFields } from '../../lib/authUtils';
import { logErrorToSentry, setUserLog } from '../../lib/logUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import validate from './validation';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class PhoneNumberScreen extends React.Component {
  constructor(props) {
    super(props);
    const recaptchaVerifier = React.createRef();
    this.state = {
      recaptchaVerifier,
      values: {
        [inputFields.PHONENUM]: '',
      },
      errors: {
        [inputFields.PHONENUM]: '',
        submit: '',
      },
    };
    this.completeVerification = this.completeVerification.bind(this);
  }

  async componentDidMount() {
    const delay = (duration) =>
      new Promise((resolve) => setTimeout(resolve, duration));
    await delay(1000);

    // 1 second delay to set the screen after AppNavigator sets to Reset
  }

  _devBypass = async () => {
    // Doesn't enforce any resolution for this async call
    await AsyncStorage.setItem('customerId', RecordIds.testCustomerId);
    this.props.navigation.navigate('App');
  };

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

  openRecaptcha = async () => {
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
        screen: 'PhoneNumberScreen',
        action: 'openRecaptcha',
        error: err,
      });
    }
  };

  findCustomer = async () => {
    try {
      const customers = await getCustomersByPhoneNumber(
        this.state.values[inputFields.PHONENUM]
      );
      if (customers.length === 1) {
        const [customer] = customers;
        return customer;
      }
      return null;
    } catch (err) {
      console.log(err);
      logErrorToSentry({
        screen: 'PhoneNumberScreen',
        action: 'findCustomer',
        error: err,
      });
    }
    return true;
  };

  async completeVerification() {
    const customer = await this.findCustomer();

    if (customer) {
      await AsyncStorage.setItem('customerId', customer.id);
      Keyboard.dismiss();
      this.props.navigation.navigate('App');
      setUserLog({
        id: customer.id,
        name: customer.name,
        phoneNumber: this.state.values[inputFields.PHONENUM],
      });
      Analytics.logEvent('log_in_complete', {
        customer_id: customer.id,
      });
    } else {
      this.props.navigation.navigate('CompleteSignUp', {
        number: this.state.values[inputFields.PHONENUM],
      });
    }
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
        <View>
          <Subtitle>What is your phone number?</Subtitle>
          <Caption style={{ marginTop: 8 }} color={Colors.secondaryText}>
            You will receive an SMS for verification. Msg & data rates may
            apply.
          </Caption>
          <FormContainer>
            <AuthTextField
              fieldType="Phone Number"
              value={values[inputFields.PHONENUM]}
              onBlurCallback={(value) =>
                this.updateError(value, inputFields.PHONENUM)
              }
              changeTextCallback={(text) => {
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
            color={!validNumber ? Colors.lightestGreen : Colors.primaryGreen}
            width="100%"
            onPress={() => this.openRecaptcha()}
            disabled={!validNumber}>
            <ButtonLabel color={Colors.lightText}>Continue</ButtonLabel>
          </FilledButtonContainer>
          {env === 'dev' && (
            <Button
              title="Testing Bypass"
              onPress={async () => this._devBypass()}
            />
          )}
        </View>
      </AuthScreenContainer>
    );
  }
}

PhoneNumberScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
