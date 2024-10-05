import {ICFAppAPI} from './cf-app-api.model'

declare global {
  interface Window {
    CFAppAPI: ICFAppAPI
  }
}
