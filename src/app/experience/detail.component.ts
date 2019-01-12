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
  selectedPersonVal: number;
  constructor(private _userService: UserService,
    private route: ActivatedRoute,
    private _router : Router ) { }

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
    this._userService.getUserExperience().subscribe(data => {
      this.experienceList = data['product_details'];
      this.model = this.experienceList.filter(q =>
        q.id == id
      )[0];
      localStorage.setItem('currentexp', JSON.stringify(this.model));
      //var user = JSON.parse(localStorage.getItem('user'));
      //localStorage.clear();

      console.log(this.model);
      this.totalprice = this.model['price'] - this.model['sprice'];
      $("#preloader").hide();
    });

  }

  onChange(val) {
    let price = this.model['price'] - this.model['sprice'];
    let calculateval = val * price;
    this.selectedPersonVal = val;
    this.totalprice = calculateval;
  }

  BuyNow() {
    const SelectProduct: any = {};
    SelectProduct.price = this.model['price']
    SelectProduct.sprice = this.model['sprice'];
    SelectProduct.selectedPersonVal = this.selectedPersonVal;
    SelectProduct.totalprice = this.totalprice;
    localStorage.setItem('SelectedProduct', JSON.stringify(SelectProduct));
    this._router.navigate(['checkout/pay-now']);
  }

}
