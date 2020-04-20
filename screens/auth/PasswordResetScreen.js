import { FontAwesome5 } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AuthTextField from '../../components/AuthTextField';
import { BigTitle, ButtonLabel, FilledButtonContainer } from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { firebaseConfig } from '../../firebase';
import { getCustomersByPhoneNumber, updateCustomers } from '../../lib/airtable/request';
import { formatPhoneNumber, signUpFields } from '../../lib/authUtils';
import { AuthScreenContainer, BackButton, FormContainer } from '../../styled/auth';
import validate from './validation';
import VerificationScreen from './VerificationScreen';

export default class PasswordResetScreen extends React.Component {

    constructor(props) {
        super(props);
        const recaptchaVerifier = React.createRef();
        this.state = {
            customer: null,
            modalVisible: false,
            recaptchaVerifier,
            verificationId: null,
            verified: false,
            confirmed: false,
            values: {
                [signUpFields.PHONENUM]: '',
                [signUpFields.PASSWORD1]: '',
                [signUpFields.PASSWORD2]: '',
            },
            errors: {
                [signUpFields.PHONENUM]: '',
                [signUpFields.PASSWORD1]: '',
                [signUpFields.PASSWORD2]: '',
            },
        };
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
            case signUpFields.PASSWORD1:
                errorMsg = validate('password', text);
                error = errorMsg !== null;
                break;
            case signUpFields.PASSWORD2:
                errorMsg = this.state.values[signUpFields.PASSWORD1] === this.state.values[signUpFields.PASSWORD2] ? null : 'Passwords must match!';
                error = errorMsg !== null;
                break;
            default:
                console.log('Not reached');
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
        if (this.state.verified && this.state.values[signUpFields.PASSWORD1] === this.state.values[signUpFields.PASSWORD2]) {
            this.setState({ confirmed: true });
        } else {
            this.setState({ confirmed: false });
        }

    };

    setModalVisible = visible => {
        this.setState({ modalVisible: visible });
    };

    openRecaptcha = async () => {
        if (!this.findCustomer()) {
            return;
        }
        const number = '+1'.concat(this.state.values[signUpFields.PHONENUM]);
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
            number,
            this.state.recaptchaVerifier.current
        );
        this.setState({ verificationId });
        this.setModalVisible(true);
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
        } catch (err) {
            console.log(err);
        }
    };

    findCustomer = async () => {
        const formattedPhoneNumber = formatPhoneNumber(this.state.values[signUpFields.PHONENUM]);
        try {
            let customer = null;
            const customers = await getCustomersByPhoneNumber(formattedPhoneNumber);
            if (customers.length == 1) {
                customer = customers[0];
                this.setState({ customer });
            } else {
                const errorMsg = 'Invalid number!';
                this.setState(prevState => ({
                    errors: { ...prevState.errors, [signUpFields.PHONENUM]: errorMsg },
                }));
                return false;
            }
        } catch (err) {
            console.log(err);
        }
        return true;
    }

    //TODO: ADD RESET PASSWORD FUNCTION
    resetPassword = async () => {
        updateCustomers(this.state.customer.id, { 'password': this.state.values[signUpFields.PASSWORD1] });
        this.props.navigation.navigate('LogIn');
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.modalVisible && <VerificationScreen visible={this.state.modalVisible} verifyCode={this.verifyCode} resend={this.openRecaptcha}></VerificationScreen>}
                <FirebaseRecaptchaVerifierModal
                    ref={this.state.recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                <AuthScreenContainer>
                    <BackButton onPress={() => this.props.navigation.goBack()}>
                        <FontAwesome5 name="arrow-left" solid size={24} />
                    </BackButton>
                    {!this.state.verified && <BigTitle>Forgot Password.</BigTitle>}
                    {this.state.verified && <BigTitle>Reset Password.</BigTitle>}
                    <FormContainer>
                        {!this.state.verified &&
                            <AuthTextField
                                fieldType="Phone Number"
                                value={this.state.values[signUpFields.PHONENUM]}
                                onBlurCallback={value =>
                                    this.updateError(value, signUpFields.PHONENUM)
                                }
                                changeTextCallback={text =>
                                    this.onTextChange(text, signUpFields.PHONENUM)
                                }
                                error={this.state.errors[signUpFields.PHONENUM]}
                            />
                        }
                        {this.state.verified &&
                            <AuthTextField
                                fieldType="New Password"
                                value={this.state.values[signUpFields.PASSWORD1]}
                                onBlurCallback={value =>
                                    this.updateError(value, signUpFields.PASSWORD1)
                                }
                                changeTextCallback={text =>
                                    this.onTextChange(text, signUpFields.PASSWORD1)
                                }
                                error={this.state.errors[signUpFields.PASSWORD1]}
                            />
                        }
                        {this.state.verified &&
                            <AuthTextField
                                fieldType="Re-enter New Password"
                                value={this.state.values[signUpFields.PASSWORD2]}
                                onBlurCallback={value =>
                                    this.updateError(value, signUpFields.PASSWORD2)
                                }
                                changeTextCallback={text =>
                                    this.onTextChange(text, signUpFields.PASSWORD2)
                                }
                                error={this.state.errors[signUpFields.PASSWORD2]}
                            />
                        }
                    </FormContainer>
                    {!this.state.verified &&
                        <FilledButtonContainer
                            style={{ marginTop: 224, alignSelf: 'flex-end' }}
                            color={Colors.primaryGreen}
                            width="100%"
                            onPress={() =>
                                this.openRecaptcha()
                            }>
                            <ButtonLabel color={Colors.lightest}>Continue</ButtonLabel>
                        </FilledButtonContainer>
                    }
                    {this.state.verified &&
                        <FilledButtonContainer
                            style={{ marginTop: 224, alignSelf: 'flex-end' }}
                            color={Colors.primaryGreen}
                            width="100%"
                            disabled={this.state.confirmed}
                            onPress={() =>
                                this.resetPassword()
                            }>
                            <ButtonLabel color={Colors.lightest}>Reset Password</ButtonLabel>
                        </FilledButtonContainer>
                    }
                </AuthScreenContainer>
            </ScrollView>
        );
    }
}

PasswordResetScreen.propTypes = {

};
