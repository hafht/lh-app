import {Component, inject} from "@angular/core";
import {AuthService} from "@creative-force/cf-app-web/data-access";
import {Router} from "@angular/router";

@Component({
  selector: 'cf-app-luma-project',
  standalone: true,
  template: `
    <div class="h-screen">
      <div class="">
        <h1 class="text-white text-2xl p-5">Luma project</h1>
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
  `
})
export class LumaProjectPageComponent {
  private auth = inject(AuthService)
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/app/login')
  }
}
