import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "@shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { APP_CONFIG } from '@core/config';
import { APP_CONFIG_TOKEN } from '@core/services/token';

// // for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { NgxsModule } from '@ngxs/store';
import { TodoState } from '@modules/root/store/states/todo';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { httpInterceptorProviders } from '@core/services/apis/interceptors';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    NgxsModule.forRoot([TodoState], {
      developmentMode: !APP_CONFIG.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: APP_CONFIG.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: APP_CONFIG.production,
    }),
    
//     // for HttpClient use:
    LoadingBarHttpClientModule,
//     // for Router use:
    LoadingBarRouterModule,
//     // for Core use:
    LoadingBarModule,
  ],
  providers: [
    ...httpInterceptorProviders,
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

