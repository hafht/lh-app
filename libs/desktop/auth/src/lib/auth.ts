import {CFAppCore, CFAppElectronBasedModule, randomString} from '@creative-force/cf-app-core';
import { ipcMain, shell } from 'electron';
import {net} from 'electron'
import {AccountApiConfig} from "./account-api.config";
import {IAccountConfig} from "./types";
import {AuthServer} from "./server";
import OpenIdClient from "./open-id-client";
import {TokenSet, TokenSetParameters} from 'openid-client'

class _CFAppAuthentication extends CFAppElectronBasedModule {

  private accountApiConfig!: IAccountConfig
  private authServer!: AuthServer;
  private openIdClient!: OpenIdClient;
  private redirectUri = ''

  private get authClientId() {
    return CFAppCore.environment().cfAppName
  }

  constructor(identify: string) {
    super(identify);
  }

  initialize() {
    const {buildEnv, cfAppName} = CFAppCore.environment();
    this.authServer = new AuthServer(cfAppName, buildEnv)
    super.initialize();
    this.listenIPCEvents();
    this.loadAccountApiConfig();
  }

  private loadAccountApiConfig() {
    const {buildEnv} = CFAppCore.environment();
   this.accountApiConfig = AccountApiConfig['uat']
  }


  private listenIPCEvents() {
    ipcMain.handle('login', () => {
      return this.login()

    })
    ipcMain.on('cancel', () => {
      return true
    })
    ipcMain.handle('refreshToken', async (_, refreshToken) => {
      console.log('refreshToken', refreshToken)
      return this.refreshToken(refreshToken)
    })
  }

  async login() {
    const {redirectUri, handleRedirectUrlFn} = await this.authServer.createServer();
    this.redirectUri = redirectUri;
    this.openIdClient = new OpenIdClient({
      clientId: this.authClientId,
      accountApiConfig: this.accountApiConfig,
      redirectUri: redirectUri
    })

    const urlAuthorization = this.openIdClient.getAuthorizationUrl();
    if (!urlAuthorization) {
      throw new Error('Cannot get authorization url!');
    }
    await shell.openExternal(urlAuthorization);

    return new Promise( (resolve, reject) => {
      try{
        const onLoginAccountSuccess = (url: string) => {
          this.getTokenFromUri(url).then(token => {
            resolve(token)
          }).catch(err => {
            reject();
          })
        }
        const onLoginAccountError = () => {
          console.error('onLoginAccountError')
          reject()
        }
        handleRedirectUrlFn(onLoginAccountSuccess, onLoginAccountError)
      } catch (e) {
        reject()
      }
    })
  }

  async refreshToken (refreshToken: string) {
    try {
      const requestParams = new URLSearchParams();
      requestParams.append('client_id', this.authClientId);
      requestParams.append('grant_type', 'refresh_token');
      requestParams.append('refresh_token', refreshToken);
      const result = await this.makeRequestAPI<TokenSetParameters>(this.accountApiConfig.tokenEndpoint, requestParams)
      if (!result) {
        return;
      }
      return new TokenSet(result)
    } catch (e) {
      console.error('Refresh token has error!', e);
      return;
    }
  }

  private async getTokenFromUri(uri: string) {
    try {
      const params = this.openIdClient.callbackParams(uri);
      const requestParams = new URLSearchParams();
      requestParams.append('client_id', this.openIdClient.clientId);
      requestParams.append('grant_type', 'authorization_code');
      requestParams.append('code', params.code);
      requestParams.append('code_verifier', this.openIdClient.getCodeVerifier());
      requestParams.append('redirect_uri', this.redirectUri);
      const result = await this.makeRequestAPI<TokenSetParameters>(this.accountApiConfig.tokenEndpoint, requestParams)
      return new TokenSet(result)
    } catch (e) {
      console.error('Get token from uri has error', e);
      return null;
    }
  }


  private async makeRequestAPI<T>(url: string, params: URLSearchParams) {
    try {
      const controller = new AbortController();
      const response = await net.fetch(url, {
        method: 'POST',
        headers: {
          'User-Agent': 'LH-APP',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
        signal: controller.signal,
      });
      console.log('response', response.status);
      if (!response || response.status !== 200) {
        return;
      }
      return await response.json() as T
    } catch (e) {
      console.error('makeRequestAPI has error', e);
      return
    }
  }
}



export const CFAppAuthentication = new _CFAppAuthentication('auth');
