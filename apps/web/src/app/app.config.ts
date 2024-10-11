import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {lumaAppProviders, lumaWebShellRoutes} from '@creative-force/cf-app/luma-renderer/feature';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(lumaWebShellRoutes),
    ...lumaAppProviders, provideAnimationsAsync()
   ],
};
