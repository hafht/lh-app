import { EnvironmentProviders, provideExperimentalZonelessChangeDetection, Provider } from '@angular/core';
import {
  authInterceptor,
  CFHttpClient,
  HTTP_CLIENT_CONFIG_TOKEN,
  loggingInterceptor
} from "@creative-force/cf-app-web/common";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";

export const lumaAppProviders: (Provider | EnvironmentProviders)[] = [
  {
    provide: HTTP_CLIENT_CONFIG_TOKEN, useValue: {
      'x-app-id': 5,
      'x-screen-id': 5100
    }
  },
  provideExperimentalZonelessChangeDetection(),
  provideHttpClient(
    withFetch(),
    withInterceptors([
      loggingInterceptor,
      authInterceptor,

    ])
  ),
  CFHttpClient
]

