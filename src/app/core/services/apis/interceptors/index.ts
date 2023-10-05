import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RetryInterceptor } from "./retry-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { BaseService } from "../base.service";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  BaseService,
  { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
