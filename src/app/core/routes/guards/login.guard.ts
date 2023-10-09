import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@shared/services/user/user.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.getIsLoggedIn()) {
      return true;
    }

    this.router.navigate(['/authentication/login']);
    return false;
  }
}
