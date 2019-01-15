import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormApiService } from '../services/formapi.service';
declare var $: any;

@Component({
  selector: 'app-profilestep1',
  templateUrl: './profilestep1.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfilestep1Component implements OnInit {

  isBuyer: boolean = false;
  UserName: string;
  Email: string;
  Model: any = {};
  isFormValid: boolean = true;
  coverimage: File;
  video: File;
  profileimage: File;
  coverimagefileIsValid: boolean;
  profileimagefileIsValid: boolean;
  vidoeimagefileIsValid: boolean;
  

  msgProfileImageError: string;
  msgCoverImageError: string;
  msgVideoError: string;


  constructor(private _userService: UserService,
    private formapiService: FormApiService,
    private _router: Router) { }
  places = [
    'India',
    'France'

  ];
  native_languages = [
    'English',
    'Hindi'
  ]
  ngOnInit() {

    if (localStorage.getItem('UserName') !== undefined && localStorage.getItem('UserName') !== null) {
      this.UserName = localStorage.getItem('UserName');
      this.Email = localStorage.getItem('Email');
    }
    this.Model = JSON.parse(localStorage.getItem('user'));

  }
  goto() {

    this._router.navigate(['user/profile-step2']);
  }

  onProfileFileChange(event) {
    let files = event.target.files;
    if (files.length > 0) {
      this.profileimage = files[0];
    }
    //check file is valid
    if (!this.validateFile(files[0].name, 'profile')) {
      return false;
    }
    else {
      this.profileimagefileIsValid = true;
    }

  }

  onCoverFileChange(event) {
    let files = event.target.files;
    if (files.length > 0) {
      this.coverimage = files[0];
    }
    //check file is valid
    if (!this.validateFile(files[0].name, 'cover')) {
      return false;
    }
    else {
      this.coverimagefileIsValid = true;
    }

  }
  onVideoFileChange(event) {
    let files = event.target.files;
    if (files.length > 0) {
      this.video = files[0];
    }
    //check file is valid
    if (!this.validateFile(files[0].name, 'vidoe')) {
      return false;
    }
    else {
      this.vidoeimagefileIsValid = true;
    }

  }

  validateFile(name: String, type: string) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (type == 'cover') {
      if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {
        return true;
      }
      else {
        this.coverimagefileIsValid = false;
        this.msgCoverImageError = "Please upload jpg or png file only";
        return false;
      }
    }
    if (type == 'profile') {
      if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {
        return true;
      }
      else {
        this.profileimagefileIsValid = false;
        this.msgProfileImageError = "Please upload jpg or png file only";
        return false;
      }
    }
    if (type == 'vidoe') {
      if (ext.toLowerCase() == 'mp4') {
        return true;
      }
      else {
        this.vidoeimagefileIsValid = false;
        this.msgVideoError = "Please upload vidoe file only mp4";
        return false;
      }
    }
  }

  onSubmit() {
    $("#preloader").show();
    console.log('Model = ', this.Model);
    //debugger;
    if (this.Model.first_name !== undefined && this.Model.first_name.length > 0
      && this.Model.last_name !== undefined && this.Model.last_name.length > 0) {

      this.isFormValid = true;
      let _formData: FormData = new FormData();
      _formData.append('id', this.Model.id);//localStorage['user_id']);
      _formData.append('email_id', this.Model.email_id);
      _formData.append('user_name', this.Model.user_name);
      _formData.append('password', this.Model.password);
      debugger;
      _formData.append('first_name', this.Model.first_name);
      _formData.append('last_name', this.Model.last_name);

      _formData.append('profileimage', this.profileimage);
      _formData.append('coverimage', this.coverimage);
      _formData.append('vidoes', this.video);

      
      _formData.append('Good_at', this.Model.Good_at);
      _formData.append('about', this.Model.about);
      _formData.append('mobile_code', this.Model.mobile_code);
      _formData.append('mobile_no', this.Model.mobile_no);

      _formData.append('country', this.Model.country);
      _formData.append('native_language', this.Model.native_language);

      var _url = `${environment.apiUrl}FileUpload/UpdateUser`;
      this.formapiService.post(_url, _formData).then((d) => {
        $("#preloader").show();
        console.log("success : ", d);
        if (d.status == "1") {
          window.location.href = `${environment.appurl}profile-step2`
          //this._router.navigate(['dashboard']);
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
          //setInterval(window.location.href = `${environment.appurl}profile-step2`, 9000)
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
