import { commonAPI } from '@creative-force/cf-app-preload';
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', commonAPI);
