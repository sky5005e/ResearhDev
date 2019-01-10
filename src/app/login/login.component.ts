import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormApiService } from '../services/formapi.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: any = {};
  isFormValid: boolean = true;
  constructor(private socialAuthService: AuthService, private _router: Router,
    private userService: UserService,
    private formapiService : FormApiService) { }

  ngOnInit() {
  }

  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
       console.log('userData = ', userData);
    })
  }

  loginWithGmail() {
    console.log('click login');
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData => {
       console.log('userData = ',  userData);
    })
  }

  login() {

    $("#preloader").show();
    console.log('loginModel = ', this.loginModel);
    // debugger;
    if (this.loginModel.email !== undefined && this.loginModel.email.length > 0 && this.loginModel.password !== undefined && this.loginModel.password.length > 0) {

      this.isFormValid = true;
      let _formData: FormData = new FormData();
      _formData.append('email_id', this.loginModel.email);
      _formData.append('password', this.loginModel.password);
      var _url = `${environment.apiUrl}?req=login`;
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
      this.formapiService.post(_url, _formData).then((d) => {
        $("#preloader").show();
        console.log("success : ", d);
        if (d.status == "1") {

          window.localStorage['UserName'] = d.login_detail[0].user_name;          
          window.localStorage['user_id'] = d.login_detail[0].id;
          window.localStorage['email_id'] = d.login_detail[0].email_id;          
          window.localStorage['type'] = d.login_detail[0].type;
          window.location.href = `${environment.appurl}dashboard`
          
          //this._router.navigate(['dashboard']);
        }
        else
        {
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
}
