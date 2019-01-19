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
  getUserExperienceDetails(id) {
    return this._apiService.getNew(this.apiBaseUrl + 'api/experience/details/' + id);
  }
  getUserPaymentInfo(id) {
    return this._apiService.getNew(this.apiBaseUrl + 'api/user/paymentinfo/' + id);
  }
  emailLoginNew(data) {
    return this._apiService.postNew(this.apiBaseUrl + 'api/user/login', data)
  }
  socialLoginNew(data) {
    return this._apiService.postNew(this.apiBaseUrl + 'api/user/sociallogin', data)
  }


  signUpNew(data) {
    return this._apiService.postNew(this.apiBaseUrl + 'api/user/signup', data);
  }
  SavePaymentInfo(data) {
    return this._apiService.postNew(this.apiBaseUrl + 'api/user/paymentinfo', data);
  }
  getUserInfo(id) {
    return this._apiService.getNew(this.apiBaseUrl + 'api/user/' + id);
  }

  AddUserExperiences(data) {
    return this._apiService.postNew(this.apiBaseUrl + 'api/user/InsertUserExperiences', data);
  }
}
