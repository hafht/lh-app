import { InjectionToken } from "@angular/core"
import { ICFAppAPI, ICFAppAuthAPI } from '@creative-force/cf-app-types';


declare global {
  interface Window {
    CFAppAPI: ICFAppAPI
    CFAppAuthAPI: ICFAppAuthAPI
  }
}


export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => {
    if (!window.CFAppAPI) {
      window.CFAppAPI = Object.create({})
    }
    return window as any
  }
})
