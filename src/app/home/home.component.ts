import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  experienceList: any[] = [];

  MPexperienceList: any[] = [];

  NEexperienceList: any[] = [];

  RCexperienceList: any[] = [];

  isBuyer: boolean = false;
  isViewALL: boolean = false;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.showExperience();
  }

  showExperience() {
    this._userService.getUserExperienceNew().subscribe(data => {
      console.log('user experience = ', data);
      // if (this.isViewALL) {
      if (data.status == "1") {
        this.experienceList = data.content;
      }
     });
  }

  ShowAll() {
    this.isViewALL = true;
    this.showExperience()
  }

  Search() {
    window.localStorage['search'] = $("#txtsearch").val();
    this._router.navigate(['experience/list']);
    }
}
