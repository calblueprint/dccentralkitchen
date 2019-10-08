import React from 'react';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

class Announcements extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card
            title= {this.props.title}>
            <Text style={{marginBottom: 10}}>
                {this.props.description}
            </Text>
                <Text>
                    {this.props.date}
                </Text>
        </Card>)
    }
}

export default Announcements;