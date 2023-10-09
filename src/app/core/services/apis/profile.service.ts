import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import {
  ProfileDetailResponse
} from '@core/types/models/response/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService {

  fetchProfileDetail() {
    return this.getData<ProfileDetailResponse>('profileDetail')
  }
}
