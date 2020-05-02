import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Colors from '../constants/Colors';

export const TextButton = styled.Text`
  font-family: poppins-regular;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) => props.color || Colors.primaryGreen};
`;

export const CircleIconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  padding: 8px;
  border-radius: 20px;
  background-color: ${(props) => props.color || Colors.lighterGreen};
`;

export const ButtonContainer = styled.TouchableOpacity``;
// TODO @tommypoa Replace top / bottom 25%
export const ButtonLabel = styled(TextButton)`
  font-family: poppins-semibold;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  text-align: center;
  letter-spacing: 0.01px;
  text-transform: uppercase;
  color: ${(props) => props.color || Colors.black};
`;

export const FilledButtonContainer = styled(ButtonContainer)`
  width: ${(props) => props.width || '344px'};
  height: ${(props) => props.height || '40px'};
  background: ${(props) => props.color || Colors.primaryGreen};
  ${(props) =>
    props.pressed
      ? 'box-shadow: 0px 11px 15px rgba(0, 0, 0, 0.2), 0px 24px 38px rgba(0, 0, 0, 0.14);'
      : ''};
  border-radius: ${(props) => props.borderRadius || '20px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2px;
`;

export const BigTitle = styled.Text`
  font-family: poppins-medium;
  font-size: 32px;
  line-height: 48px;
  text-align: ${(props) => props.align || 'left'};
  color: ${(props) => props.color || Colors.black};
`;

export const Title = styled.Text`
  font-family: poppins-medium;
  font-size: 20px;
  line-height: 30px;
  color: ${(props) => props.color || Colors.black};
`;

export const Subhead = styled.Text`
  font-family: poppins-regular;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.color || Colors.black};
`;

export const Body = styled.Text`
  font-family: poppins-regular;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.color || Colors.black};
`;

export const Caption = styled.Text`
  font-family: poppins-medium;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.color || Colors.black};
`;

export const Overline = styled.Text`
  font-family: poppins-regular;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${(props) => props.color || Colors.black};
`;

export const TabSelected = styled.Text`
  font-family: poppins-semibold;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.color || Colors.black};
`;

export const NavButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  z-index: 100;
  top: 0px;
  left: 12px;
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
}) {
  const topInset = useSafeArea().top;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: vertical ? 'flex-start' : 'center',
        justifyContent: 'center',
        paddingTop: 16 + topInset,
        paddingBottom: 4,
        minHeight: 62 + topInset,
        marginBottom: withMargin ? 16 : 0,
        backgroundColor: backgroundColor || Colors.lightest,
        shadowColor: noShadow ? 'transparent' : '#000',
        elevation: noShadow ? 0 : 7,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
};

NavHeaderContainer.defaultProps = {
  backgroundColor: null,
  children: null,
  vertical: null,
  withMargin: null,
  noShadow: null,
};

export const NavTitle = styled(Title)`
  flex: 1;
  margin-left: 8px;
  margin-right: 50px;
  flex-wrap: wrap;
  text-align: center;
  color: ${(props) => (props.color ? props.color : Colors.activeText)};
`;
