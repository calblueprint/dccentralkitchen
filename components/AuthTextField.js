import PropTypes from 'prop-types';
import React from 'react';
import { TextInput } from 'react-native-paper';
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
      <TextInput
        autoFocus
        label={fieldType}
        onBlur={onBlurCallback ? () => onBlurCallback(value) : null}
        autoCapitalize="words"
        autoCorrect={false}
        onChangeText={changeTextCallback}
        value={value}
        error={error}
        returnKeyType="done"
        keyboardType={
          fieldType.includes('Phone Number') ||
          fieldType === 'Verification Code'
            ? 'number-pad'
            : undefined
        }
        includeFontPadding={false}
        maxFontSizeMultiplier={1.4}
        maxLength={
          // eslint-disable-next-line no-nested-ternary
          fieldType.includes('Phone Number')
            ? 14
            : fieldType === 'Verification Code'
            ? 6
            : null
        }
        secureTextEntry={fieldType.includes('assword')}
        selectionColor={Colors.primaryGreen}
      />
      {fieldType.includes('Name') && !error && (
        <Caption allowFontScaling={false}>
          Note: this is how clerks will greet you!
        </Caption>
      )}

      {fieldType === 'Verification Code' && !error && (
        <Caption allowFontScaling={false}>
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
