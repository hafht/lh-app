import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyrightComponent } from './components/copy-right.component';

@Component({
  selector: 'cf-app-loading-page',
  standalone: true,
  imports: [CommonModule, CopyrightComponent],
  template: `
     <div class="login-page">
    <div class="login-header">
      <div class="login-logo">
          <img src="/assets/components/images/light-logo.svg" alt="test">
      </div>
    </div>
    <div class="loading-content">
      <div class="login-app-name">Kelvin</div>
      <div class="loading-message">
        <p id="loading-message">Loading...</p>
      </div>
    </div>
    <cf-app-copyright></cf-app-copyright>
  </div>
  `,
  // styleUrl: './components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingPageComponent {

}
