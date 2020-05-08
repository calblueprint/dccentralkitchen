import { FontAwesome5 } from '@expo/vector-icons';
import { Updates } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, View } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  BigTitle,
  ButtonLabel,
  FilledButtonContainer,
  Subhead,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { getCustomersById, updateCustomers } from '../../lib/airtable/request';
import { inputFields } from '../../lib/authUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';

export default class NameChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      success: false,
      values: {
        [inputFields.NAME]: '',
      },
      errors: {
        [inputFields.NAME]: '',
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
    }
  }

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

  changeName = async () => {
    // We use the record ID generated by Airtable as the salt to encrypt
    // Update the created record with the encrypted password
    await updateCustomers(this.state.customer.id, {
      name: this.state.values[inputFields.NAME],
    });
    this.setState({ success: true });
  };

  render() {
    const { errors, values } = this.state;

    const permission = values[inputFields.NAME] && !errors[inputFields.NAME];

    return (
      <AuthScreenContainer>
        {!this.state.success && (
          <View>
            <BackButton onPress={() => this.props.navigation.goBack()}>
              <FontAwesome5 name="arrow-left" solid size={24} />
            </BackButton>
            <BigTitle>Change Name</BigTitle>
            <FormContainer>
              <AuthTextField
                fieldType="New Name"
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
              onPress={() => this.changeName()}
              disabled={!permission}>
              <ButtonLabel color={Colors.lightest}>Change Name</ButtonLabel>
            </FilledButtonContainer>
          </View>
        )}

        {this.state.success && (
          <View>
            <BackButton />
            <BigTitle>Success!</BigTitle>
            <Subhead
              style={{
                marginTop: 32,
              }}>
              {`Your name was successfully changed to ${
                this.state.values[inputFields.NAME]
              }.Press refresh to see changes.`}
            </Subhead>
            <FilledButtonContainer
              style={{ marginTop: 48 }}
              color={Colors.primaryGreen}
              width="100%"
              onPress={() => Updates.reload()}>
              <ButtonLabel color={Colors.lightest}>Refresh</ButtonLabel>
            </FilledButtonContainer>
          </View>
        )}
      </AuthScreenContainer>
    );
  }
}

NameChangeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
