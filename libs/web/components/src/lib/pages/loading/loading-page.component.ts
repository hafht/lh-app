import { CFAppName } from '@creative-force/cf-app-types';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyrightComponent } from '../../components/copy-right.component';
import { LoadingComponent } from '../../components/loading/loading.component';

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
export class LoadingPageComponent{
  @Input() appName: CFAppName = 'kelvin'
}
