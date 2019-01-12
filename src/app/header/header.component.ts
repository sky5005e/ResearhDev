import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  IsUserName: boolean;
  isBuyer: boolean;
  UserName: string;
  Email : string;
  constructor(private _router: Router) { }

  ngOnInit() {
    ///console.log(localStorage.getItem('UserName'), 1);
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
  }

  goToLogin() {

    window.localStorage.removeItem('UserName');
    window.localStorage.removeItem('email_id');
    window.location.href = `${environment.appurl}login`


    //this._router.navigate(['login']);
  }

  goToSignUp() {
    this._router.navigate(['signUp']);
  }
}
