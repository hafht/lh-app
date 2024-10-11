import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {HTTP_REQUEST_CONFIG_CONTEXT} from "../config.token";


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const reqConfig = req.context.get(HTTP_REQUEST_CONFIG_CONTEXT);
  if (reqConfig.isPublishAPI) {
    return next(req)
  }
  const authToken = inject(AuthService).getAuthToken()
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken.access_token}`
    }
  })
  // Pass the cloned request instead of the original request to the next handler
  return next(clonedRequest)
}
