import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { lumaWebShellRoutes } from '@creative-force/cf-app/luma-renderer/feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(lumaWebShellRoutes), 
   ],
};
