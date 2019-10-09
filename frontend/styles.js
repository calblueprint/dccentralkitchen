import styled from 'styled-components/native';

export const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    margin: 5% 5%;
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
    margin-bottom: 7.5%;
`;

export const Button = styled.TouchableOpacity`
    background-color: black;
    border-radius: 5px;
    border: 1px red solid;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-right: 50%;
`;

export const ButtonText = styled.Text`
    color: white;
    padding: 7.5px 7.5px;
    
`;