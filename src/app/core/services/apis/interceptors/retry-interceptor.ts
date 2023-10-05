import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { retry, tap } from 'rxjs';
import { genericRetryStrategy } from '@shared/tools/utils/rxjs-utils';
import { HTTPMethod, HTTPStatus } from "@shared/constants/http";
import { BaseService } from "../base.service";

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor(
    private baseService: BaseService,
    ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method === HTTPMethod.GET) {
      return next.handle(req).pipe(
        retry(genericRetryStrategy({ excludedStatusCodes: [HTTPStatus.UNAUTHORIZED], errorSubject$: this.baseService.errorSubject$ })),
        tap(({ type, status }: any) => {
          if (type > 0 && status === HTTPStatus.OK) {
            this.baseService.errorSubject$.next(null)
          }
        })
      );
    }
    return next.handle(req);
  }
}