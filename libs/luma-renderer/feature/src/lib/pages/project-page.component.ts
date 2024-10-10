import {Component, inject, signal} from "@angular/core";
import {AuthService} from "@creative-force/cf-app-web/common";
import {Router} from "@angular/router";
import {CFHttpClient, HTTP_REQUEST_CONFIG_CONTEXT} from "@creative-force/cf-app/web/http-client";
import {HttpContext} from "@angular/common/http";

@Component({
  selector: 'cf-app-luma-project',
  standalone: true,
  template: `
    <div class="h-screen">
      <div class="">
        <h1 class="text-white text-2xl p-5">Hi {{userInfo().name}} !</h1>
        <p class="text-center">
          <button class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            (click)="logout()"
          >
            Logout
          </button>
        </p>
      </div>
    </div>
  `,
})
export class LumaProjectPageComponent {
  private auth = inject(AuthService)
  private router = inject(Router);
  private cfHttpClient = inject(CFHttpClient)

  userInfo = signal<{name: string}>({name: ''})

  ngAfterViewInit() {
    this.cfHttpClient.get('https://api.creativeforce-uat.io/contact/v2/user', {
      context: new HttpContext().set(HTTP_REQUEST_CONFIG_CONTEXT, {
        isCached: true
      })
    }).subscribe(res => {
      const apiRes = {...res} as any
      console.log('res api', apiRes.data)
      this.userInfo.set({
        name: apiRes.data.name
      })
    })
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/app/login')
  }
}

// apiUrl: "https://api.creativeforce-uat.io",
