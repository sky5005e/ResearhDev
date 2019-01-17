import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SocialUser, AuthService } from 'angularx-social-login';
import { UserService } from '../services/user.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  IsUserName: boolean;
  isBuyer: boolean;
  UserName: string;
  Email: string;
  photoURL: string = 'assets/images/auth-image.png';
  user: SocialUser;

  constructor(private _router: Router, private socialAuthService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    ///console.log(localStorage.getItem('UserName'), 1);
    this.socialAuthService.authState.subscribe((userData) => {
      this.user = userData;
      let signUpModel : any = {}; 
      signUpModel.email_id = userData.email;
      signUpModel.first_name = userData.firstName;
      signUpModel.last_name = userData.lastName;
      signUpModel.user_name = userData.provider;
      signUpModel.profile_image = userData.photoUrl
      signUpModel.code = userData.provider;
     
      this.UserName = userData.name;
      this.Email = userData.email
      this.photoURL= userData.photoUrl
 
      //this.loadUserData(signUpModel) ; 
    });
    if (localStorage.getItem('UserName') !== undefined && localStorage.getItem('UserName') !== null) {
      this.IsUserName = true;
      this.UserName = localStorage.getItem('UserName');
      this.Email = localStorage.getItem('email_id');
     
    }
    else {
      this.IsUserName = false;
    }
    if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
      this.isBuyer = true;
    }
    else {
      this.isBuyer = false;
    }

    this._router.events.subscribe((event: Event) => {
      // $('html,body').animate({
      //   scrollTop: $("body").offset().top
      // }, 'slow');
    });
  }
  loadUserData(data) {
    $("#preloader").show();
    this.userService.socialLoginNew(data).subscribe(d => {
      console.log("success : ", d);
      if (d.status == "1") {
        window.localStorage['UserName'] = d.content.first_name + ' ' + d.content.last_name;
        window.localStorage['user_id'] = d.content.id;
        window.localStorage['email_id'] = d.content.email_id;
        window.localStorage['type'] = d.content.type;
        window.localStorage['city'] = d.content.city;
        this.UserName = localStorage.getItem('UserName');
        this.Email = localStorage.getItem('email_id');
        this.photoURL= d.content.profile_image;
   
        localStorage.setItem('user', JSON.stringify(d.content));
        $("#preloader").hide();

      }
      else {
        $("#preloader").hide();
        alert(d.message);
      }
    });
  }
  goToLogin(val) {
    this.socialAuthService.signOut();
    window.localStorage.removeItem('UserName');
    window.localStorage.removeItem('email_id');
    window.localStorage.removeItem('user_id');
    window.localStorage.removeItem('type');
    localStorage.clear();
    if (val == 1) {
      window.location.href = `${environment.appurl}login`
    }
    else {
      window.location.href = `${environment.appurl}`
    }
    //this._router.navigate(['login']);
  }

  goToSignUp() {
    this._router.navigate(['signUp']);
  }
}
