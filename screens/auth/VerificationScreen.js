import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
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
  AuthScrollContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';
import validate from './validation';

export default class VerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.visible,
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

  setModalVisible = async (visible) => {
    this.props.closer(visible);
    this.setState({ modalVisible: visible });
  };

  resendCode = async (visible) => {
    await this.setModalVisible(visible);
    await this.props.resend();
  };

  verifyCode = async (code) => {
    try {
      const verified = await this.props.verifyCode(code);
      if (!verified) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            [inputFields.CODE]:
              'Incorrect verification code, please try again.',
          },
        }));
      }
    } catch (err) {
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}>
        <AuthScreenContainer>
          <AuthScrollContainer
            ref={(ref) => {
              this.scrollView = ref;
            }}>
            <BackButton onPress={() => this.setModalVisible(false)}>
              <FontAwesome5 name="arrow-left" solid size={24} />
            </BackButton>
            <BigTitle>{`Verify Phone \nNumber`}</BigTitle>
            <Subtitle style={{ paddingTop: 32 }}>
              {`Enter the 6-digit code sent to\n ${this.props.number}`}
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
                  this.scrollView.scrollToEnd({ animated: true });
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
          </AuthScrollContainer>
        </AuthScreenContainer>
      </Modal>
    );
  }
}

VerificationScreen.propTypes = {
  number: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  resend: PropTypes.func.isRequired,
  verifyCode: PropTypes.func.isRequired,
  closer: PropTypes.func.isRequired,
};
