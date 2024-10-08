import { Subject } from 'rxjs';
import { CFAppClientId } from './types';

export class CFAppAuthentication {
  readonly cancelToken$ = new Subject<void>();

  initialize(clientId: CFAppClientId) {
    console.log('initialize', clientId);
  }

  login() {
    console.log('login');
    return true;
  }

}
