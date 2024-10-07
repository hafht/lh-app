import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CopyrightComponent, LoadingComponent } from '@creative-force/cf-app-web-component';
import { AuthService, ElectronService } from '@creative-force/cf-app-web/data-access';
import {
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  interval,
  map,
  mergeAll,
  of,
  raceWith,
  take,
  takeUntil
} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {injectDestroy} from "ngxtension/inject-destroy";
import {Router} from "@angular/router";

@Component({
  selector: 'cf-app-login-page',
  standalone: true,
  imports: [CommonModule, CopyrightComponent, LoadingComponent],
  template: `
    <cf-app-loading>
      <div class="login-content">
      <div class="login-content-wrap">
      <div class="app-name">{{appInfo().cfAppName}}</div>
      <p *ngIf="authState.isProcessing" class="login-via-browser-message">
        Go to the browser to complete login
      </p>
    </div>
    <button type="submit" class="login-submit" (click)="authState.isProcessing ? cancel() : login()">{{authState.isProcessing ? 'Cancel' : 'Log in'}}</button>
      </div>
    </cf-app-loading>
  `,
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit{
  private electron = inject(ElectronService)
  private auth = inject(AuthService)
  private destroy$ = injectDestroy();
  private router = inject(Router);
  get appInfo() {
    return this.electron.appInfo
  }

  get authState() {
    return this.auth.state()
  }

  private rememberLoggedIn$ = of(this.auth.isAuthenticated())
    .pipe(takeUntil(this.destroy$));
  private newActionLoggedIn$ = this.auth.state
    .pipe(
      map(state => state.userToken),
      takeUntil(this.destroy$)
    )

  ngOnInit(): void {
    combineLatest([
      this.rememberLoggedIn$,
      this.newActionLoggedIn$
    ]).pipe(
      map(([isRememberLogged, isNewLogged]) => !!isRememberLogged || !!isNewLogged),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/app/project')
      }
    })
  }

  login() {
    this.auth.login()
  }
  cancel() {
    this.auth.cancel()
  }
}
