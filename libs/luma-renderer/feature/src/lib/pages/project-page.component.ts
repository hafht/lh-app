import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@creative-force/cf-app-web/common';
import { Router } from '@angular/router';
import { InternalPostHeaderComponent } from '@creative-force/cf-app-web/features';
import { BasedUserService } from '@creative-force/cf-app/web/data-access';
import { injectDestroy } from 'ngxtension/inject-destroy';
import { takeUntil } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'cf-app-luma-project',
  standalone: true,
  imports: [InternalPostHeaderComponent, MatSlideToggleModule, MatButtonModule],
  template: `
    <div class="h-screen">
      <lib-internal-post-header></lib-internal-post-header>
      <div class="">
      </div>
    </div>
  `,
})
export class LumaProjectPageComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private basedUserService = inject(BasedUserService);
  private destroy$ = injectDestroy();

  ngOnInit() {
    this.basedUserService
      .getMyUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/app/login');
  }
}

// apiUrl: "https://api.creativeforce-uat.io",
