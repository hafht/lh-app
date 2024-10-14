import { AppInfo, CFAppName } from "./client-app.model";
import {TokenSet} from "openid-client";

export interface ICFAppAPI {
  getAppVersion: () => Promise<string>
  getAppName: () => Promise<string>
  getAppInfo: () => Promise<AppInfo>
  platform: () => string;
  startup: () => Promise<any>;
  isDebug: () => boolean;
}


export interface ICFAppAuthAPI {
  login: () => Promise<TokenSet>
  cancel: () => void
  refreshToken: (refreshToken: string) => Promise<TokenSet>
}
