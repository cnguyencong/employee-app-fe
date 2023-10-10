import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { MyCvComponent } from './my-cv/my-cv.component';
import { ProfileRightSidebarComponent } from './profile-right-sidebar/profile-right-sidebar.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileRoutingModule } from './profile-routing.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    ProfileDetailComponent,
    MyCvComponent,
    ProfileRightSidebarComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    PdfViewerModule
  ]
})
export class ProfileModule { }
