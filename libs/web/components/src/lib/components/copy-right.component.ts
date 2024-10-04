import {Component, inject} from '@angular/core'

@Component({
  selector: 'cf-app-copyright',
  template: `
   <div class="login-copyright">
    <p>
      Copyright © <span id="current-year">{{currentYear}}</span> Creative Force. All rights reserved.<br>
      <a (click)="privacyAndPolicy()">Privacy Policy</a> | <a (click)="termOfService()">Terms of Service</a> | <a
        (click)="eula()">End User Licensing Agreement</a>
    </p>
    <p>Kelvin<br />Version <span id="app-version">{{appVersion}}</span></p>
  </div>
  `,
  styles: [`.login-copyright {
    height:77px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1B1A3D;
    color:#fff;
    font-size:13px;
    line-height:18px;
    letter-spacing: 0.72px;
    padding:5px 25px 5px 29px;
    p:last-of-type{
      text-align: right;
    }
    a{
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }`],
  standalone: true
})
export class CopyrightComponent {
  appVersion = 'test'
  currentYear = new Date().getFullYear();

  // private _electronService = inject(ElectronService)

  ngAfterViewInit() {
    // this.appVersion =  Static.EnvironmentInformation.appVersion;
  }

  termOfService() {
    // this._electronService.openUrlExternal(Constants.termOfServiceUrl);
  }

  privacyAndPolicy() {
    // this._electronService.openUrlExternal(Constants.privacyUrl);
  }

  eula() {
    // this._electronService.openUrlExternal(
    //   "https://www.creativeforce.io/legal/eula/"
    // );
  }

}
