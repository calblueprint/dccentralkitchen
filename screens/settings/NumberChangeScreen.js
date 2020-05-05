import { FontAwesome5 } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, View } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import { BigTitle, ButtonLabel, FilledButtonContainer, Subhead } from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { firebaseConfig } from '../../firebase';
import { getCustomersById, updateCustomers } from '../../lib/airtable/request';
import { formatPhoneNumber, signUpFields } from '../../lib/authUtils';
import { AuthScreenContainer, BackButton, FormContainer } from '../../styled/auth';
import validate from '../auth/validation';
import VerificationScreen from '../auth/VerificationScreen';


export default class PasswordResetScreen extends React.Component {
    constructor(props) {
        super(props);
        const recaptchaVerifier = React.createRef();
        this.state = {
            customer: null,
            confirmed: false,
            success: false,
            modalVisible: false,
            recaptchaVerifier,
            verificationId: null,
            verified: false,
            formattedPhoneNumber: '',
            values: {
                [signUpFields.PHONENUM]: '',
            },
            errors: {
                [signUpFields.PHONENUM]: '',
            },
        };
    }

    // Load customer record & transactions
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
    updateError = async (text, signUpField) => {
        let error = false;
        let errorMsg = '';
        // const fieldValue = this.state.values[signUpField];
        // validate returns null if no error is found
        switch (signUpField) {
            case signUpFields.PHONENUM:
                errorMsg = validate('phoneNumber', text);
                error = errorMsg !== null;
                break;
            default:
                console.log('Not reached');
        }
        if (error) { this.setState({ confirmed: false }); }
        else {
            this.setState({ confirmed: true });
        }
        this.setState(prevState => ({
            errors: { ...prevState.errors, [signUpField]: errorMsg },
            values: { ...prevState.values, [signUpField]: text },
        }));

        return error;
    };

    // onBlur callback is required in case customer taps on field, does nothing, and taps out
    onBlur = async signUpField => {
        await this.updateError(signUpField);
    };

    // onTextChange does a check before updating errors
    // It can only remove errors, not trigger them
    onTextChange = async (text, signUpField) => {
        // Only update error if there is currently an error
        // Unless field is password, since it is generally the last field to be filled out

        this.setState(prevState => ({
            values: { ...prevState.values, [signUpField]: text },
        }));

    };

    setModalVisible = visible => {
        this.setState({ modalVisible: visible });
    };

    openRecaptcha = async () => {
        const formattedPhoneNumber = formatPhoneNumber(this.state.values[signUpFields.PHONENUM]);
        this.setState({ formattedPhoneNumber });
        const number = '+1'.concat(this.state.values[signUpFields.PHONENUM]);
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        try {
            const verificationId = await phoneProvider.verifyPhoneNumber(
                number,
                this.state.recaptchaVerifier.current
            );
            this.setState({ verificationId });
            this.setModalVisible(true);
        } catch (err) {
            this.setModalVisible(true);
            console.log(err);
        }
    };

    verifyCode = async code => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                this.state.verificationId,
                code
            );
            await firebase.auth().signInWithCredential(credential);
            this.setState({ verified: true });
            this.setModalVisible(false);
            await this.resetPassword();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    resetPassword = async () => {
        // Update the created record with the new number
        await updateCustomers(this.state.customer.id, { phoneNumber: this.state.formattedPhoneNumber });
        this.setState({ success: true });
    }

    render() {
        return (
            <AuthScreenContainer>
                <BackButton onPress={() => this.props.navigation.goBack()}>
                    <FontAwesome5 name="arrow-left" solid size={24} />
                </BackButton>
                <FirebaseRecaptchaVerifierModal
                    ref={this.state.recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                {this.state.modalVisible && <VerificationScreen number={this.state.formattedPhoneNumber} visible={this.state.modalVisible} verifyCode={this.verifyCode} resend={this.openRecaptcha} closer={this.setModalVisible}></VerificationScreen>}

                {!this.state.success &&
                    <View>
                        <BigTitle>Set New Number</BigTitle>
                        <FormContainer>
                            <AuthTextField
                                fieldType="Phone Number"
                                value={this.state.values[signUpFields.PHONENUM]}
                                onBlurCallback={(value) =>
                                    this.updateError(value, signUpFields.PHONENUM)
                                }
                                changeTextCallback={(text) =>
                                    this.onTextChange(text, signUpFields.PHONENUM)
                                }
                                error={this.state.errors[signUpFields.PHONENUM]}
                            />
                        </FormContainer>
                        <FilledButtonContainer
                            style={{ marginTop: 48 }}
                            color={
                                !this.state.confirmed ? Colors.lightestGreen : Colors.primaryGreen
                            }
                            width="100%"
                            onPress={() =>
                                this.openRecaptcha()
                            }
                            disabled={!this.state.confirmed}>
                            <ButtonLabel color={Colors.lightest}>Reset Number</ButtonLabel>
                        </FilledButtonContainer>
                    </View>
                }

                {this.state.success &&
                    <View>
                        <BigTitle>Success!</BigTitle>
                        <Subhead style={{ marginTop: 32 }}>Your number has been changed.</Subhead>
                        <FilledButtonContainer
                            style={{ marginTop: 48 }}
                            color={Colors.primaryGreen}
                            width="100%"
                            onPress={() =>
                                this.props.navigation.goBack()
                            }
                        >
                            <ButtonLabel color={Colors.lightest}>Back To Settings</ButtonLabel>
                        </FilledButtonContainer>
                    </View>
                }
            </AuthScreenContainer>
        );
    }
}

PasswordResetScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};
