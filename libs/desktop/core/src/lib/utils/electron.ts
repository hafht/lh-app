import { app } from "electron"

export const isElectron = () => {
  return "browser" === process.type || "renderer" === process.type
}

export const isDebug = () => {
  return !app.isPackaged
}

export class ElectronExternalApi {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static onAppReady (handler: Function) {
    if (app?.isReady()) {
      handler();
    } else {
      handler();
    }
  }

  static setPreloadFileForSessions(preloadFilePath: string) {
    app.on('session-created', (session) => {
      session.setPreloads([...session.getPreloads(), preloadFilePath]);
    } )
  }
}
