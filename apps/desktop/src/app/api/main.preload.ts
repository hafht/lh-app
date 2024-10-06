import { commonAPI } from '@creative-force/cf-app-preload';
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('CFAppAPI', commonAPI);
