import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggerService, } from '@creative-force/cf-app-web/data-access';
@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private _logger = inject(LoggerService)
  ngAfterViewInit(): void {
  }

}
