import { Component, inject } from '@angular/core';
import { HELPER_LINKS } from '@creative-force/cf-app-shared';
import { ElectronService } from '@creative-force/cf-app-web/common';


@Component({
  selector: 'cf-app-copyright',
  template: `
    <div class="login-copyright">
      <p>
        Copyright © <span id="current-year">{{ currentYear }}</span> Creative
        Force. All rights reserved.<br />
        <a target="_blank" [href]="privacyUrl">Privacy Policy</a> |
        <a target="_blank" [href]="termOfServiceUrl">Terms of Service</a> |
        <a target="_blank" [href]="eulaUrl">End User Licensing Agreement</a>
      </p>
      <p>
        {{ appInfo().appName }}<br />Version
        <span id="app-version">{{ appInfo().appVersion }}</span>
      </p>
    </div>
  `,
  styles: [
    `
      .login-copyright {
        height: 77px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #1b1a3d;
        color: #fff;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: 0.72px;
        padding: 5px 25px 5px 29px;
        p:last-of-type {
          text-align: right;
        }
        a {
          color: #fff;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    `,
  ],
  standalone: true,
})
export class CopyrightComponent {
  private _electronService = inject(ElectronService)

  get appInfo() {
    return this._electronService.appInfo
  }

  currentYear = new Date().getFullYear();
  privacyUrl = HELPER_LINKS.privacyUrl;
  termOfServiceUrl = HELPER_LINKS.termOfServiceUrl;
  eulaUrl = HELPER_LINKS.eulaUrl;
}
