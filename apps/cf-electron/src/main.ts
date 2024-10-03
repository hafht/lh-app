
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

export default class Main {
  // static initialize() {
  //   if (SquirrelEvents.handleEvents()) {
  //     // squirrel event handled (except first run event) and app will exit in 1000ms, so don't do anything else
  //     app.quit();
  //   }
  // }

  // static bootstrapApp() {
  //   App.main(app, BrowserWindow);
  // }

  // static bootstrapAppEvents() {
  //   ElectronEvents.bootstrapElectronEvents();

  //   // initialize auto updater service
  //   if (!App.isDevelopmentMode()) {
  //     // UpdateEvents.initAutoUpdateService();
  //   }
  // }
}

// handle setup events as quickly as possible
// Main.initialize();

// // bootstrap app
// Main.bootstrapApp();
// Main.bootstrapAppEvents();
