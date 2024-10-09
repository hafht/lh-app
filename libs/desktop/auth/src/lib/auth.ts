import { CFAppClientId } from './types';
import { CFAppElectronBasedModule } from '@creative-force/cf-app-core';
import { ipcMain } from 'electron';
import { map, Subject, takeUntil, timer } from 'rxjs';


class _CFAppAuthentication extends CFAppElectronBasedModule {
  constructor(identify: string) {
    super(identify);
  }

  private cancelToken$ = new Subject<void>()

  initialize() {
    super.initialize();
    this.listenIPCEvents();
  }

  create(clientId: CFAppClientId) {
    console.log('initialize', clientId);

  }

  private listenIPCEvents() {
    ipcMain.handle('login', () => {
      return this.login()

    })
    ipcMain.on('cancel', () => this.cancelToken$.next())
  }

  login() {
    return new Promise((resolve, reject) => {
      timer(1000).pipe(
        map(() => {
          console.log('login success');
          return 'mock_data'
        }),
        takeUntil(this.cancelToken$),
      ).subscribe({
        next: (v) => {
          console.log('login done', v)
          resolve(v)
        },
        complete: () => {
          console.log('login finished');
          resolve(null)
        }
      })
    })
  }

}

export const CFAppAuthentication = new _CFAppAuthentication('auth');
