import { Component, inject, OnInit, signal } from '@angular/core';
import {AuthService} from "@creative-force/cf-app-web/common";
import {Router} from "@angular/router";
import {CFHttpClient, HTTP_REQUEST_CONFIG_CONTEXT} from "@creative-force/cf-app-web/common";
import {HttpContext} from "@angular/common/http";
import { InternalPostHeaderComponent } from '@creative-force/cf-app-web/features';
import { BasedUserService } from '@creative-force/cf-app/web/data-access';
import { injectDestroy } from 'ngxtension/inject-destroy';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'cf-app-luma-project',
  standalone: true,
  imports: [InternalPostHeaderComponent],
  template: `
    <div class="h-screen">
      <lib-internal-post-header></lib-internal-post-header>
      <div class="">
        <h1 class="text-white text-2xl p-5">Hi!</h1>
        <p class="text-center">

        </p>
      </div>
    </div>
  `,
})
export class LumaProjectPageComponent implements OnInit {
  private auth = inject(AuthService)
  private router = inject(Router);
  private basedUserService = inject(BasedUserService)
  private destroy$ = injectDestroy();


  ngOnInit() {
    this.basedUserService.getMyUserInfo().pipe(
      takeUntil(this.destroy$),
    ).subscribe()
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/app/login')
  }
}

// apiUrl: "https://api.creativeforce-uat.io",
