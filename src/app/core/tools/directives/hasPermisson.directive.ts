// /* eslint-disable @angular-eslint/directive-selector */
// import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
// import { UserService } from '@shared/services/user/user.service';
// import { UserModel } from '@shared/models/user/user.model';

/*
- Example:
    <ng-container *hasPermission="['can_write']">
        <div (click)="removeComment(form.value.id)" class="remove-btn">
        <img src="assets/images/icons/dark-mode/ic_trash.svg" alt=""/>
        </div>
    </ng-container>
*/

// @Directive({
//     selector: '[hasPermission]'
// })
// export class HasPermissionDirective implements OnInit {
//     private currentUser: UserModel | null;
//     private permissions: string[] = [];
//     private logicalOp = 'AND';
//     private isHidden = true;

//     constructor(
//         private element: ElementRef,
//         private templateRef: TemplateRef<any>,
//         private viewContainer: ViewContainerRef,
//         private userService: UserService
//     ) {
//         this.currentUser = this.userService.getProfileChanged();
//     }

//     ngOnInit() {
//         this.currentUser = this.userService.getProfileChanged();
//         this.updateView();
//     }

//     @Input()
//     set hasPermission(val: any) {
//         this.permissions = val;
//         this.updateView();
//     }

//     @Input()
//     set hasPermissionOperation(permop: any) {
//         this.logicalOp = permop;
//         this.updateView();
//     }

//     private updateView() {
//         if (this.checkPermission()) {
//             if (this.isHidden) {
//                 this.viewContainer.createEmbeddedView(this.templateRef);
//                 this.isHidden = false;
//             }
//         } else {
//             this.isHidden = true;
//             this.viewContainer.clear();
//         }
//     }

//     private checkPermission() {
//         let hasPermission = false;
//         if (this.currentUser && this.currentUser.permissions) {
//             for (const checkPermission of this.permissions) {
//                 const permissionFound = this.currentUser.permissions.find(x => x.toUpperCase() === checkPermission.toUpperCase());
//                 if (permissionFound) {
//                     hasPermission = true;
//                     if (this.logicalOp === 'OR') {
//                         break;
//                     }
//                 } else {
//                     hasPermission = false;
//                     if (this.logicalOp === 'AND') {
//                         break;
//                     }
//                 }
//             }
//         }

//         return hasPermission;
//     }
// }