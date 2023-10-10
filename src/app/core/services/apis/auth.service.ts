import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LoginRequest } from '@core/types/models/request/auth'
import { LoginResponse } from '@core/types/models/response/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  login(request: LoginRequest) {
    return this.postData<LoginResponse, LoginRequest>('login', request)
  }
}
