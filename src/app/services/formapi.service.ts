import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class FormApiService {

  customHeaders = new HttpHeaders();
  constructor(private _http: HttpClient) { }

  post(url, formData) {
    return $.ajax({
      type: "POST",
      url: url,
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      timeout: 600000,
      success: function (data) {
        console.log(data, 'success');
        return data;
      },
      error: function (e) {
        console.log(e, 'error');
        return e;
      }
    });

  }
}
