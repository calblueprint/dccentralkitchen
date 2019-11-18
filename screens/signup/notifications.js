// import { Notifications } from 'expo';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';

// async function registerForPushNotificationsAsync() {
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS
//     );
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     const pushToken = await Notifications.getExpoPushTokenAsync();
//     await this.setState({ token: pushToken });
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }
// };

// export default registerForPushNotificationsAsync;
