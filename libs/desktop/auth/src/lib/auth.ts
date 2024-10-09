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

    })
  }

  async login() {
    const {buildEnv, cfAppName} = CFAppCore.environment();
    const {redirectUri, handleRedirectUrlFn} = await this.authServer.createServer();
    this.redirectUri = redirectUri;
    this.openIdClient = new OpenIdClient({
      clientId: cfAppName,
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

  private getTokenFromUri(uri: string) {
    const params = this.openIdClient.callbackParams(uri);
    return new Promise(async (resolve, reject) => {
      try {
        const requestParams = new URLSearchParams();
        requestParams.append('client_id', this.openIdClient.clientId);
        requestParams.append('grant_type', 'authorization_code');
        requestParams.append('code', params.code);
        requestParams.append('code_verifier', this.openIdClient.getCodeVerifier());
        requestParams.append('redirect_uri', this.redirectUri);

        const controller = new AbortController();
        let response;
        response = await net.fetch(this.accountApiConfig.tokenEndpoint, {
          method: 'POST',
          headers: {
            'User-Agent': 'LH-APP',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: requestParams,
          signal: controller.signal,
        });

        if (!response || response.status !== 200) {
          return reject();
        }
        const tokenSetParameters = await (response.json()) as TokenSetParameters
        resolve(new TokenSet(tokenSetParameters))
      } catch (e) {
        reject()
      }
    })
  }
}



export const CFAppAuthentication = new _CFAppAuthentication('auth');
