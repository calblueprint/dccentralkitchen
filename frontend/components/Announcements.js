import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity,} from 'react-native'


const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        height: 150,
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
        color: 'blue',
    },

});

class Announcements extends React.Component {
    constructor(props) {
        super(props);
    }

    displaySummary() {
        let des = this.props.announcement.description
        if (des.length >= 43) {
            let sum = des.substring(0, 40)
            sum = sum.concat("...")
            return sum
        }
        return des
    }

    render() {
        return(
            <TouchableOpacity
                onPress={() =>
                this.props.navigation.navigate('DetailedAn', {
                    currentAnnouncement: this.props.announcement
                })}>
                <View style={styles.rowContainer}>
                    <View style={styles.dateContainer}>
                        <Text style = {styles.date}>
                            {this.props.announcement.date.toDateString()}
                        </Text>
                    </View>
                    <View style={styles.contentContainer} >
                        <Text style = {styles.title}>
                            {this.props.announcement.title}
                        </Text>
                        <Text>
                            {this.displaySummary()}
                         </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default Announcements;