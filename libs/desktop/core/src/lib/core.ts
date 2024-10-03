import { Main } from './main';
import { IAppConfig } from './models/config.model';
import { IEnvironment } from './models/environment.model';

class _CFAppCore {
  private _environment: IEnvironment = Object.create({});
  private _appConfig: IAppConfig = Object.create({});

  bootstrapDesktopApp(env: IEnvironment, config: IAppConfig) {
    this._environment = env;
    this._appConfig = config;
    console.log('bootstrapDesktopApp', { env, config });
    Main.initialize();

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

