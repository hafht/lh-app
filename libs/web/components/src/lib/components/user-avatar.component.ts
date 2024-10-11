import { Component, Input, OnInit, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'cf-app-user-avatar',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div>
      <img
        class="flex-none rounded-full bg-gray-50"
        [ngSrc]="displayAvatarUrl()"
        height="50"
        width="50"
        [alt]="name"
        priority
      />
    </div>
  `,
})
export class UserAvatarComponent implements OnInit {
  @Input({ required: true }) email!: string;
  @Input() avatarUrl = '';
  @Input() name = '';
  displayAvatarUrl = signal(this.avatarUrl);

  readonly DEFAULT_LIST_AVATAR_BG = [
    '#3E82FB',
    '#253E6B',
    '#517C22',
    '#7BBA36',
    '#612583',
    '#9943C9',
    '#902328',
    '#E4454D',
    '#ABA231',
    '#F1E331',
    '#B17B34',
    '#F2A43B',
    '#6997DE',
    '#7F6FC0',
    '#95CBAC',
    '#DF777D',
    '#F4C582',
  ];

  readonly DEFAULT_SHAPE_AVATAR = [
    '/assets/components/images/avatar/avatar-01.png',
    '/assets/components/images/avatar/avatar-02.png',
    '/assets/components/images/avatar/avatar-03.png',
    '/assets/components/images/avatar/avatar-04.png',
    '/assets/components/images/avatar/avatar-05.png',
    '/assets/components/images/avatar/avatar-06.png',
    '/assets/components/images/avatar/avatar-07.png',
    '/assets/components/images/avatar/avatar-08.png',
    '/assets/components/images/avatar/avatar-09.png',
    '/assets/components/images/avatar/avatar-10.png',
    '/assets/components/images/avatar/avatar-11.png',
    '/assets/components/images/avatar/avatar-12.png',
    '/assets/components/images/avatar/avatar-13.png',
    '/assets/components/images/avatar/avatar-14.png',
    '/assets/components/images/avatar/avatar-15.png',
    '/assets/components/images/avatar/avatar-16.png',
    '/assets/components/images/avatar/avatar-17.png',
    '/assets/components/images/avatar/avatar-18.png',
    '/assets/components/images/avatar/avatar-19.png',
    '/assets/components/images/avatar/avatar-20.png',
  ];

  ngOnInit(): void {
    if (!this.displayAvatarUrl()) {
      const ascii = this.stringToASCII(this.email);
      const avatarIndex = ascii % this.DEFAULT_SHAPE_AVATAR.length;
      this.displayAvatarUrl.set(this.DEFAULT_SHAPE_AVATAR[avatarIndex]);
    }
  }

  private stringToASCII = (str: string): number => {
    if (!str) {
      return -999;
    }
    let total = 0;
    for (let i = 0; i < str.length; i++) {
      total += str.charCodeAt(i);
    }
    return total;
  };
}
