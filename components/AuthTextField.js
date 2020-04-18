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
        lineWidth={1.75}
        activeLineWidth={1.75}
        onChangeText={changeTextCallback}
        value={value}
        baseColor={Colors.activeText}
        tintColor={Colors.primaryGreen}
        style={{ fontFamily: 'poppins-regular' }}
        error={error}
        errorColor={Colors.error}
        returnKeyType="done"
        keyboardType={fieldType === 'Phone Number' ? 'numeric' : 'default'}
        maxLength={fieldType === 'Phone Number' ? 10 : null}
        secureTextEntry={fieldType === 'Password'}
        labelPadding={6}
        inputContainerPadding={4}
      />
      {fieldType === 'Name' && !error && (
        <Caption color={Colors.activeText}>
          Note: this is how clerks will greet you!
        </Caption>
      )}
      {fieldType === 'Verification' && !error && (
        <Caption color={Colors.activeText}>
          A code has been sent to your phone number.
        </Caption>
      )}
    </TextFieldContainer>
  );
}

export default AuthTextField;
