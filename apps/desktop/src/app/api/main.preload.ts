import { commonAPI } from '@creative-force/cf-app-preload';
import { contextBridge } from 'electron';

console.log('adsdsds2222')

contextBridge.exposeInMainWorld('CFAppAPI', commonAPI);
