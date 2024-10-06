export interface ICFAppAPI {
  getAppVersion: () => Promise<string>
  getAppName: () => Promise<string>
  getAppInfo: () => Promise<AppInfo>
  platform: () => string;
  startup: () => void;
  isDebug: () => boolean;
}

export type AppInfo = {
  appVersion: string;
  appName: string
  isDebug: boolean
}