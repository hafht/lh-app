import { ipcRenderer } from "electron";

export const commonAPI = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
}
