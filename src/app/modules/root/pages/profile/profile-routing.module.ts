import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { MyCvComponent } from './my-cv/my-cv.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "detail",
        component: ProfileDetailComponent,
      },
      {
        path: "my-cv",
        component: MyCvComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
