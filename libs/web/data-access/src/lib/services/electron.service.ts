import { inject, Injectable, signal } from "@angular/core";
import { WINDOW } from "../di-tokens/window";
import { AppInfo } from "@creative-force/cf-app-types";

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private _window = inject(WINDOW);
  
  private _appInfo = signal<AppInfo>({
    appName: '',
    appVersion: '',
    isDebug: false
  })

  get appInfo() {
    return this._appInfo.asReadonly();
  }

  constructor() {
  
    this.loadAppInfo();
  }

  private loadAppInfo() {
    this._window.CFAppAPI.getAppInfo().then(res => {
      this._appInfo.set(res)
    })
  }
}

