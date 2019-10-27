import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    contentContainer: {
        flex: 4,
        flexDirection: 'column'},
    date: {
        fontWeight: 'bold',
    },
    title: {
        color: 'red',
    },

});

class DetailedAnScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let announcement = this.props.navigation.state.params.currentAnnouncement;
        return(
            <View>
                <Text>
                    {announcement.title}
                </Text>
                <Text>
                    {announcement.description}
                </Text>
                <Text>
                    Posted on {announcement.date.toLocaleDateString()}
                </Text>
            </View>
        )
    }

}

export default DetailedAnScreen