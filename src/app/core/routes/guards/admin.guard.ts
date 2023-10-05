import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserRole } from '@shared/enums/user-role';
import { UserService } from '@shared/services/user/user.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser: any = this.userService.getProfileChanged();
    const { EXPERT } = UserRole;
    if ([EXPERT].includes(currentUser?.role)) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
