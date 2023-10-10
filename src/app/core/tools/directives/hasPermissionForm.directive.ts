// /* eslint-disable @angular-eslint/directive-selector */
// import { Directive, ElementRef, Input, OnChanges, Optional, Renderer2, Self, SimpleChanges } from '@angular/core';
// import { UserService } from '@shared/services/user/user.service';
// import { UserModel } from '@shared/models/user/user.model';
// import { NgControl } from '@angular/forms';

/*
- Example:
    <input
        type="text"
        matInput
        formControlName="date"
        (focus)="handleTogglePicker($event)"
        data-area="picker"
        readonly
        [hasPermissionForm]="['can_write']"
    />
*/

// @Directive({
//     selector: '[hasPermissionForm]'
// })
// export class HasPermissionFormDirective implements OnChanges {
//     @Input() hasPermissionForm: string[] = [];

//     private currentUser: UserModel | null;

//     constructor(
//         private el: ElementRef,
//         private userService: UserService,
//         private ngControl: NgControl,
//         private renderer2: Renderer2,
//     ) {
//         this.currentUser = this.userService.getProfileChanged();
//     }

//     ngOnChanges(changes: SimpleChanges): void {
//         if (changes['hasPermissionForm'] && this.ngControl?.control) {
//             this.updateView();
//         }
//     }

//     private updateView() {
//         if (this.checkPermission()) {
//             if (this.ngControl.control?.disabled) {
//                 this.ngControl.control?.enable();
//                 if (this.el.nativeElement.getAttribute('type') === 'hidden') {
//                     const controlElm = document.querySelector(`#${this.ngControl.name}`);
//                     this.renderer2.removeClass(controlElm, 'disabled');
//                 }
//             }
//         } else {
//             this.ngControl.control?.disable();
//             if (this.el.nativeElement.getAttribute('type') === 'hidden') {
//                 const controlElm = document.querySelector(`#${this.ngControl.name}`);
//                 this.renderer2.addClass(controlElm, 'disabled');
//             }
//         }
//     }

//     private checkPermission() {
//         let hasPermission = false;
//         if (this.currentUser && this.currentUser.permissions) {
//             for (const checkPermission of this.hasPermissionForm) {
//                 const permissionFound = this.currentUser.permissions.find(x => x.toUpperCase() === checkPermission.toUpperCase());
//                 if (permissionFound) {
//                     hasPermission = true;
//                 } else {
//                     hasPermission = false;
//                 }
//             }
//         }

//         return hasPermission;
//     }
// }