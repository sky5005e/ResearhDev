import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-paynowpage',
  templateUrl: './paynow.component.html',
  styleUrls: ['./checkout.component.css']
})
export class PayNowComponent implements OnInit {

  experienceList: any[] = [];
  model: any = {};
  isBuyer: boolean = false;
  constructor(private _userService: UserService,
    private route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
      this.isBuyer = true;
    }
    else {
      this.isBuyer = false;
    }

    // this.route.params.subscribe(params => {
    //   console.log(params["id"]);
    //   let id = params["id"];
    //   this.LoadModel()
    // });
    this.LoadModel();
  }

  LoadModel() {
    //localStorage.setItem('currentexp', JSON.stringify(this.model));
      var currentexp = JSON.parse(localStorage.getItem('currentexp'));
      this.model = currentexp;
      //localStorage.clear();
  }
  sumbit() {
    this._router.navigate(['checkout/thank-you']);
  }

}
