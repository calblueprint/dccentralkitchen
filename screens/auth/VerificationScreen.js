import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-native';
import AuthTextField from '../../components/AuthTextField';
import { BigTitle, ButtonContainer, ButtonLabel, FilledButtonContainer, Subhead } from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import { signUpFields } from '../../lib/authUtils';
import { AuthScreenContainer, BackButton, FormContainer } from '../../styled/auth';
import validate from './validation';

export default class VerificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.visible,
            values: { [signUpFields.CODE]: '' },
            errors: { [signUpFields.CODE]: '' },
        };
    }

    updateError = async (text, signUpField) => {
        let errorMsg = '';
        // const fieldValue = this.state.values[signUpField];
        // validate returns null if no error is found
        switch (signUpField) {
            case signUpFields.CODE:
                errorMsg = validate('code', text);
                break;
            default:
                console.log('Not reached');
        }

        this.setState(prevState => ({
            errors: { ...prevState.errors, [signUpField]: errorMsg },
            values: { ...prevState.values, [signUpField]: text },
        }));
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

    setModalVisible = async visible => {
        this.props.closer(visible);
        this.setState({ modalVisible: visible });
    };

    resendCode = async visible => {
        await this.setModalVisible(visible);
        await this.props.resend();
    };

    verifyCode = async (code) => {
        try {
            const verified = await this.props.verifyCode(code);
            if (!verified) {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, [signUpFields.CODE]: 'Incorrect code!' },

                }));
            }

        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(false);
                }}>

                <AuthScreenContainer>
                    <BackButton onPress={() => this.setModalVisible(false)}>
                        <FontAwesome5 name="arrow-left" solid size={24} />
                    </BackButton>
                    <BigTitle>Verify Phone {"\n"}Number</BigTitle>
                    <Subhead style={{ paddingTop: 32 }}>Enter the 6-digit code sent to{"\n"}{this.props.number}</Subhead>
                    <FormContainer>
                        <AuthTextField
                            fieldType="Verification Code"
                            value={this.state.values[signUpFields.CODE]}
                            onBlurCallback={value =>
                                this.updateError(value, signUpFields.CODE)
                            }
                            changeTextCallback={text =>
                                this.onTextChange(text, signUpFields.CODE)
                            }
                            error={this.state.errors[signUpFields.CODE]}
                        />
                        <ButtonContainer
                            onPress={async () => this.resendCode(false)}>
                            <ButtonLabel
                                style={{ textTransform: 'none' }}
                                color={Colors.primaryGreen}>
                                Resend code
                            </ButtonLabel>
                        </ButtonContainer>
                    </FormContainer>
                    <FilledButtonContainer
                        style={{ marginTop: 48 }}
                        color={Colors.primaryGreen}
                        width="100%"
                        onPress={() =>
                            this.verifyCode(this.state.values[signUpFields.CODE])
                        }>
                        <ButtonLabel color={Colors.lightest}>Verify Number</ButtonLabel>
                    </FilledButtonContainer>
                </AuthScreenContainer>

            </Modal >
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
