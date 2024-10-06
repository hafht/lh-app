import { CFAppName } from '@creative-force/cf-app-types';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyrightComponent } from '../../components/copy-right.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { WINDOW } from '@creative-force/cf-app-web/data-access';

@Component({
  selector: 'cf-app-loading-page',
  standalone: true,
  imports: [CommonModule, CopyrightComponent, LoadingComponent],
  template: `
    <cf-app-loading>
        <div class="app-name">{{appName}}</div>
        <div class="message">
          <p>Loading...</p>
        </div>
  </cf-app-loading>
  `,
  styleUrl: './loading-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingPageComponent implements AfterViewInit{
  @Input() appName!: CFAppName;

  private _window = inject(WINDOW)

  ngAfterViewInit(): void {
    this._window.CFAppAPI.startup()
  }
}
