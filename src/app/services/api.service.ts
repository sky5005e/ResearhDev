import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpResponse} from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  customHeaders = new HttpHeaders();
  constructor(private _http: HttpClient) { }

  post(url, data) {
    this.customHeaders.append('Content-Type', 'application/json');
    this.customHeaders.append("Access-Control-Allow-Origin", "*");
    return this._http.post(url, data, {headers: this.customHeaders}).pipe(
      map((res: Response) => { return res;})
    );
  }

  get(url) {
    this.customHeaders.append('Content-Type', 'application/json');
    this.customHeaders.append("Access-Control-Allow-Origin", "*");
    return this._http.get(url, {headers: this.customHeaders}).pipe(
      map((res: Response) => { return res;})
    );
  }

  postNew(url, data){
    this.customHeaders.append('Content-Type', 'application/json');
    this.customHeaders.append("Access-Control-Allow-Origin", "*");
    return this._http.post(url, data, {headers: this.customHeaders}).pipe(
      map((res: any) => { return res;})
    );
  }

  getNew(url) {
    this.customHeaders.append('Content-Type', 'application/json');
    this.customHeaders.append("Access-Control-Allow-Origin", "*");
    return this._http.get(url, {headers: this.customHeaders}).pipe(
      map((res: any) => { return res;})
    );
  }
}
