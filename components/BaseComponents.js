import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';

export const ButtonContainer = styled.TouchableOpacity``;

export const ButtonLabel = styled.Text`
  font-family: opensans-semibold;
  font-size: 14px;
  line-height: 20px;
  text-align: ${(props) => props.textAlign || 'center'};
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')}
  text-transform: ${(props) => (props.noCaps ? ' none' : 'none')};
  color: ${(props) => props.color || Colors.activeText};
`;

export const FilledButtonContainer = styled(ButtonContainer)`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '40px'};
  background: ${(props) => props.color || Colors.primaryGreen};
  border-radius: ${(props) => props.borderRadius || '20px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2px;
`;

export const OutlinedButtonContainer = styled(ButtonContainer)`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '40px'};
  border-color: ${(props) => props.color || Colors.primaryGreen};
  border-radius: ${(props) => props.borderRadius || '20px'};
  border-width: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2px;
`;

export const BigTitle = styled.Text.attrs({
  allowFontScaling: false,
})`
  font-family: opensans-semibold;
  font-size: 32px;
  line-height: 48px;
  text-align: ${(props) => props.align || 'left'};
  color: ${(props) => props.color || Colors.activeText};
`;

export const Title = styled.Text`
  font-family: opensans-semibold;
  font-size: 20px;
  line-height: 30px;
  color: ${(props) => props.color || Colors.activeText};
  text-align: ${(props) => props.textAlign || 'left'};
`;

export const Subtitle = styled.Text`
  font-family: opensans-regular;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.color || Colors.activeText};
  text-align: ${(props) => props.textAlign || 'left'};
`;

export const Body = styled.Text`
  font-family: ${(props) =>
    props.bold ? 'opensans-semibold' : 'opensans-regular'};
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.color || Colors.activeText};
  text-align: ${(props) => props.textAlign || 'left'};
`;

export const Caption = styled.Text`
  font-family: opensans-semibold;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.color || Colors.activeText};
  text-align: ${(props) => props.textAlign || 'left'};
`;

export const Overline = styled.Text`
  font-family: opensans-regular;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${(props) => props.color || Colors.activeText};
  text-align: ${(props) => props.textAlign || 'left'};
`;

export const NavButtonContainer = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  z-index: 100;
  top: 0px;
  left: ${(props) => (props.right ? 'undefined' : '12px')};
  right: ${(props) => (props.right ? '12px' : 'undefined')};
  border-radius: 23px;
  align-items: center;
  justify-content: center;
`;

export function NavHeaderContainer({
  backgroundColor,
  withMargin,
  children,
  vertical,
  noShadow,
  justifyContent,
  paddingTop,
  alignItems,
}) {
  const topInset = useSafeArea().top;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: alignItems || 'flex-start',
        justifyContent: justifyContent || 'center',
        paddingTop: paddingTop === 0 ? 0 : 16 + topInset,
        paddingBottom: 4,
        minHeight: 62 + topInset,
        marginBottom: withMargin ? 16 : 0,
        backgroundColor: backgroundColor || Colors.bgLight,
        shadowColor: noShadow ? 'transparent' : Colors.bgDark,
        elevation: noShadow ? 0 : 7,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: 1,
        textAlign: 'center',
      }}>
      {children}
    </View>
  );
}

NavHeaderContainer.propTypes = {
  backgroundColor: PropTypes.string,
  withMargin: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  vertical: PropTypes.bool,
  noShadow: PropTypes.bool,
  justifyContent: PropTypes.string,
  paddingTop: PropTypes.number,
  alignItems: PropTypes.string,
};

NavHeaderContainer.defaultProps = {
  backgroundColor: null,
  children: null,
  vertical: null,
  withMargin: null,
  noShadow: null,
  justifyContent: null,
  paddingTop: null,
  alignItems: null,
};

export const NavTitle = styled(Title)`
  flex: 1;
  margin-left: 8px;
  margin-right: ${(props) => (props.rightButton ? '8px' : '50px')};
  flex-wrap: wrap;
  text-align: ${(props) => props.textAlign || 'center'};
  color: ${(props) => (props.color ? props.color : Colors.activeText)};
`;
