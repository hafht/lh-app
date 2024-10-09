
import { CFAppCore, IAppConfig } from '@creative-force/cf-app-core';
import { environment } from './environments/environment';
import { electronAppName, rendererAppName, rendererAppPort, updateServerUrl } from './app/constants';

const APP_CONFIG: IAppConfig = {
  development: {
    rendererAppPort,
    rendererAppName,
    electronAppName,
    updateServerUrl
  }
}

CFAppCore.bootstrapDesktopApp(environment, APP_CONFIG);

