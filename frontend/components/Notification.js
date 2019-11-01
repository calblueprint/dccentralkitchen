import React from 'react';
import { Text, View, Button } from 'react-native';
import { Notifications } from 'expo';

//TODO Migrate push notications to sever
//general component to send push notification takes in title, body, Push Token
export default class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notification: {},
        };
    }

    componentDidMount() {

        this.sendPushNotification()
        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );
    }

    _handleNotification = notification => {
        this.setState({ notification: notification });
    };

    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
    sendPushNotification = async () => {
        const message = {
            to: this.props.token,
            sound: 'default',
            title: this.props.title,
            body: this.props.body,
            data: { data: 'goes here' },
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
        const data = response._bodyInit;
    };

    render() {
        return (
            <View>

            </View>
        );
    }
}



