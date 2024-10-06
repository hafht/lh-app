import { ipcRenderer } from "electron";

export const commonAPI = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppName: () => ipcRenderer.invoke('get-app-name'),
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  platform: process.platform,
  startup: () => ipcRenderer.send('start-up'),
}
