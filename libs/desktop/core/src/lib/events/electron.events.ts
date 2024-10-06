/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { app, ipcMain } from 'electron';
import App from '../app';
import StartUp from '../startup';

export class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle('get-app-version', () => {
  return App.application.getVersion();
});

ipcMain.handle('get-app-name', () => {
  return App.application.getName();
});

ipcMain.handle('get-app-info', () => {
  return {
    appVersion: App.application.getVersion(),
    appName: App.application.getName()
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
