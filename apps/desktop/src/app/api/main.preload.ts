import { authAPI, commonAPI } from '@creative-force/cf-app-preload';
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('CFAppAPI', commonAPI);
contextBridge.exposeInMainWorld('CFAppAuthAPI', authAPI);
