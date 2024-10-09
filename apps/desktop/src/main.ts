
import { CFAppCore, IAppConfig } from '@creative-force/cf-app-core';
import { environment } from './environments/environment';
import { electronAppName, rendererAppName, rendererAppPort, updateServerUrl } from './app/constants';
import { CFAppAuthentication } from '@creative-force/cf-app/desktop/auth';

const APP_CONFIG: IAppConfig = {
  development: {
    rendererAppPort,
    rendererAppName,
    electronAppName,
    updateServerUrl
  }
}

CFAppCore.bootstrapDesktopApp({
  env: environment,
  config: APP_CONFIG,
  externalModules: [
    CFAppAuthentication
  ]
});

