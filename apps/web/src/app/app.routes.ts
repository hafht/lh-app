import { Route } from '@angular/router';
import { LoadingPageComponent, LoginPageComponent } from '@creative-force/cf-app-web/features';

export const appRoutes: Route[] = [
  {
    path: '', component: LoadingPageComponent,
  },
  {
    path: 'app',
    component: LoginPageComponent, pathMatch: 'full'
    // children: [
    //   {
    //     path: 'login', component: LoginPageComponent, pathMatch: 'full'
    //   },
    // ],
  }
];
