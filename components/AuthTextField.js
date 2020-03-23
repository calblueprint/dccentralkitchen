import React from 'react';
import Colors from '../assets/Colors';
import { fieldStateColors } from '../lib/authUtils';
import {
  TextFieldContainer,
  InputNoticeContainer,
  TextField
} from '../styled/auth';
import { Caption } from './BaseComponents';

/**
 * @prop
 * */

function AuthTextField({
  fieldType,
  color,
  value,
  onBlurCallback,
  onFocusCallback,
  changeTextCallback
}) {
  return (
    <TextFieldContainer>
      <Caption color={color}>{fieldType}</Caption>
      <TextField
        onBlur={onBlurCallback}
        onFocus={onFocusCallback}
        placeholder={fieldType}
        onChangeText={changeTextCallback}
        value={value}
        borderColor={color}
        returnKeyType={'done'}
        keyboardType={fieldType === 'Phone Number' ? 'numeric' : 'default'}
        maxLength={fieldType === 'Phone Number' ? 10 : null}
        secureTextEntry={fieldType === 'Password'}
      />
      <InputNoticeContainer>
        {fieldType === 'Name' && (
          <Caption color={Colors.secondaryText}>
            Note: this is how clerks will greet you!
          </Caption>
        )}
        {color === fieldStateColors.ERROR && fieldType === 'Phone Number' && (
          <Caption color={color}>Must be a valid phone number</Caption>
        )}
        {color === fieldStateColors.ERROR && fieldType === 'Password' && (
          <Caption color={color}>Must be 8-20 characters long</Caption>
        )}
      </InputNoticeContainer>
    </TextFieldContainer>
  );
}

export default AuthTextField;
