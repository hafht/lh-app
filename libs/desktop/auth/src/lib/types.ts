import {CLIENT_IDS, VIEW_CONTENT} from './constant';

export type CFAppClientId = keyof typeof CLIENT_IDS;


export interface IAccountConfig {
  cfAccountUrl: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  revokeTokenEndpoint: string;
}


export type ViewContentType = keyof typeof VIEW_CONTENT;


