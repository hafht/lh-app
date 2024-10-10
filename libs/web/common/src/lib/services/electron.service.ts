import {inject, Injectable, signal} from "@angular/core";
import {ClientAppInfo} from "@creative-force/cf-app-types";
import {WINDOW} from "../di-tokens/window";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private _window = inject(WINDOW);
  private _logger = inject(LoggerService)
  private _appInfo = signal<ClientAppInfo>({
    appName: '',
    appVersion: '',
    isDebug: false,
    cfAppName: 'luma', // default
    isStartedUp: false,
  })

  get appInfo() {
    return this._appInfo.asReadonly();
  }

  constructor() {

    this.loadAppInfo();
  }

  private loadAppInfo() {
    this._window.CFAppAPI.getAppInfo().then(res => {
      this._appInfo.update(value => {
        return {
          ...value,
          ...res,
        }
      })
    })
  }

  startup() {
    this._logger.info('Startup application...')
    this._window.CFAppAPI.startup().then(res => {
      this._appInfo.update(value => {
        value.isStartedUp = res
        return {...value}
      })
    })
  }
}

