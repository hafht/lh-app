import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HTTP_REQUEST_CONFIG_CONTEXT } from '../config.token';
import { ApiResponseMetadata } from '../type';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const reqConfig = req.context.get(HTTP_REQUEST_CONFIG_CONTEXT);
  if (reqConfig.isPublishAPI) {
    return next(req);
  }
  const authService = inject(AuthService);
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getAuthToken().access_token}`,
    },
  });
  // Pass the cloned request instead of the original request to the next handler
  return next(clonedRequest).pipe(
    //@ts-ignore
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        return handleResponseError(error, req, next, authService);
      }
      console.error('AuthInterceptor - Unhandled exception!');
      throwError(() => error);
    })
  );
}

function handleResponseError(
  error: HttpErrorResponse,
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService?: AuthService
) {
  const metaDataError = handleHttpStatusResponse(error.status);
  if (metaDataError?.code === 'HTTP-401') {
    return authService?.refreshToken()?.pipe(
      switchMap((newTokens) => {
        if (!newTokens) {
          return throwError(() => new Error('Cannot refresh token!'));
        }
        const retryRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${newTokens.access_token}`,
          },
        });
        return next(retryRequest);
      }),
      catchError((err) => {
        // Handle refresh token failure (e.g., logout)
        authService?.logout();

        return throwError(() => err);
      })
    );
  }
  return throwError(() => error);
}

function handleHttpStatusResponse(
  statusCode: number
): ApiResponseMetadata | null {
  if (statusCode === 0) {
    return {
      code: 'HTTP-0',
      message: `A client-side or network error occurred.`,
    };
  }
  if (statusCode === 403) {
    return {
      code: 'HTTP-403',
      message: `You don't have enough permission to perform this action`,
    };
  }
  if (statusCode === 406) {
    return {
      code: 'HTTP-406',
      message: `You don't have enough skill to perform this action`,
    };
  }
  if (statusCode === 401) {
    return {
      code: 'HTTP-401',
      message: `Unauthorize user, maybe you need to login again`,
    };
  }
  if (statusCode === 404) {
    return {
      code: 'HTTP-404',
      message: `Server API endpoint notfound, please contact technical supporter`,
    };
  }
  if (statusCode === 500) {
    return {
      code: 'HTTP-500',
      message: `Internal server error, please contact technical supporter`,
    };
  }
  return null;
}
