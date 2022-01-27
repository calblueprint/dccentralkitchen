import styled from 'styled-components/native';
import Colors from '../../constants/Colors';

// eslint-disable-next-line import/prefer-default-export
export const MapFilterTouchableButtonStyling = styled.TouchableOpacity`
  margin: 0 3px 6px auto;
  padding: 5px 10px;
  border: 1.5px solid ${Colors.primaryOrange};
  border-radius: 12.5px;
  background-color: ${(props) =>
    props.selected ? Colors.primaryOrange : Colors.lightestOrange};
`;

export const MapFilterButtonTextStyling = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) =>
    props.selected ? Colors.lightText : Colors.darkerOrange};
`;
