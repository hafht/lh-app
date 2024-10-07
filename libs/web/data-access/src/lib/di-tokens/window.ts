import { InjectionToken } from "@angular/core"
import { ICFAppAPI } from "@creative-force/cf-app-types"

type AppWindow = Window & {
  CFAppAPI: ICFAppAPI
}
export const WINDOW = new InjectionToken<AppWindow>('Global window object', {
  factory: () => {
    if (!window.CFAppAPI) {
      window.CFAppAPI = Object.create({})
    }
    return window as any
  }
})