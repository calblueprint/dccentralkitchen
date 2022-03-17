import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import {
  ButtonLabel,
  FilledButtonContainer,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { getCustomerById, updateCustomer } from '../../lib/airtable/request';
import { getAsyncCustomerAuth, inputFields } from '../../lib/authUtils';
import { logErrorToSentry } from '../../lib/logUtils';
import {
  AuthScreenContainer,
  BackButton,
  FormContainer,
} from '../../styled/auth';

export default class NameChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    const { name } = this.props.route.params;
    this.state = {
      customer: null,
      values: {
        [inputFields.NAME]: name,
      },
      errors: {
        [inputFields.NAME]: '',
      },
    };
  }

  // Load customer record
  async componentDidMount() {
    const customerId = await getAsyncCustomerAuth();
    try {
      const customer = await getCustomerById(customerId.id);

      this.setState({ customer });
    } catch (err) {
      // console.error(err);
      logErrorToSentry({
        screen: 'NameChangeScreen',
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
      case inputFields.NAME:
        error = !text.replace(/\s/g, '').length;
        if (error) errorMsg = 'Name cannot be blank';
        break;
      default:
        break;
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
    try {
      await updateCustomer(this.state.customer.id, {
        name: this.state.values[inputFields.NAME],
      });
      this.props.navigation.navigate('Settings');
    } catch (err) {
      // console.log('[NameChangeScreen] (changeName) Airtable:', err);
      logErrorToSentry({
        screen: 'NameChangeScreen',
        action: 'changeName',
        error: err,
      });
    }
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
            onPress={() => this.changeName()}
            disabled={!permission}>
            <ButtonLabel color={Colors.lightText}>Update Name</ButtonLabel>
          </FilledButtonContainer>
        </View>
      </AuthScreenContainer>
    );
  }
}

NameChangeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
