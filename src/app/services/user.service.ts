import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiBaseUrl = environment.apiUrl;
  constructor(private _apiService: ApiService) { }
/*
  emailLogin(data) {
    return this._apiService.post(this.apiBaseUrl + '?req=login', data)
  }

  FBLogin() {
    return this._apiService.post(this.apiBaseUrl + '?req=socialmedia', {})
  }

  signUp(data) {
    return this._apiService.post(this.apiBaseUrl + '?req=registration', data);
  }
*/
  getUserExperience() {
    return this._apiService.get(this.apiBaseUrl + '?req=listexperiance');
  }

  getUserExperienceNew() {
    return this._apiService.getNew(this.apiBaseUrl + 'api/experience');
  }
  
  emailLoginNew(data) {
    return this._apiService.postNew(this.apiBaseUrl + 'api/user/login', data)
  }

  signUpNew(data) {
    return this._apiService.postNew(this.apiBaseUrl + 'api/user/signup', data);
  }
  
}
