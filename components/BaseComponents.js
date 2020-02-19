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
  color: ${Colors.primaryGreen};
`;

export const TextButtonPressed = styled(TextButton)`
  color: ${Colors.darkerGreen};
`;

export const TextButtonDisabled = styled(TextButton)`
  color: ${Colors.base};
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
  color: ${props => (props.filledButton ? '#ffffff' : '#000000')};
`;

export const FilledButtonContainer = styled(ButtonContainer)`
  width: 344px;
  height: 40px;
  background: ${Colors.primaryGreen};
  border-radius: 20px;
`;

export const FilledButtonContainerPressed = styled(FilledButtonContainer)`
  background: #004e14;
  box-shadow: 0px 11px 15px rgba(0, 0, 0, 0.2),
    0px 24px 38px rgba(0, 0, 0, 0.14);
`;

export const FilledButtonContainerDisabled = styled(FilledButtonContainer)`
  background: ${Colors.lightestGreen};
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
