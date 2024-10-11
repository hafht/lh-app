import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'cf-app-logo',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <img ngSrc="/assets/components/images/app-logo-full-color.svg" alt="Logo" width="144" height="58" priority>
  `
})

export class AppLogoComponent {}
