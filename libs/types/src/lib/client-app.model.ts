export type CFAppName = 'kelvin' | 'hue' | 'ink' | 'luma'

export interface AppInfo {
  appVersion: string;
  appName: string
  isDebug: boolean;
  cfAppName: CFAppName
} 

export interface ClientAppInfo extends AppInfo {
  isStartedUp: boolean
}