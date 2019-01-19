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
  selectedProduct: any = {};
  model: any = {};
  AddModel: any = {};
  isBuyer: boolean = false;
  SavePrice: number;
  Price: number;
  TotalPrice: number;
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
    console.log(this.model, 'currentexp');
    this.selectedProduct = JSON.parse(localStorage.getItem('SelectedProduct'));
    console.log(this.selectedProduct, 'SelectedProduct');
    if (this.selectedProduct != null) {
      this.SavePrice = this.model['sprice'] * this.selectedProduct.selectedPersonVal;
      this.Price = this.model['price'] * this.selectedProduct.selectedPersonVal;
      this.TotalPrice = this.selectedProduct.totalprice;
    }
    //localStorage.clear();
  }
  onSubmit() {

    $("#preloader").show();
    console.log('UserCardInfo Model = ', this.AddModel);
    localStorage.setItem('UserCardInfo', JSON.stringify(this.AddModel));
    this._router.navigate(['checkout/thank-you']);
    $("#preloader").hide();
  }
  showpaypal : boolean = true;
  showpaypalcon()
  {
    $("#showpaypaldiv").show();
    //$(".paypal-button-logo-gold").click();
  }
}
