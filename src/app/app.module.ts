import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG } from '@core/config';
import { APP_CONFIG_TOKEN } from '@core/services/token';
import { TodoState } from '@modules/root/store/states/todo';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { httpInterceptorProviders } from '@core/services/apis/interceptors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([TodoState], {
      developmentMode: !APP_CONFIG.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: APP_CONFIG.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: APP_CONFIG.production,
    }),
  ],
  providers: [
    ...httpInterceptorProviders,
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
