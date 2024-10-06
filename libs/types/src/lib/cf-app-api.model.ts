export interface ICFAppAPI {
  getAppVersion: () => Promise<string>
  getAppName: () => Promise<string>
  getAppInfo: () => Promise<GetAppInfoReturn>
  platform: () => string;
  startup: () => void;
}

export type GetAppInfoReturn = {
  appVersion: string;
  appName: string
}