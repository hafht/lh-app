import { app } from "electron"

export const isElectron = () => {
  return "browser" === process.type || "renderer" === process.type
}

export const isDebug = () => {
  return !app.isPackaged
}

export class ElectronExternalApi {
  static onAppReady(handler: Function) {
    if (app?.isReady()) {
      handler();
    } else {
      handler();
    }
  }
}

//
