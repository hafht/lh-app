import { toObservableSignal } from 'ngxtension/to-observable-signal';
import { inject, Injectable, signal } from '@angular/core';
import { LoggerService } from './logger.service';
import { catchError, filter, from, Subject, tap, throwError } from 'rxjs';
import { UserToken } from '@creative-force/cf-app-types';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { WINDOW } from '../di-tokens/window';
import { Router } from '@angular/router';

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
  private userTokenStore = injectLocalStorage<UserToken>('userToken')
  private _window = inject(WINDOW);
  private router = inject(Router);
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
    this.logger.scope('auth').info(`User logged out.`)
    this.state.set({
      ...DEFAULT_STATE,
      isProcessing: false
    })

    this.router.navigateByUrl('app/login')
  }

  getAuthToken() {
    return this.userTokenStore() as UserToken;
  }

  refreshToken() {
    const token =  this.userTokenStore();
    if (!token || !token.refresh_token) {
      return;
    }

    return from(this._window.CFAppAuthAPI.refreshToken(token.refresh_token))
      .pipe(
        catchError((err) => throwError(() => {
          this.logger.error('AuthService - refresh token has exception', err)
          return throwError(() => err)
        })),
      )
  }
}

