import * as express from 'express';
import {SERVER_SETTING, VIEW_CONTENT} from "./constant";
import {CFAppClientId} from "./types";
import {BuildEnv} from "@creative-force/cf-app-types";
import {join} from "path";
import * as fs from "fs";

export class AuthServer {
  private server;
  private readonly clientId!: CFAppClientId;
  private port: number = 0;
  private expressApp = express();
  private staticPath: string = '';
  private deepLink = ''

  constructor(clientId: CFAppClientId, env: BuildEnv, deepLink: string = '') {
    this.clientId = clientId;
    this.staticPath = join(__dirname, '/assets/auth')
    this.deepLink = deepLink
  }

  async createServer() {
    this.closeServer();
    const listAvailablePorts = this.getAvailablePortsByClientId(this.clientId);
    // check port is available
    for (let i = 0; i < listAvailablePorts.length; i++) {
      if (await this.isPortAvailable(listAvailablePorts[i])) {
        this.port = listAvailablePorts[i];
        break;
      }
    }
    if (!this.port) {
      throw new Error('No available port for listen redirect uri!');
    }

   this.expressApp.use(express.static(this.staticPath));

    // create server
    this.server = this.expressApp.listen(this.port, () => {
     console.info(`[@creative-force/app-auth] Authentication server listening on port  ${this.port}`);
    });
    const redirectUri = this.getRedirectUri();
    return {redirectUri, handleRedirectUrlFn: this.listenRedirectUri.bind(this)}
  }

  closeServer(): void {
    if (!this.server) {
      return;
    }
    console.info('[@creative-force/app-auth] server closed!')
    this.server.close();
    this.server = null;
  }

  private async listenRedirectUri(onSuccess: (url: string) => void, onError: () => void) {
    const successTemplate = this.renderTemplate(this.clientId, 'success');
    const errorTemplate = this.renderTemplate(this.clientId, 'error');

    this.expressApp.get('/oauthredirect', (req, res) => {
      res.status(301);
      if (onSuccess) {
        res.redirect('/success');
        onSuccess(req.originalUrl);
      } else {
        onError();
        res.redirect('/expired');
        this.closeServer();
      }
    });

    this.expressApp.get('/success', (req, res) => {
      if (successTemplate) {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(successTemplate));
        return;
      }
      res.send('Login success! Please close this window.');
    });

    this.expressApp.get('/expired', (req, res) => {
      if (errorTemplate) {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(errorTemplate));
        return;
      }
      res.send('We’re having trouble signing you in. Try  again on the desktop app.');
    });
  }

  private renderTemplate(clientId: CFAppClientId, type: 'success' | 'error'): string {
    const html = fs.readFileSync(join(this.staticPath, 'index.html'), 'utf8');
    const viewContent = VIEW_CONTENT[type];
    let tmpl  = html.replace('$title', viewContent.pageTitle);
    tmpl = tmpl.replace('$authStatus', viewContent.authTextStatus);
    tmpl = tmpl.replace('$authMsg', viewContent.authTextMessage);

    switch(clientId) {
      case 'kelvin':
        tmpl = tmpl.replace('$logoImage', 'kelvin.png');
        tmpl = tmpl.replace('$appLink', this.deepLink || '#');
        tmpl = tmpl.replace('$labelBtn', `Open the Kelvin App`);
        break;
      case 'hue':
        tmpl = tmpl.replace('$logoImage', 'hue.png');
        tmpl = tmpl.replace('$appLink', this.deepLink || '#');
        tmpl = tmpl.replace('$labelBtn', `Open the Hue App`);
        break;
      case 'ink':
        tmpl = tmpl.replace('$logoImage', 'ink.png');
        tmpl = tmpl.replace('$appLink', this.deepLink || '#');
        tmpl = tmpl.replace('$labelBtn', `Open the Ink App`);
      case 'luma':
        tmpl = tmpl.replace('$logoImage', 'luma.png');
        tmpl = tmpl.replace('$appLink', this.deepLink || '#');
        tmpl = tmpl.replace('$labelBtn', `Open the Luma App`);
        break;
      default:
        break;
    }
    return tmpl;
  }

  private isPortAvailable(port: number): Promise<boolean> {
    return new Promise((resolve) => {
      const server = this.expressApp
        .listen(port, () => {
          server.close();
          resolve(true);
        })
        .on('error', () => {
          resolve(false);
        });
    });
  }


  private getAvailablePortsByClientId(clientId: CFAppClientId): number[] {
    let ports: number[] = [];
    switch (clientId) {
      case 'kelvin':
        ports = [30001, 30002, 30003];
        break;
      case 'hue':
        ports = [30004, 30005, 30006];
        break;
      case 'ink':
        ports = [30007, 30008, 30009];
      case 'luma':
        ports = [30010, 30011, 30012];
        break;
      default:
        ports = [SERVER_SETTING.basePort];
    }
    return ports;
  }

  private getRedirectUri(): string {
    if (!this.server) {
      throw new Error('No authentication server exists yet.');
    }

    const address = this.server.address();
    if (!address || typeof address === 'string' || !address.port) {
      this.closeServer();
      throw new Error('Authentication server address is not type string. This is unexpected.');
    }

    const port = address && address.port;
    return `http://${SERVER_SETTING.host}:${port}/oauthredirect`;
  }

}
