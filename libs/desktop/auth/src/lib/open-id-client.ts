import {Client, generators, Issuer} from "openid-client";
import {CFAppCore} from "@creative-force/cf-app-core";
import {CFAppClientId, IAccountConfig} from "./types";

export default class OpenIdClient {
  private codeVerifier!: string;
  private authClient!: Client;
  private authIssuer!: Issuer
  private accountApiConfig!: IAccountConfig;
  clientId!: CFAppClientId
  private redirectUri!: string;

  constructor(config: {
    clientId: CFAppClientId,
    accountApiConfig: IAccountConfig
    redirectUri: string;
  }) {
    this.redirectUri = config.redirectUri;
    this.accountApiConfig = config.accountApiConfig;
    this.clientId = config.clientId;
    this.initialize()
  }

  getCodeVerifier() {
    return this.codeVerifier
  }

  initialize() {
    this.initIssuer();
    this.initializeIClient([this.redirectUri]);
  }

  callbackParams(redirectUri: string) {
    return this.authClient.callbackParams(redirectUri);
  }

  getAuthorizationUrl(): string {
    try {
      this.codeVerifier = generators.codeVerifier();
      const url = this.authClient.authorizationUrl({
        scope: 'webapp_scope openid offline_access',
        state: generators.state(),
        code_challenge: generators.codeChallenge(this.codeVerifier),
        code_challenge_method: 'S256',
      })
      return url
    } catch (e) {
      console.error('getAuthorizationUrl error', e)
    }
  }

  private initializeIClient(redirect_uris: string[] = []) {
    if (!this.authIssuer) {
      this.initIssuer();
    }
    this.authClient = new this.authIssuer.Client({
      client_id: this.clientId,
      redirect_uris: redirect_uris,
      response_types: ['code'],
      token_endpoint_auth_method: 'none',
    });
  }

  private initIssuer() {
    this.authIssuer = new Issuer({
      issuer: this.accountApiConfig.cfAccountUrl,
      authorization_endpoint: this.accountApiConfig.authorizationEndpoint,
      token_endpoint: this.accountApiConfig.tokenEndpoint,
    })
  }

}
