import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/root/pages/home/home.component';
import { NotFoundComponent } from '@modules/root/pages/not-found/not-found.component';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { startsWith } from '@angular-architects/module-federation-tools';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('employee-app-auth/Module').then(m => m.AuthModule)
  },
  {
    matcher: startsWith('react'),
    component: WebComponentWrapper,
    data: {
      remoteEntry:
        'http://localhost:3001/remoteEntry.js',
      remoteName: 'employee-app-react',
      elementName: 'employee-app-react',
      exposedModule: './Module',
    } as WebComponentWrapperOptions,
  },
  {
    matcher: startsWith('vue'),
    component: WebComponentWrapper,
    data: {
      type: 'module',
      remoteEntry:
        'http://localhost:5001/assets/remoteEntry.js',
      remoteName: 'employee-app-vue',
      elementName: 'employee-app-vue',
      exposedModule: './Module',
    } as WebComponentWrapperOptions,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
