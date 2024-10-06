/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { app, ipcMain } from 'electron';
import App from '../app';
import StartUp from '../startup';
import { isDebug } from '../utils/electron';

export class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-app-name', () => {
  return app.getName();
});

ipcMain.handle('get-app-info', () => {
  return {
    appVersion: app.getVersion(),
    appName: app.getName(),
    isDebug: isDebug(),
  };
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
})


// startup
ipcMain.on('start-up', () => {
  StartUp.main();
})

ipcMain.on('is-debug', (_) => {
  _.returnValue = isDebug()
})