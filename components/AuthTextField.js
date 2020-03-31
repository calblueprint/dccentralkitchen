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
  onBlurCallback,
  changeTextCallback,
  error,
}) {
  return (
    <TextFieldContainer>
      <TextField
        onBlur={onBlurCallback ? () => onBlurCallback(value) : null}
        autoCapitalize="words"
        autoCorrect={false}
        label={fieldType}
        labelTextStyle={{ fontFamily: 'poppins-regular' }}
        onChangeText={changeTextCallback}
        value={value}
        baseColor={Colors.activeText}
        tintColor={Colors.primaryGreen}
        error={error}
        errorColor={Colors.darkerOrange}
        returnKeyType="done"
        keyboardType={fieldType === 'Phone Number' ? 'numeric' : 'default'}
        maxLength={fieldType === 'Phone Number' ? 10 : null}
        secureTextEntry={fieldType === 'Password'}
      />
      {fieldType === 'Name' && !error && (
        <Caption color={Colors.activeText}>
          Note: this is how clerks will greet you!
        </Caption>
      )}
    </TextFieldContainer>
  );
}

export default AuthTextField;
