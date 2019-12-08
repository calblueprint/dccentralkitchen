import React from 'react';
import {
    TouchableOpacity,
    Button
} from 'react-native';

export default class Hamburger extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <TouchableOpacity
                style={{
                    backgroundColor:'white',
                    width:50,
                    height:50,
                    zIndex:100,
                    position:'absolute', // comment out this line to see the menu toggle
                    top:50,
                    left: 15,
                    borderRadius: 23,
                    borderColor: '#ffffff',
                    borderWidth: 4,
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    shadowColor: 'black',
                    shadowOffset: { height: 3, width: 4 },
                }}>
                <Button 
                    color="black" 
                    title="="
                    onPress={() => this.props.navigation.toggleDrawer()} >
                </Button>
            </TouchableOpacity>
        )
    }
}