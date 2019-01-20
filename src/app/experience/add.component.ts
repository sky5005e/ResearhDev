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
  categories = [];
  places = [];
  days = [];
  months = [];
  times = [];
  constructor(private _userService: UserService,
    private formapiService: FormApiService) { }

  ngOnInit() {

    //if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
    //this.isBuyer  = true;
    //}
    this.categories = [
      'Yoga',
      'Cooking',
      'Para Gliding',
      'Mountain Biking',
      'Cycling',
      'Sky Diving',
      'Paris Walk',
      'London Bridge History',
      'Yoga',
      'Cooking',
      'Para Gliding',
      'Mountain Biking',
      'Cycling',
      'Sky Diving',
      'Paris Walk',
      'London Bridge History',
    ];
    this.places = [
      'London',
      'New York',
      'Budapest',
      'Dubai',
      'Birmingham',
      'Sydney',
      'Paris',
      'Switzerland'

    ];
    for (var i = 1; i <= 31; i++) {
      this.days.push(i);
    }
    for (var j = 1; j <= 12; j++) {
      this.months.push(j);
    }
    for (var k = 0; k < 24; k++) {
      if (k < 10) {
        let timeslots1 = `0${k} : 00`;
        this.times.push(timeslots1);
      }
      else {
        let timeslots1 = `${k} : 00`;
        this.times.push(timeslots1);
      }
      let timeslots2 = `${k} : 30`;
      this.times.push(timeslots2);

    }
  }
  urls = [];
  onFileChange(event) {
    this.urls = [];
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
    if (this.fileIsValid) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
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
      _formData.append('files', this.file);
      _formData.append('url', this.Model.url);
      _formData.append('about', this.Model.about);
      _formData.append('explain', this.Model.explain);

      _formData.append('price', this.Model.price);
      _formData.append('sprice', this.Model.sprice);
      _formData.append('people', this.Model.person);
      _formData.append('hours', this.Model.hours);
      _formData.append('minutes', this.Model.minutes);
      _formData.append('category', this.Model.category);

      _formData.append('year', this.Model.year);
      _formData.append('month', this.Model.month);
      _formData.append('day', this.Model.day);
      _formData.append('time', '10');//this.Model.time);
      _formData.append('custom', 'true')//this.Model.custom);

      //debugger;
      var _url = `${environment.apiUrl}FileUpload/addExp`;//api/experience`;//FileUpload/addExp`;
      this.formapiService.post(_url, _formData).then((d) => {
        $("#preloader").show();
        debugger;
        console.log("success : ", d);
        if (d.status == "1") {
          //window.location.href = `${environment.appurl}dashboard`
          //this._router.navigate(['dashboard']);
          alert("Thanks for creating an Experience with Bukkzy");
        }
        else {
          $("#preloader").hide();
          alert(d.message);
        }
      })
        .fail(function (xhr, status, error) {          // error handling
          console.log('error handling', error);

          $("#preloader").hide();
          console.log('error handling status', status);
          console.log('error handling xhr', xhr);
          alert("Thanks for creating an Experience with Bukkzy");
        }

        );
    }
    else {
      this.isFormValid = false;
      console.log('Invalid form');
      $("#preloader").hide();
      return;
    }
  }

}


