import {HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {HTTP_REQUEST_CONFIG_CONTEXT} from "../config.token";

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const reqConfig = req.context.get(HTTP_REQUEST_CONFIG_CONTEXT);
  if (!reqConfig.isLoggingEnabled) {
    return next(req);
  }
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(`[HttpInterceptor] ${req.method.toUpperCase()} - ${event.status} - ${req.url}`);
    }
  }));
}
