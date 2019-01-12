import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-profilestep3',
  templateUrl: './profilestep3.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfilestep3Component implements OnInit {

  isBuyer: boolean = false;
  UserName : string;
  Email : string;
  constructor(private _userService: UserService, private _router : Router) { }

  ngOnInit() {

    if (localStorage.getItem('UserName') !== undefined && localStorage.getItem('UserName') !== null) {
      this.UserName = localStorage.getItem('UserName');
      this.Email = localStorage.getItem('Email');
    }
   
  }
  goto()
  {
    this._router.navigate(['dashboard']);
  }
  gotoback()
  {
    this._router.navigate(['user/profile-step2']);
  }
  
}
