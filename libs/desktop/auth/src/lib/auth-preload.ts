import { ipcRenderer,contextBridge } from "electron";
export class AuthPreload {
  static initialize  () {
    console.log('initialize electron authentication preload apis')
    const authPreload = {
      login: () => ipcRenderer.invoke('auth_login'),
      cancel: () => ipcRenderer.send('auth_cancel')
    }
  console.log('contextBridge', contextBridge)
    try {
      contextBridge?.exposeInMainWorld('__CFAppAuth', authPreload)
    } catch (e) {
      console.error('initialize electron authentication preload apis has exception', e)
    }
  }
}
