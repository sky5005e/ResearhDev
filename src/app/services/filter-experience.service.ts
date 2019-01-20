import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FilterExpService {

  apiBaseUrl = environment.apiUrl;
  constructor(private _apiService: ApiService) { }

  getFilterExperience(cities, categories) {
    return this._apiService.getNew(this.apiBaseUrl + `api/experience/search?cities=${cities}&categories=${categories}`);
  }

}
