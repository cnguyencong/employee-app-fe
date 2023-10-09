import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '@modules/root/store/states/auth'

@Injectable({providedIn: 'root'})
export class NotLoginGuard implements CanActivate {
  constructor(private router: Router, private store: Store) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);
    if (isLoggedIn) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
