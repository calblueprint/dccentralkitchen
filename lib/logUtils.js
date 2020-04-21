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
