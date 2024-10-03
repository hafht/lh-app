import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cf-app-loading-page',
  standalone: true,
  imports: [CommonModule],
  template: `
     <div class="login-page">
    <div class="login-header">
      <div class="login-logo">
          <!-- <img src="../../assets/images/light-logo.svg" alt=""> -->
      </div>
    </div>
    <div class="loading-content">
      <div class="login-app-name">Kelvin</div>
      <div class="loading-message">
        <p id="loading-message">Loading...</p>
      </div>
    </div>
    <!-- <app-copyright></app-copyright> -->
  </div>
  `,
  // styleUrl: './components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingPageComponent {

}
