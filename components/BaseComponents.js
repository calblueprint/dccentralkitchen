import styled from 'styled-components/native';
import Colors from '../assets/Colors';

export const TextButton = styled.Text`
  font-family: poppins-regular;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${props => (props.color ? props.color : Colors.primaryGreen)};
`;

export const ButtonContainer = styled.TouchableOpacity``;

export const ButtonLabel = styled(TextButton)`
  top: 25%;
  bottom: 25%;
  font-family: poppins-semibold;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01;
  text-transform: uppercase;
  color: ${props => (props.filledButton ? Colors.white : Colors.black)};
`;

export const FilledButtonContainer = styled(ButtonContainer)`
  width: 344px;
  height: 40px;
  background: ${props => (props.color ? props.color : Colors.primaryGreen)};
  ${props =>
    props.pressed
      ? 'box-shadow: 0px 11px 15px rgba(0, 0, 0, 0.2), 0px 24px 38px rgba(0, 0, 0, 0.14);'
      : ''};
  border-radius: 20px;
`;

export const Title = styled.Text`
  font-family: poppins-medium;
  font-size: 20px;
  line-height: 30px;
  color: ${Colors.black};
`;

export const Subhead = styled.Text`
  font-family: poppins-regular;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.black};
`;

export const Body = styled.Text`
  font-family: poppins-regular;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.black};
`;

export const Caption = styled.Text`
  font-family: poppins-medium;
  font-size: 12px;
  line-height: 16px;
  color: ${Colors.black};
`;

export const Overline = styled.Text`
  font-family: poppins-regular;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${Colors.black};
`;

export const TabSelected = styled.Text`
  font-family: poppins-semibold;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.black};
`;
