import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {LoadingPageComponent} from '@creative-force/cf-app-web-component'
import { WINDOW } from '@creative-force/cf-app-web/data-access';
@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, LoadingPageComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private _window = inject(WINDOW)
  ngAfterViewInit(): void {
      console.log('aa', this._window.__electronLog)
      this._window.__electronLog.debug('test log')
  }
  
}
