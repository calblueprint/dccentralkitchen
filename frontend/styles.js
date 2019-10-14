import styled from 'styled-components/native';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Dimensions,
  } from 'react-native';

export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin: 5% 5% 2.5%;
`;
export const Subtitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin: 1% 5%;
`;

export const Notice = styled.Text`
    font-size: 12px;
    margin: 2% 5%;
`;

export const ScrollCategory = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const CardContainer = styled.View`
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    margin: 5% 5%;
    border-left-width: 7.5px;
    border-left-color: #000;
    box-shadow: 0px 10px 20px #e3e1e1;
`;

export const CardHeader = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const CardSubject = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

export const CardDate = styled.Text`
    font-size: 10px;
    font-weight: 600;
    padding: 5px 7.5px;
    border: 1px solid black;
    border-radius: 5px;
`;

export const CardBody = styled.Text`
    font-size: 13.5px;
`;

export const Button = styled.TouchableOpacity`
  flex: 1 1 0
`;

export const ButtonText = styled.Text`
    color: white;
    padding: 7.5px 7.5px;
    
`;

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
    },
    item: {
      backgroundColor: '#919191',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / 4
    }
})