import { ipcRenderer } from "electron";

export const authPreload = {
  login: () => ipcRenderer.invoke('auth_login'),
  cancel: () => ipcRenderer.send('auth_cancel')
}
