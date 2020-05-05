import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { BigTitle, ButtonLabel, FilledButtonContainer } from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { AuthScreenContainer, BackButton } from '../../styled/auth';
import { JustifyCenterContainer } from '../../styled/shared';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGuest: false,
        };
    }
    // Load customer record & transactions
    async componentDidMount() {
        const customerId = await AsyncStorage.getItem('customerId');
        const isGuest = customerId === RecordIds.guestCustomerId;
        this.setState({ isGuest });
    };

    _logout = async () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <AuthScreenContainer>
                <BackButton onPress={() => this.props.navigation.goBack(null)}>
                    <FontAwesome5 name="arrow-left" solid size={24} />
                </BackButton>
                <BigTitle>Settings</BigTitle>

                {!this.state.isGuest &&
                    <JustifyCenterContainer>
                        <FilledButtonContainer
                            style={{ marginTop: 12 }}
                            color={
                                Colors.primaryGreen
                            }
                            width="100%"
                            onPress={() => this.props.navigation.navigate('Name')}
                        >
                            <ButtonLabel color={Colors.lightest}>Change Name</ButtonLabel>
                        </FilledButtonContainer>
                        <FilledButtonContainer
                            style={{ marginTop: 12 }}
                            color={
                                Colors.lighterGreen
                            }
                            width="100%"
                            onPress={() => this.props.navigation.navigate('Number')}
                        >
                            <ButtonLabel color={Colors.lightest}>Change Phone Number</ButtonLabel>
                        </FilledButtonContainer>
                        <FilledButtonContainer
                            style={{ marginTop: 12 }}
                            color={
                                Colors.primaryGreen
                            }
                            width="100%"
                            onPress={() => this.props.navigation.navigate('Password')}
                        >
                            <ButtonLabel color={Colors.lightest}>Reset Password</ButtonLabel>
                        </FilledButtonContainer>
                        <FilledButtonContainer
                            style={{ marginTop: 12 }}
                            color={
                                Colors.lighterGreen
                            }
                            width="100%"
                            onPress={() => this._logout()}
                        >
                            <ButtonLabel color={Colors.lightest}>Log Out</ButtonLabel>
                        </FilledButtonContainer>
                    </JustifyCenterContainer>
                }
                {this.state.isGuest &&
                    <JustifyCenterContainer>
                        <FilledButtonContainer
                            style={{ marginTop: 12 }}
                            color={
                                Colors.primaryGreen
                            }
                            width="100%"
                            onPress={() => this._logout()}
                        >
                            <ButtonLabel color={Colors.lightest}>Create Account</ButtonLabel>
                        </FilledButtonContainer>
                    </JustifyCenterContainer>
                }

            </AuthScreenContainer >
        );
    }
}

SettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};
