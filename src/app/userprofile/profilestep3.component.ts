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
  UserName: string;
  Email: string;
  places = [
    'India',
    'Germany',
    'France'
  ]
  Model: any = {};
  userid: string;
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('UserName') !== undefined && localStorage.getItem('UserName') !== null) {
      this.UserName = localStorage.getItem('UserName');
      this.Email = localStorage.getItem('Email');
      this.userid = localStorage.getItem('user_id');

      this.loadPaymentInfo(this.userid);
    }
  }
  loadPaymentInfo(id: any) {
    this._userService.getUserPaymentInfo(id).subscribe(data => {
      console.log('getUserPaymentInfo = ', data);
      if (data.status == "1") {
        this.Model = data.content;
      }
      else {
        console.log('No record found');
      }
      $("#preloader").hide();

      console.log(this.Model);
    });
  }
  goto() {
    this._router.navigate(['dashboard']);
  }
  gotoback() {
    this._router.navigate(['user/profile-step2']);
  }
  onSubmit() {
    this.Model.user_id = localStorage.getItem('user_id');
    this._userService.SavePaymentInfo(this.Model).subscribe(data => {
      console.log('SavePaymentInfo = ', data);
      if (data.status == "1") {

        this._router.navigate(['dashboard']);
      }
      else {
        console.log('No record found');
      }
      $("#preloader").hide();

      console.log(this.Model);

    })
  }
}
