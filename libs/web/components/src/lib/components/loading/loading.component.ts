import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CopyrightComponent } from '../../components/copy-right.component';

@Component({
  selector: 'cf-app-loading',
  standalone: true,
  imports: [CommonModule, CopyrightComponent],
  template: `
    <div class="loading-page" [style.background-image]="'url(' + bgUrl + ')'">
      <div class="loading-header">
        <div class="logo">
            <img src="/assets/components/images/light-logo.svg" alt="test">
        </div>
      </div>
      <div class="loading-content">
        <ng-content></ng-content>
      </div>
      <cf-app-copyright></cf-app-copyright>
  </div>
  `,
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent  {
  bgUrl = '/assets/login-bg.jpg'
}
