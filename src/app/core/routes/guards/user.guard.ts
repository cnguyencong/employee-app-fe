import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserRole } from '@shared/enums/user-role';
import { UserService } from '@shared/services/user/user.service';

@Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser: any = this.userService.getProfileChanged();
    const { ADMIN } = UserRole;
    if ([ADMIN].includes(currentUser?.role)) {
      this.router.navigate(['/admin/dashboard']);
    }
    return true;
  }
}
