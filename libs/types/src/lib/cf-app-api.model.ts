import { AppInfo, CFAppName } from "./client-app.model";

export interface ICFAppAPI {
  getAppVersion: () => Promise<string>
  getAppName: () => Promise<string>
  getAppInfo: () => Promise<AppInfo>
  platform: () => string;
  startup: () => Promise<any>;
  isDebug: () => boolean;
}


