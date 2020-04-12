import * as Sentry from 'sentry-expo';

export function logErrorToSentry(errorObject) {
  const { screen, action, error } = errorObject;
  Sentry.configureScope(scope => {
    scope.setExtra('screen', screen);
    scope.setExtra('action', action);
  });
  Sentry.captureException(error);
}
