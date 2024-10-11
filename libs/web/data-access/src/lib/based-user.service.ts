import { inject, Injectable, signal } from '@angular/core';
import { CFHttpClient, HTTP_REQUEST_CONFIG_CONTEXT } from '@creative-force/cf-app-web/common';
import { HttpContext } from '@angular/common/http';
import { concat, map, merge, of, tap } from 'rxjs';
import { toObservableSignal } from 'ngxtension/to-observable-signal';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { MyUserInfo } from '@creative-force/cf-app-types';

@Injectable({providedIn: 'root'})
export class BasedUserService {
  private cfHttpClient = inject(CFHttpClient)
  private storedMyUserInfo = injectLocalStorage<MyUserInfo>('userInfo')
  myUser = toObservableSignal(signal<MyUserInfo>(this.storedMyUserInfo() || {} as any))

  getMyUserInfo() {
    return concat(
      of(this.myUser()),
      this.cfHttpClient.get<MyUserInfo>('https://api.creativeforce-uat.io/contact/v2/user', {
        context: new HttpContext().set(HTTP_REQUEST_CONFIG_CONTEXT, {
          isCached: true
        })
      }).pipe(
        tap(res => {
          if (!res.data) {
            return;
          }
          this.myUser.set(res.data)
          this.storedMyUserInfo.set({
            ...res.data,
            name: 'Stored ' + res.data.name
          })
        }),
        map(res => res.data)
      )
    )
  }
}
