import {ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot} from '@angular/router';
import {PageNotAvailableComponent, PageNotFoundComponent} from '@creative-force/cf-app-web-component';
import { LoadingPageComponent, LoginPageComponent } from '@creative-force/cf-app-web/features';
import {electronGuardFunction} from "./guards/electron.guard";

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
    component: LoginPageComponent, pathMatch: 'full',
    // children: [
    //   {
    //     path: 'login', component: LoginPageComponent, pathMatch: 'full'
    //   },
    // ],
    canActivate: [electronGuardFunction]
  },
  ...commonWebRoutes,
];


