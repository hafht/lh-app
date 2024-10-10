import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import { LoggerService, } from '@creative-force/cf-app-web/common';
import {filter} from "rxjs";
@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private _logger = inject(LoggerService)
  private  router = inject(Router)
  ngAfterViewInit(): void {
    // this.router.events
    //   .pipe(filter((e) => e instanceof NavigationEnd))
    //   .subscribe(e => {
    //   console.log(e)
    // })
  }

}
