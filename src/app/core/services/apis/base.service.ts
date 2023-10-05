import { Injectable } from '@angular/core';
import { APP_CONFIG } from '@core/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from '../helper/storage.service';

interface IHeadersPairs {
  key: string;
  value: string;
}

interface IOptionsPairs {
  key: string;
  value: string;
}

@Injectable()
export class BaseService {
  errorSubject$: any = new BehaviorSubject(null);

  constructor(protected http: HttpClient, protected storageService: StorageService) {}

  protected getData<T>(
    path?: string,
    headersPairs?: IHeadersPairs[],
    queryParams?: HttpParams | { [key: string]: any }
  ): Observable<T> {
    const options = this.getHeaders(headersPairs);
    return this.http
      .get(`${this.getUrlApi()}/${path}`, {
        ...options,
        params: queryParams,
      })
      .pipe(
        map((res) => {
          return res as T;
        })
      );
  }

  protected postData<T, R>(
    path?: string,
    body?: R,
    headersPairs?: IHeadersPairs[],
    optionsPairs?: IOptionsPairs[],
    queryParams?: HttpParams | { [key: string]: any }
  ): Observable<T> {
    const headers = this.getHeaders(headersPairs);
    const options = this.getOptions(optionsPairs) || {};
    const params = queryParams;
    return this.http.post(`${this.getUrlApi()}/${path}`, body, {...headers, ...options, params}).pipe(
      map((res) => {
        return res as T;
      })
    );
  }

  protected putData<T, R>(
    path?: string,
    body?: R,
    headersPairs?: IHeadersPairs[]
  ): Observable<T> {
    const options = this.getHeaders(headersPairs);
    return this.http.put(`${this.getUrlApi()}/${path}`, body, options).pipe(
      map((res) => {
        return res as T;
      })
    );
  }

  protected delete(path?: string, headersPairs?: IHeadersPairs[], body?: any) {
    const options: any = this.getHeaders(headersPairs);
    if (body) {
      options.body = body;
    }
    return this.http.delete(`${this.getUrlApi()}/${path}`, options).pipe(
      map((res) => {
        return res;
      })
    );
  }

  protected request<T, R>(
    requestMethod: string,
    path: string,
    headerPairs?: IHeadersPairs[],
    body?: R
  ): Observable<T> {
    const options = {
      ...this.getHeaders(headerPairs),
      body: body,
    };
    return this.http
      .request(requestMethod, `${this.getUrlApi()}/${path}`, options)
      .pipe(
        map((res) => {
          return res as T;
        })
      );
  }

  private getUrlApi() {
    return APP_CONFIG.apiBaseUrl;
  }

  private getHeaders(headersPairs?: IHeadersPairs[]) {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    if (this.storageService.getTokenStorage()) {
      const token = this.storageService.getTokenStorage() || '';
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + token);
    }

    httpOptions.headers = httpOptions.headers.set(
      'Content-Type',
      'application/json'
    );

    httpOptions.headers = httpOptions.headers.set('responseType', 'text');

    if (headersPairs) {
      headersPairs.forEach((element: IHeadersPairs) => {
        httpOptions.headers = httpOptions.headers.set(
          element.key,
          element.value
        );
      });
    }
    return httpOptions;
  }

  private getOptions(optionsPairs?: IOptionsPairs[]) {
    const httpOptions: any = {};
    if (optionsPairs) {
      optionsPairs.forEach((element: IOptionsPairs) => {
        httpOptions[element.key] = element.value;
      });
    }
    return httpOptions;
  }
}
