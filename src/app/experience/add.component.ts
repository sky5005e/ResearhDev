import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FormApiService } from '../services/formapi.service';
declare var $: any;


@Component({
  selector: 'app-addexp',
  templateUrl: './add.component.html',
  styleUrls: ['./experience.component.css']
})
export class AddExpComponent implements OnInit {

  isBuyer: boolean = false;

  Model: any = {};
  isFormValid: boolean = true;
  msgError: string;
  isLoading: boolean = false;
  file: File;
  fileIsValid: boolean;

  constructor(private _userService: UserService,
    private formapiService: FormApiService) { }

  ngOnInit() {

    //if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
    //this.isBuyer  = true;
    //}

  }

  onFileChange(event) {
    let files = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
    }
    //check file is valid
    if (!this.validateFile(files[0].name)) {
      return false;
    }
    else {
      this.fileIsValid = true;
    }

  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {
      return true;
    }
    else {
      this.fileIsValid = false;
      this.msgError = "Please upload jpg or png file only";
      return false;
    }
  }
  onSubmit() {
    $("#preloader").show();
    console.log('Model = ', this.Model);
    debugger;
    if (this.Model.title !== undefined && this.Model.title.length > 0
      && this.Model.url !== undefined && this.Model.url.length > 0) {

      this.isFormValid = true;
      let _formData: FormData = new FormData();
      _formData.append('user_id', localStorage['user_id']);
      _formData.append('title', this.Model.title);
      _formData.append('country', this.Model.country);
      _formData.append('image', this.file);
      _formData.append('url', this.Model.url);
      _formData.append('about', this.Model.about);
      _formData.append('explain', this.Model.explain);

      _formData.append('price', this.Model.price);
      _formData.append('sprice', this.Model.sprice);
      _formData.append('people', 'this.Model.people');
      _formData.append('hours', this.Model.hours);
      _formData.append('minet', this.Model.minet);
      _formData.append('category', this.Model.category);

      var _url = `${environment.apiUrl}?req=addexperiance`;
      this.formapiService.post(_url, _formData).then((d) => {
        $("#preloader").show();
        console.log("success : ", d);
        if (d.status == "1") {

          window.location.href = `${environment.appurl}dashboard`

          //this._router.navigate(['dashboard']);
        }
        else {
          $("#preloader").hide();
          alert(d.message);
        }
      });
    }
    else {
      this.isFormValid = false;
      console.log('Invalid form');
      $("#preloader").hide();
      return;
    }
  }

}


