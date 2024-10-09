import { Subject } from 'rxjs';
import { CFAppClientId } from './types';
import {ElectronExternalApi} from "@creative-force/cf-app-core";
import {AuthPreload} from "./auth-preload";



class _CFAppAuthentication {
  readonly cancelToken$ = new Subject<void>();

  initialize(clientId: CFAppClientId) {
    console.log('initialize', clientId);
    ElectronExternalApi.onAppReady(() => {
      console.log('app ready - do init preload')
      AuthPreload.initialize()
    })

  }

  login() {
    console.log('login');
    return true;
  }

}

export const CFAppAuthentication = new _CFAppAuthentication();
