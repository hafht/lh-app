import { IEnvironment } from "@creative-force/cf-app-core";

declare const __BUILD_VERSION__: string;

export const environment: IEnvironment = {
  production: true,
  version: __BUILD_VERSION__,
  buildEnv: 'prod',
  cfAppName: 'luma'
};
