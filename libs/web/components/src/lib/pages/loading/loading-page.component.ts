import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ElectronService } from '@creative-force/cf-app-web/data-access';
import { CopyrightComponent } from '../../components/copy-right.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, takeUntil } from 'rxjs';
import { injectDestroy } from 'ngxtension/inject-destroy';
import { Router } from '@angular/router';
@Component({
  selector: 'cf-app-loading-page',
  standalone: true,
  imports: [CommonModule, CopyrightComponent, LoadingComponent],
  template: `
    <cf-app-loading>
        <div class="app-name">{{appInfo().cfAppName}}</div>
        <div class="message">
          <p>Loading...</p>
        </div>
  </cf-app-loading>
  `,
  styleUrl: './loading-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingPageComponent implements OnInit{
  private _electronService = inject(ElectronService)
  private destroy$ = injectDestroy();
  private router = inject(Router)

  isStartedUp$ =  toObservable(this._electronService.appInfo)
  .pipe(
    map(v => v.isStartedUp),
    distinctUntilChanged((prev, curr) => prev === curr),
    takeUntil(this.destroy$)
  )
  get appInfo() {
    return this._electronService.appInfo
  }

  ngOnInit(): void {
    this._electronService.startup()

    this.isStartedUp$.subscribe(isStarted => {
      if (isStarted) {
        this.router.navigateByUrl('/app')
      }
    })
    
  }
}
