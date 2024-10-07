import {ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot} from '@angular/router';
import {PageNotAvailableComponent, PageNotFoundComponent} from '@creative-force/cf-app-web-component';
import { LoadingPageComponent, LoginPageComponent } from '@creative-force/cf-app-web/features';
import {electronGuardFunction} from "./guards/electron.guard";
import {LumaProjectPageComponent} from "./pages/project-page.component";
import {authGuardFunction} from "./guards/auth.guard";

export const commonWebRoutes: Route[] = [

  {
    path: 'not-available', component: PageNotAvailableComponent, title: 'Not Available'
  },
  {
    path: '**', component: PageNotFoundComponent, title: 'Page Not Found',
  },
]

export const lumaWebShellRoutes: Route[] = [
  { path: '', component: LoadingPageComponent, canActivate: [electronGuardFunction] },
  {
    path: 'app',
    children: [
      {
        path: '',
        redirectTo: 'project',
        pathMatch: 'full'
      },
      {
        path: 'login', component: LoginPageComponent
      },
      {
        path: 'project', component: LumaProjectPageComponent, canActivate: [authGuardFunction]
      }
    ],
    canActivate: [electronGuardFunction],

  },
  ...commonWebRoutes,
];


