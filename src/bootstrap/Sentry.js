import { Sentry } from 'react-native-sentry';
import { sentryToken, sentryProject } from 'app/config/api';

export default {
  init: () => {
    Sentry.config(`https://${sentryToken}@sentry.io/${sentryProject}`, {
      deactivateStacktraceMerging: true
    }).install();
  },

  onError: (error, errorInfo) => {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }
}