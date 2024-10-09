import {CFAppCore, CFAppElectronBasedModule, randomString} from '@creative-force/cf-app-core';
import { ipcMain, shell } from 'electron';
import {generators, Issuer, Client} from 'openid-client'
import {AccountApiConfig} from "./account-api.config";
import {IAccountConfig} from "./types";
import {AuthServer} from "./server";
import OpenIdClient from "./open-id-client";

class _CFAppAuthentication extends CFAppElectronBasedModule {
  private codeVerifier!: string;
  private authClient!: Client;
  private authIssuer!: Issuer
  private accountApiConfig!: IAccountConfig
  private authServer!: AuthServer;

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
    const openIdClient = new OpenIdClient({
      clientId: cfAppName,
      accountApiConfig: this.accountApiConfig,
      redirectUri: redirectUri
    })

    const urlAuthorization = openIdClient.getAuthorizationUrl();
    if (!urlAuthorization) {
      throw new Error('Cannot get authorization url!');
    }
    await shell.openExternal(urlAuthorization);

    const onLoginAccountSuccess = (url: string) => {
      console.log('onLoginAccountSuccess', url)
    }

    const onLoginAccountError = () => {
      console.error('onLoginAccountError',)
    }
    await handleRedirectUrlFn(onLoginAccountSuccess, onLoginAccountError)

    return false
    // return new Promise((resolve, reject) => {
    //   try{
    //
    //
    //   } catch (e) {
    //
    //   }
    // })
  }



}

export const CFAppAuthentication = new _CFAppAuthentication('auth');
