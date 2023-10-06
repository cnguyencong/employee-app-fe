import { WebComponentWrapper, WebComponentWrapperOptions, startsWith } from "@angular-architects/module-federation-tools";
import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "simple-page",
    loadChildren: () => import("../../components/simple-page/simple-page.module").then((m) => m.SimplePageModule),
  },
  {
    path: "single-page",
    loadChildren: () => import("../../components/single-page/single-page.module").then((m) => m.SinglePageModule),
  },
  // {
  //   path: "auth",
  //   loadChildren: () => import('employee-app-auth/Module').then(m => m.AuthModule),
  // },
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
];
