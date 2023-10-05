import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserRole } from '@shared/enums/user-role';
import { UserService } from '@shared/services/user/user.service';

@Injectable({providedIn: 'root'})
export class GuestGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser: any = this.userService.getProfileChanged();
    const { ANONYMOUS } = UserRole;
    if ([ANONYMOUS].includes(currentUser?.role)) {
      const isStudyEdit = route?.routeConfig?.path === 'study-edit' && !!route.queryParamMap.get('study_id');
      if (!isStudyEdit) {
        this.router.navigateByUrl(`/study-edit?study_id=${currentUser.studyId}`);
      }
    }
    return true;
  }
}
