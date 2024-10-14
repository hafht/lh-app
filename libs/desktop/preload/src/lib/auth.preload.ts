import { ipcRenderer } from 'electron';

export const authAPI = {
  login: () => ipcRenderer.invoke('login'),
  cancel: () => ipcRenderer.send('cancel'),
  refreshToken: (refreshToken: string) => ipcRenderer.send('refreshToken', refreshToken),
}
