import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { map } from "rxjs";
import { Util } from "@shared/tools/utils/util";

@Injectable()
export class UTF8Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            event = event.clone({body: this.decodeUTF8Body(event.body)});
        }
        return event;
    }));
  }

  private decodeUTF8Body(body: any) {
    const json = JSON.stringify(body);
    const decode = Util.decodeUTF8(json);
    const result = JSON.parse(decode);
    return result;
  }
}