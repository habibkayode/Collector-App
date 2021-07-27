import React from 'react';
import { Platform, View } from 'react-native';
import { Notifications } from 'react-native-notifications';
import {
  updatePushToken,
  updatePickuAlert,
  updateMessageAlert,
  updatePickupAlertModal,
  updateRedirect,
} from './Redux/actionCreator';
import { store } from './Redux/store';
import * as RootNavigation from './RootNavigation';

export default class PushNotificationManager extends React.Component {
  constructor() {
    super();
    // Request permissions on iOS, refresh token on Android
  }
  componentDidMount() {
    this.registerDevice();
    this.registerNotificationEvents();
    // Notifications.registerRemoteNotifications();
    // Notifications.events().registerRemoteNotificationsRegistered((event) => {
    //   // TODO: Send the token to my server so it could send back push notifications...
    //   console.log("Device Token Received", event.deviceToken);
    // });
    // Notifications.events().registerRemoteNotificationsRegistrationFailed(
    //   (event) => {
    //     console.error(event);
    //   }
    // );
  }

  registerDevice = () => {
    Notifications.events().registerRemoteNotificationsRegistered((event) => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log('Device Token Received', event.deviceToken);
      store.dispatch(updatePushToken(event.deviceToken));
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event) => {
        console.error(event);
      }
    );

    Notifications.registerRemoteNotifications();
  };

  registerNotificationEvents = () => {
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification.payload);
        console.log(notification.payload['gcm.notification.title']);
        if (
          notification.payload['gcm.notification.title'] === 'Pickup Request'
        ) {
          store.dispatch(updatePickuAlert(true));
        }
        if (
          notification.payload['gcm.notification.title'] ===
          'Pickup Request Alert'
        ) {
          store.dispatch(
            updatePickupAlertModal({
              status: true,
              id: notification.payload.pickup_request,
            })
          );
        } else {
          store.dispatch(updateMessageAlert(true));
        }

        completion({ alert: false, sound: false, badge: false });
      }
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log('Notification opened by device user', notification.payload);
        console.log(
          `Notification opened with an action identifier: ${notification.identifier}`
        );

        try {
          RootNavigation.navigate('Tab', {
            screen: 'Home',
            params: {
              screen: 'Message',
            },
          });

          store.dispatch(
            updateRedirect({ status: true, screenName: 'Message' })
          );
        } catch (error) {
          store.dispatch(
            updateRedirect({ status: true, screenName: 'Message' })
          );
        }

        completion();
      }
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false });
      }
    );

    Notifications.getInitialNotification()
      .then((notification) => {
        console.log('Initial notification was:', notification || 'N/A');
      })
      .catch((err) => console.error('getInitialNotifiation() failed', err));
  };

  render() {
    const { children } = this.props;
    return <View style={{ flex: 1 }}>{children}</View>;
  }
}
