import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
declare var $: any;

@Component({
  selector: 'app-profilestep1',
  templateUrl: './profilestep1.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfilestep1Component implements OnInit {

  experienceList: any[] = [];
  isBuyer: boolean = false;
  constructor(private _userService: UserService) { }

  ngOnInit() {

   
  }

  
}
