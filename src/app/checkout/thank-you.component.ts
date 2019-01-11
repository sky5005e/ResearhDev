import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankpageyou',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./checkout.component.css']
})
export class PaynowThankYouComponent implements OnInit {

  experienceList: any [] = [];
  isBuyer : boolean = false;
  constructor(private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
      this.isBuyer  = true;
    }
    else {
      this.isBuyer = false;      
    }

  }
  submit()
  {
    this._router.navigate(['dashboard']);
  }

}
