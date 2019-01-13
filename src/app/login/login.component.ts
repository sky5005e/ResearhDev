import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormApiService } from '../services/formapi.service';
import { ApiService } from '../services/api.service';
declare var $: any;

//declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: any = {};
  isFormValid: boolean = true;
  user: SocialUser;

  constructor(private socialAuthService: AuthService,
    private route: ActivatedRoute,
    private _router: Router,
    private userService: UserService,
    private formapiService: FormApiService,
    private apiservice : ApiService
  ) {
    //   gapi.load('auth2', function () {
    //     gapi.auth2.init()
    //  });
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  loginWithFacebook() {
    console.log(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
      console.log('userData = ', userData);
    })
  }

  loginWithGmail() {
    console.log('click login gmail');

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // let googleAuth = gapi.auth2.getAuthInstance();
    // googleAuth.then(() => {
    //    googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
    //       console.log(googleUser.getBasicProfile());
    //    });
    // });

    // console.log('click login');    

    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData => {
    //    console.log('userData = ',  userData);
    // })
  }

  login() {

    $("#preloader").show();
    console.log('loginModel = ', this.loginModel);
    // debugger;
    if (this.loginModel.email_id !== undefined && this.loginModel.email_id.length > 0 && this.loginModel.password !== undefined && this.loginModel.password.length > 0) {

      this.isFormValid = true;
      let _formData: FormData = new FormData();
      _formData.append('email_id', this.loginModel.email);
      _formData.append('password', this.loginModel.password);
     // var _url = `${environment.apiUrl}?req=login`;
      var _url = `${environment.apiUrl}api/user/login`;
     
      // $.ajax({
      //   type: "POST",
      //   url: _url,
      //   data: _formData,
      //   cache: false,
      //   processData: false,
      //   contentType: false,
      //   timeout: 600000,

      //   success: function (data) {
      //     return data;
      //   },
      //   error: function (e) {
      //     return e;
      //   }
      // })
      //this.formapiService.post(_url, _formData).then(
        this.userService.emailLoginNew(this.loginModel).subscribe(
        d => {
        $("#preloader").show();
        console.log("success : ", d);
        if (d.status == "1") {

          window.localStorage['UserName'] = d.content.first_name + '' + d.content.last_name;
          window.localStorage['user_id'] = d.content.id;
          window.localStorage['email_id'] = d.content.email_id;
          window.localStorage['type'] = d.content.type;
          //window.location.href = `${environment.appurl}dashboard`

          //this._router.navigate(['dashboard']);
          localStorage.setItem('user', JSON.stringify(d.content));
          //var user = JSON.parse(localStorage.getItem('user'));
          //localStorage.clear();
          $("#preloader").hide();
          var redirectUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          if (redirectUrl == '') {
            window.location.href = `${environment.appurl}user/profile-step1`;
          }
          else {
            //this._router.navigate([redirectUrl]);
            window.location.href = redirectUrl;//`${environment.appurl}experience/add`;
          }
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
    /*
    // this._router.navigate(['dashboard']);
    this.userService.emailLogin(this.loginModel).subscribe(data => {
      // console.log('data = ', data);
      if (data) {
        this._router.navigate(['dashboard']);
      }
    });
    */
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }
}
