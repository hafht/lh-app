import { ipcRenderer } from 'electron';

export const authAPI = {
  login: () => ipcRenderer.invoke('login'),
  cancel: () => ipcRenderer.send('cancel'),
}
