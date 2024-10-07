import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@creative-force/cf-app-web/data-access";

export const authGuardFunction: CanActivateFn = (next:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const auth = inject(AuthService)
  if (!auth.isAuthenticated()) {
    router.navigateByUrl('/app/login')
  }
  return auth.isAuthenticated()
}
