import { BuildEnv } from "@creative-force/cf-app-types";

export interface IEnvironment {
  production: boolean,
  version: string,
  buildEnv: BuildEnv;
}
