import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormApiService } from '../services/formapi.service';
import { Subject } from 'rxjs';
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

  myphotosFiles: File[] = [];
  myvideosFiles: File[] = [];

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

      //this.Model = JSON.parse(localStorage.getItem('user'));
      let id = localStorage.getItem('user_id')
      this.loadUserInfo(id);

      this.LoadUserExpereinces(id);
      this.LoadUserDocuments(id);

      this.LoadExperiences();

    }

  }

  ExperiencesList: any[] = [];
  data$ = new Subject<any>();

  LoadExperiences() {
    this._userService.getUserExperienceNew().subscribe(data => {
      console.log('user experience = ', data);
      if (data.status == "1") {
        this.data$.next(data.content);
        //  this.ExperiencesList = data.content;
        //this.data$.next(this.experienceList.filter(_q => _q.title.toLowerCase().includes(searchText.toLowerCase())));
        // console.log(this.data$.hasError, 'this data$')
      }
    });
  }
  AddUserExperience(expid) {
    let expModel: any = {};
    expModel.user_id = this.Model.id;
    expModel.experience_id = expid;

    this._userService.AddUserExperiences(expModel).subscribe(d => {
      console.log(d.content, 'AddUserExperience');
    });
  }

  goto() {

    this._router.navigate(['user/profile-step2']);
  }
  loadUserInfo(userId) {
    this._userService.getUserInfo(userId).subscribe(data => {
      console.log('user info = ', data);
      debugger;
      if (data.status == "1") {
        this.Model = data.content;
      }
      else {
        console.log('No record found');
      }
      $("#preloader").hide();
      debugger;
      console.log(this.Model);
    });
  }
  ProfileUrls = new Array<string>();
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
    this.ProfileUrls = [];
    if (this.profileimagefileIsValid) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.ProfileUrls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }

  }
  CoverUrls = new Array<string>();

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
    this.CoverUrls = [];
    if (this.coverimagefileIsValid) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.CoverUrls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }


  }
  videoUrls = new Array<string>();
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
    //if (this.vidoeimagefileIsValid) {
    // var $source = $('#video_here');
    // $source[0].src = URL.createObjectURL(files[0]);
    // $source.parent()[0].load();
    //}
    this.videoUrls = [];
    if (this.vidoeimagefileIsValid) {
      this.myvideosFiles = files;
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.videoUrls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
      //this.SaveFiles('myvidoes');
    }
  }

  myphotosimageIsValid: boolean;
  myphotosimageImageError: string;
  myphotosimageUrls = new Array<string>();

  onmyphotosimageChange(event) {
    let files = event.target.files;

    let myphotos = files;
    if (files.length > 0) {
      this.coverimage = files[0];
    }
    //check file is valid
    if (!this.validateFile(files[0].name, 'cover')) {
      return false;
    }
    else {
      this.myphotosimageIsValid = true;
    }
    this.myphotosimageUrls = [];
    if (this.myphotosimageIsValid) {
      this.myphotosFiles = files;

      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.myphotosimageUrls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
      this.SaveFiles('myphotos');
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
    if (type == 'myphotos') {
      if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {
        return true;
      }
      else {
        this.myphotosimageIsValid = false;
        this.myphotosimageImageError = "Please upload jpg or png file only";
        return false;
      }
    }
    if (type == 'vidoe') {
      if (ext.toLowerCase() == 'mp4' || ext.toLowerCase() == '3gp') {
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
    debugger;

    for (let file of this.myvideosFiles) {
      this.SaveVidoesFiles(file);
    }

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
      //_formData.append('vidoes', this.video);
      _formData.append('Good_at', this.Model.Good_at);
      _formData.append('about', this.Model.about);
      _formData.append('mobile_code', this.Model.mobile_code);
      _formData.append('mobile_no', this.Model.mobile_no);

      _formData.append('country', this.Model.country);
      _formData.append('native_language', this.Model.native_language);

      var _url = `${environment.apiUrl}FileUpload/UpdateUser`;
      this.formapiService.post(_url, _formData).then((d) => {
        $("#preloader").show();
        debugger;
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
          setInterval(window.location.href = `${environment.appurl}profile-step2`, 9000)
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

  SaveVidoesFiles(file: File) {
    let _formData: FormData = new FormData();
    _formData.append('user_id', this.Model.id);//localStorage['user_id']);
    _formData.append('files', file);
    _formData.append('doc_type', 'myvidoes');
    var _url = `${environment.apiUrl}FileUpload/UserDocuments`;
    this.formapiService.post(_url, _formData).then((d) => {
      console.log("success : ", d);
      if (d.status == "1") {
      }
      else {
        console.log(d.message);
      }
    })
      .fail(function (xhr, status, error) {          // error handling
        console.log('error handling status', status);
        console.log('error handling xhr', xhr);
      }
      );
  }

  SaveFiles(type) {
    let _formData: FormData = new FormData();
    _formData.append('user_id', this.Model.id);//localStorage['user_id']);
    if (type == 'myphotos') {
      for (let file of this.myphotosFiles) {
        _formData.append('files', file);
      }
    }
    else {
      // for videos
      for (let file of this.myvideosFiles) {
        _formData.append('files', file);
      }
    }

    _formData.append('doc_type', type);
    var _url = `${environment.apiUrl}FileUpload/UserDocuments`;
    this.formapiService.post(_url, _formData).then((d) => {
      console.log("success : ", d);
      if (d.status == "1") {

      }
      else {

        console.log(d.message);
      }
    })
      .fail(function (xhr, status, error) {          // error handling
        console.log('error handling status', status);
        console.log('error handling xhr', xhr);
      }
      );
  }
  UserExpreincesModelsOffers: any[];
  LoadUserExpereinces(id) {
    this._userService.getUserExperiences(id).subscribe(d => {
      if (d.status == "1") {
        this.UserExpreincesModelsOffers = d.content;
      }
    })
  }
  UserPhotosDocuemnts: any[];
  UserVidoesDocuemnts: any[];
  LoadUserDocuments(id) {
    this._userService.getUserDocuments(id).subscribe(d => {
      console.log(d.content, "user Docuemnts ")
      if (d.status == "1") {
        let Docuemnts = d.content;
        this.UserPhotosDocuemnts = Docuemnts.filter(q => q.doc_type.toLowerCase().includes('myphotos'));
        this.UserVidoesDocuemnts = Docuemnts.filter(q => q.doc_type.toLowerCase().includes('myvidoes'));
      }
    })
  }
}
