import { Component, inject } from '@angular/core';
import { AppLogoComponent, UserInfoComponent } from '@creative-force/cf-app-web-component';
import { BasedUserService } from '@creative-force/cf-app/web/data-access';

@Component({
  selector: 'lib-internal-post-header',
  standalone: true,
  imports: [AppLogoComponent, UserInfoComponent],
  template: `
    <div class="header flex justify-between p-5 bg-[#262626]">
      <!-- Left content     -->
      <div class="left">
        <cf-app-logo />
      </div>
      <!-- Right content    -->
      <div class="right">
        <cf-app-user-info [user]="userInfo()"/>
      </div>
    </div>
  `,
})
export class InternalPostHeaderComponent {
  readonly userInfo = inject(BasedUserService).myUser.asReadonly()


}
