import { BuildEnv, CFAppName } from "@creative-force/cf-app-types";

export interface IEnvironment {
  production: boolean,
  version: string,
  buildEnv: BuildEnv;
  cfAppName: CFAppName
  appId: string;
}
