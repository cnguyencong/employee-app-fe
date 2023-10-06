import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/root/pages/home/home.component';
import { NotFoundComponent } from '@modules/root/pages/not-found/not-found.component';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { startsWith } from '@angular-architects/module-federation-tools';

import { ContentComponent } from "./shared/components/layout/content/content.component";
import { FullComponent } from "./shared/components/layout/full/full.component";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/routes";

const routes: Routes = [
  {
    path: "",
    redirectTo: "simple-page/first-page",
    pathMatch: "full",
  },
  {
    path: "",
    component: ContentComponent,
    children: content

  },
  {
    path: "",
    component: FullComponent,
    children: full
  },
  {
    path: 'auth',
    component: ContentComponent,
    loadChildren: () => import('employee-app-auth/Module').then(m => m.AuthModule)
  },
  // {
  //   matcher: startsWith('react'),
  //   component: WebComponentWrapper,
  //   data: {
  //     remoteEntry:
  //       'http://localhost:3001/remoteEntry.js',
  //     remoteName: 'employee-app-react',
  //     elementName: 'employee-app-react',
  //     exposedModule: './Module',
  //   } as WebComponentWrapperOptions,
  // },
  // {
  //   matcher: startsWith('vue'),
  //   component: WebComponentWrapper,
  //   data: {
  //     type: 'module',
  //     remoteEntry:
  //       'http://localhost:5001/assets/remoteEntry.js',
  //     remoteName: 'employee-app-vue',
  //     elementName: 'employee-app-vue',
  //     exposedModule: './Module',
  //   } as WebComponentWrapperOptions,
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
