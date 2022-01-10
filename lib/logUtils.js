import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import * as Sentry from 'sentry-expo';

export function logErrorToSentry(errorObject) {
  const { screen, action, error } = errorObject;
  Sentry.withScope((scope) => {
    scope.setExtra('screen', screen);
    scope.setExtra('action', action);
    Sentry.captureException(error);
  });
}

export function logAuthErrorToSentry(errorObject) {
  const { screen, action, attemptedPhone, error } = errorObject;
  Sentry.withScope((scope) => {
    scope.setExtra('screen', screen);
    scope.setExtra('action', action);
    scope.setExtra('attemptedPhone', attemptedPhone);
    Sentry.captureException(error);
  });
}

export function clearUserLog() {
  Sentry.Native.configureScope((scope) => scope.clear());
}

export function setUserLog(customer) {
  Analytics.setUserId(Constants.installationId);
  Analytics.setUserProperties({
    airtable_id: customer.id,
    user_name: customer.name,
    phone_number: customer.phoneNumber,
    installation_id: Constants.installationId,
  });
  Sentry.Native.configureScope((scope) => {
    scope.setUser({
      id: customer.id,
      username: customer.name,
      phoneNumber: customer.phoneNumber,
    });
  });
}
