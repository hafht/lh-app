import { toObservableSignal } from 'ngxtension/to-observable-signal';
import { inject, Injectable, signal } from "@angular/core";
import { LoggerService } from './logger.service';
import { Subject, take, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logger = inject(LoggerService)

  state = toObservableSignal(signal<AuthState>({
    isProcessing: false,
    data: null
  }))

  private cannel$ = new Subject<void>();

  login() {
    this.state.update(state => {
      state.isProcessing = true
      return {
        ...state
      }
    })
    this.logger.scope('auth').info('Starting login.')
    timer(3000).pipe(
      takeUntil(this.cannel$),
      take(1)
    ).subscribe(() => {
      this.state.update(state => {
        state.isProcessing = false
        state.data = true
        return {
          ...state
        }
      })
      this.logger.scope('auth').info('Finished login.')
    })
  }

  cancel() {
    this.logger.scope('auth').info('User cancel login.')
    this.cannel$.next();
    this.state.update(state => {
      state.isProcessing = false
      state.data = null;
      state.error = ''
      return {
        ...state
      }
    })
  }
}

export interface AuthState {
  isProcessing: boolean;
  data: any;
  error?: string;
}