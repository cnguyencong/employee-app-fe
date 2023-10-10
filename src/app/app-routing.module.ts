import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/root/pages/home/home.component';
import { NotFoundComponent } from '@modules/root/pages/not-found/not-found.component';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { startsWith } from '@angular-architects/module-federation-tools';

import { ContentComponent } from "./shared/components/layout/content/content.component";
import { FullComponent } from "./shared/components/layout/full/full.component";
import { full } from "./shared/routes/full.routes";
import { auth, content } from "./shared/routes/routes";
import { NotLoginGuard } from '@core/routes/guards/not-login.guard'

const routes: Routes = [
  {
    path: "",
    redirectTo: "profile/detail",
    pathMatch: "full",
  },
  {
    path: "",
    component: ContentComponent,
    children: content
  },
  {
    path: "",
    children: auth,
    canActivate: [NotLoginGuard]
  },
  // {
  //   path: "",
  //   component: FullComponent,
  //   children: full
  // },
  {
    path: '**',
    component: NotFoundComponent,
  },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: "enabled",
    scrollPositionRestoration: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
