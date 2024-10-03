export interface IAppConfig {
  development: IAppConfigDevelopment
}

export interface IAppConfigDevelopment {
  rendererAppPort: number;
  rendererAppName: string;
  electronAppName: string;
  updateServerUrl: string
}

