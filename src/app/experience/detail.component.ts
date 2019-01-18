import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-expdetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./experience.component.css']
})
export class DetailExpComponent implements OnInit {

  experienceList: any[] = [];
  model: any = {};
  isBuyer: boolean = false;
  AddModel: any = {};
  persons: number[] = [];
  totalprice: number;
  selectedPersonVal: number = 1;

  userInfo: any = {};

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
    for (var k = 1; k <= 50; k++) {
      this.persons.push(k);

    }
    this.route.params.subscribe(params => {
      console.log(params["id"]);
      let id = params["id"];
      this.LoadModel(id);
    });
  }

  LoadModel(id) {
    $("#preloader").show();
    this._userService.getUserExperienceNew().subscribe(data => {
      this.experienceList = data.content;
      this.model = this.experienceList.filter(q =>
        q.id == id
      )[0];
      if (this.model != null && this.model != undefined) {
        this.loadUderInfo(this.model.user_id);
      }
      localStorage.setItem('currentexp', JSON.stringify(this.model));
      //var user = JSON.parse(localStorage.getItem('user'));
      //localStorage.clear();

      console.log(this.model);
      this.totalprice = this.model['price'] - this.model['sprice'];
      $("#preloader").hide();
    });

  }

  loadUderInfo(userId) {
    this._userService.getUserInfo(userId).subscribe(data => {
      console.log('user info = ', data);
      debugger;
      if (data.status == "1") {
        this.userInfo = data.content;
      }
      else {
        console.log('No record found');
      }
      $("#preloader").hide();
      debugger;
      console.log(this.userInfo);
    });
  }
  onChange(val) {
    let price = this.model['price'] - this.model['sprice'];
    let calculateval = val * price;
    if (val != null) {
      this.selectedPersonVal = val;
      this.msgError = '';
    }
    else {
      this.selectedPersonVal = 1;
      this.msgError = 'please select people';
    }
    this.totalprice = calculateval;
  }
  msgError: string = '';
  BuyNow() {
    debugger;
    if (this.AddModel.people !== undefined && this.AddModel.people.length > 0) {
      this.msgError;
      const SelectProduct: any = {};
      SelectProduct.price = this.model['price']
      SelectProduct.sprice = this.model['sprice'];
      SelectProduct.selectedPersonVal = this.selectedPersonVal;
      SelectProduct.totalprice = this.totalprice;
      localStorage.setItem('SelectedProduct', JSON.stringify(SelectProduct));
      this._router.navigate(['checkout/pay-now']);
    }
    else {
      this.msgError = 'please select people';
      return false;
    }
  }
}