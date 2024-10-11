import { Component, Input } from '@angular/core';
import { MyUserInfo } from '@creative-force/cf-app-types';
import { UserAvatarComponent } from './user-avatar.component';

@Component({
  selector: 'cf-app-user-info',
  standalone: true,
  imports: [UserAvatarComponent],
  template: `
    <div class="user-info flex justify-between items-center">
      <p class="text-white cen mr-2">
        {{user.name}}
      </p>
      <cf-app-user-avatar [email]="user.email" [avatarUrl]="user.avatarUrl" [name]="user.name"></cf-app-user-avatar>
    </div>
  `,
})
export class UserInfoComponent {
  @Input({ required: true }) user!: MyUserInfo;
}
