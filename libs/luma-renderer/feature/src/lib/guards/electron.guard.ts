import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";

export const electronGuardFunction: CanActivateFn = (next:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  if (!window.CFAppAPI) {
    router.navigateByUrl('/not-available')
  }
  return !!window.CFAppAPI
}
