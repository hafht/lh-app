import { app } from 'electron';
import { ElectronLogger, MainLogger } from './logger';
import { Main } from './main';
import { IAppConfig } from './models/config.model';
import { IEnvironment } from './models/environment.model';
import {CFAppAuthentication} from "@creative-force/cf-app/desktop/auth";

import * as Electron from 'electron';

class _CFAppCore {
  private _environment: IEnvironment = Object.create({});
  private _appConfig: IAppConfig = Object.create({});

  bootstrapDesktopApp(env: IEnvironment, config: IAppConfig) {
    this._environment = env;
    this._appConfig = config;
    Main.initialize();
    ElectronLogger.initialize();
    console.log('contextBridge 22', Electron.contextBridge)
    CFAppAuthentication.initialize(env.cfAppName);
    MainLogger.info(`App starting with version ${app.getVersion()} - ${process.type}`, {
      system: `${process.platform} ${process.arch}`,
      electron: process.versions.electron,
      isElectron: "browser" === process.type || "renderer" === process.type
    });
    // bootstrap app
    Main.bootstrapApp();
    Main.bootstrapAppEvents();
  }

  environment() {
    return this._environment
  }
  appConfig() {
    return this._appConfig;
  }
}
export const CFAppCore = new _CFAppCore();

