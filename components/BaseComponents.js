import styled from 'styled-components/native';

export const TextButton = styled.Text`
  font-family: poppins-regular;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #008550;
`;

export const TextButtonPressed = styled(TextButton)`
  color: #004e14;
`;

export const TextButtonDisabled = styled(TextButton)`
  color: #bdbdbd;
`;

export const ButtonContainer = styled.TouchableOpacity``;

export const ButtonLabel = styled(TextButton)`
  font-family: poppins-regular;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01;
  text-transform: uppercase;
  color: ${props => (props.filledButton ? '#ffffff' : '#000000')};s
`;

export const FilledButtonContainer = styled(ButtonContainer)`
  background: #008550;
  border-radius: 20px;
`;

export const FilledButtonContainerPressed = styled(ButtonContainer)`
  background: #004e14;
  border-radius: 20px;
`;

export const FilledButtonContainerDisabled = styled(ButtonContainer)`
  background: #bdbdbd;
  border-radius: 20px;
`;

export const Title = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
`;

export const Subhead = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;

export const Body = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
`;

export const Caption = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
`;

export const Overline = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: #000000;
`;

export const TabSelected = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
`;
