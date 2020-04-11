import * as Sentry from 'sentry-expo';

const logErrorToSentry = errorObject => {
  const { screen, action, error } = errorObject;
  Sentry.configureScope(function(scope) {
    scope.setExtra('screen', screen);
    scope.setExtra('action', action);
  });
  Sentry.captureException(error);
};

export default logErrorToSentry;
