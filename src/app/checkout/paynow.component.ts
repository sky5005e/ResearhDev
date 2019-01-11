import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-paynowpage',
  templateUrl: './paynow.component.html',
  styleUrls: ['./checkout.component.css']
})
export class PayNowComponent implements OnInit {

  experienceList: any [] = [];
  isBuyer : boolean = false;
  constructor(private _userService: UserService) { }

  ngOnInit() {

    if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
      this.isBuyer  = true;
    }
    else {
      this.isBuyer = false;      
    }

  }

}
