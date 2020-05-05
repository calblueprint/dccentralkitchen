import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from 'react-native-materialui-textfield';
import Colors from '../constants/Colors';
import { TextFieldContainer } from '../styled/auth';
import { Caption } from './BaseComponents';

/**
 * @prop
 * */

function AuthTextField({
  fieldType,
  value,
  changeTextCallback,
  error,
  onBlurCallback = null,
}) {
  return (
    <TextFieldContainer>
      <TextField
        onBlur={onBlurCallback ? () => onBlurCallback(value) : null}
        autoCapitalize="words"
        autoCorrect={false}
        label={fieldType}
        labelTextStyle={{ fontFamily: 'poppins-regular' }}
        lineWidth={1.5}
        activeLineWidth={1.5}
        onChangeText={changeTextCallback}
        value={value}
        baseColor={Colors.activeText}
        tintColor={Colors.primaryGreen}
        style={{ fontFamily: 'poppins-regular' }}
        error={error}
        errorColor={Colors.error}
        returnKeyType="done"
        keyboardType={
          fieldType === 'Phone Number' || fieldType === 'Verification Code'
            ? 'numeric'
            : undefined
        }
        maxLength={
          fieldType === 'Phone Number'
            ? 10
            : fieldType === 'Verification Code'
            ? 6
            : null
        }
        secureTextEntry={fieldType.includes('assword')}
        labelPadding={6}
      />
      {fieldType === 'Name' && !error && (
        <Caption color={Colors.activeText}>
          Note: this is how clerks will greet you!
        </Caption>
      )}

      {fieldType === 'Verification Code' && !error && (
        <Caption color={Colors.activeText}>
          If you did not receive a code, click resend.
        </Caption>
      )}
    </TextFieldContainer>
  );
}

AuthTextField.propTypes = {
  fieldType: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changeTextCallback: PropTypes.func.isRequired,
  error: PropTypes.string,
  onBlurCallback: PropTypes.func,
};

AuthTextField.defaultProps = {
  onBlurCallback: null,
  error: null,
};

export default AuthTextField;
