import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  getTokenStorage() {
    const cookie = this.document.cookie;
    const cookieArr = cookie.split(';').map((c) => c.trim());
    const tokenCookie = cookieArr.find((c) => c.startsWith('token='));
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      return token;
    }

    return '';
  }

  setTokenStorage(token: string, exp?: number | Date) {
    let expires = new Date();
    if (exp) {
      expires = exp instanceof Date ? exp : new Date(exp * 1000);
    } else {
      expires.setDate(expires.getDate() + 1);
    }

    this.document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
  }

  removeTokenStorage() {
    this.document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
