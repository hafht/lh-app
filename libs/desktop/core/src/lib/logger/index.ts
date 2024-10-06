// export const 

import log from 'electron-log/main'
export class ElectronLogger {
  // Init electron renderer log
  private static readonly rendererLog = log
  private static readonly mainLog = log.create({logId: 'main'})

  static readonly MainLog = ElectronLogger.mainLog

  static initialize() {
    // Renderer
    ElectronLogger.rendererLog.initialize({spyRendererConsole: false})
    ElectronLogger.rendererLog.scope.labelPadding = false
    ElectronLogger.rendererLog.transports.file.fileName = 'renderer.log'
    ElectronLogger.rendererLog.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s}:{ms} [Renderer] [{level}] {text}';

    // Main
    // ElectronLogger.mainLog.transports.file.fileName = 'main.log'
    // ElectronLogger.mainLog.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s}:{ms} [Main] [{level}] {text}';
  }

  static clearLogs() {
    ElectronLogger.rendererLog.transports.file.getFile()?.clear()
    ElectronLogger.mainLog.transports.file.getFile()?.clear()
  }
}

export const MainLogger = ElectronLogger.MainLog;
