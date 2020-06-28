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
  const { screen, action, attemptedPhone, attemptedPass, error } = errorObject;
  Sentry.withScope((scope) => {
    scope.setExtra('screen', screen);
    scope.setExtra('action', action);
    scope.setExtra('attemptedPhone', attemptedPhone);
    scope.setExtra('attemptedPass', attemptedPass);
    Sentry.captureException(error);
  });
}

export function clearUserLog() {
  Analytics.setUserId(null);
  Sentry.configureScope((scope) => scope.clear());
}

export function setUserLog(customer) {
  Analytics.setUserId(customer.id);
  Analytics.setUserProperties({
    user_name: customer.name,
    phone_number: customer.phoneNumber,
    installation_id: Constants.installationId,
  });
  Sentry.configureScope((scope) => {
    scope.setUser({
      id: customer.id,
      username: customer.name,
      phoneNumber: customer.phoneNumber,
    });
  });
}
