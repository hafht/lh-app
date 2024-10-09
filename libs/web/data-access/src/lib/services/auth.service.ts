import { toObservableSignal } from 'ngxtension/to-observable-signal';
import { inject, Injectable, signal } from "@angular/core";
import { LoggerService } from './logger.service';
import {filter, Subject, take, takeUntil, timer} from 'rxjs';
import {UserToken} from "@creative-force/cf-app-types";
import {injectLocalStorage} from "ngxtension/inject-local-storage";
import { ElectronService } from './electron.service';
import { WINDOW } from '../di-tokens/window';

interface AuthState {
  isProcessing?: boolean;
  userToken?: UserToken;
  error?: string;
}

const DEFAULT_STATE: AuthState = {
  isProcessing: undefined,
  userToken: undefined
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logger = inject(LoggerService)
  private userTokenStore = injectLocalStorage<any>('userToken')
  private _window = inject(WINDOW);

  state = toObservableSignal(signal<AuthState>({...DEFAULT_STATE}))

  private cannel$ = new Subject<void>();


  constructor() {
    // listen event
    this.state.pipe(
      filter(s => s.isProcessing === false)
    ).subscribe(state => {
      this.userTokenStore.set(state.userToken)
    })
  }

  isAuthenticated(): boolean {
    // get token from store
    const token = this.userTokenStore()
    return !!token
  }


  login() {
    this.logger.scope('auth').info(`Start login.`)
    this.state.update(state => {
      return {
        ...DEFAULT_STATE,
        isProcessing: true
      }
    })
    this._window.CFAppAuthAPI.login().then(res => {
      console.log('res', res)
      this.state.update(state => {
        return {
          ...state,
          isProcessing: false,
          userToken: res
        }
      })
      this.logger.scope('auth').info(`Finished login.`)
    })
  }

  cancel() {
    this.logger.scope('auth').info('User cancel login.')
    this.cannel$.next();
    this._window.CFAppAuthAPI.cancel()
    this.state.set( {
      ...DEFAULT_STATE,
      isProcessing: false
    })
  }

  logout() {
    this.state.set({
      ...DEFAULT_STATE,
      isProcessing: false
    })
  }
}

