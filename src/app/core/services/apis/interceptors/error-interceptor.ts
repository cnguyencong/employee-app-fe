import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, catchError, combineLatestWith, from, switchMap, throwError } from 'rxjs';
import { HTTPStatus } from "@shared/constants/http";
import { STORAGE_KEY } from "@shared/constants/storage";

const Auth: any = {
  signOut: () => {},
  currentSession: () => {},
  currentAuthenticatedUser: () => {}
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
        .pipe(catchError((err: any) => {
          const error = {
            http_status: err?.status,
            errors: err?.error,
          }
          const isRemember = (localStorage.getItem(STORAGE_KEY.REMEMBER_ME) === 'true') ? true : false;
          switch(err?.status) {
            case HTTPStatus.GATEWAY_TIMEOUT:
              break;
            case HTTPStatus.UNAUTHORIZED:
              if (isRemember) {
                // Token expired, trigger token refresh
                return this.refreshToken().pipe(
                  switchMap(({ idToken }) => {
                    // Retry the original request with the new token
                    return next.handle(this.addTokenHeader(req, idToken.jwtToken));
                  }),
                  catchError((refreshError) => {
                    // Handle any errors during token refresh or retry
                    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
                    Auth.signOut();
                    return throwError(() => ({
                      http_status: err?.status,
                      errors: refreshError,
                    }));
                  })
                );
              } else {
                Auth.signOut();
              }
              break;
            default: 
              if (HTTPStatus.PROCESSING.includes(err?.status)) {
                localStorage.removeItem('token');
                location.reload();
              }
              break;
          }
          return throwError(() => error)
        }));
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    const authHeader = `Bearer ${token}`;
    return request.clone({
      setHeaders: { Authorization: authHeader },
    });
  }

  private refreshToken(): Observable<any> {
    return from(Auth.currentSession()).pipe(
      combineLatestWith(from(Auth.currentAuthenticatedUser())),
      switchMap(([currentSession, cognitoUser]: any) => {
        // Use the refresh token to get a new session
        return from(new Promise((resolve, reject) => {
          cognitoUser.refreshSession(currentSession.getRefreshToken(), (err: any, session: any) => {
            if (err) {
              reject(err)
            } else {
              resolve(session)
            }
          })
        }));
      })
    );
  }
}