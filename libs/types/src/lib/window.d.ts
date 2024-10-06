import {ICFAppAPI} from './cf-app-api.model'
import {RendererLogger} from 'electron-log'
declare global {
  interface Window {
    CFAppAPI: ICFAppAPI
    __electronLog: RendererLogger
  }
}
