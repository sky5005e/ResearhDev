import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  showSignUp = false;
  showCheckType = true;
  buyerCheckValue: string;
  sellerCheckValue: string;
  signUpModel: any = {};
  cities = [];

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.cities = [
      'London',
      'New York',
      'Budapest',
      'Dubai',
      'Birmingham',
      'Sydney',
      'Paris',
      'Switzerland'
    ];
  }

  continueRegistration() {
    this.showSignUp = true;
    this.showCheckType = false;
    this.signUpModel['type'] = this.sellerCheckValue || this.buyerCheckValue;
  }

  registerUser() {
    debugger;
    console.log('signUpModel = ', this.signUpModel);
    // this._router.navigate(['thankYou']);
    /*
    this._userService.signUp(this.signUpModel).subscribe(data => {
      // console.log('registration data = ', data);
      if (data) {
        this._router.navigate(['thankYou']);
      }
    });
    */
    if (this.signUpModel.email_id !== undefined && this.signUpModel.email_id.length > 0
      && this.signUpModel.password !== undefined && this.signUpModel.password.length > 0
      && this.signUpModel.name !== undefined && this.signUpModel.name.length > 0
      && this.signUpModel.mobile !== undefined && this.signUpModel.mobile !== ''
      && this.signUpModel.city !== undefined && this.signUpModel.city.length > 0
    ) {


      let _formData: FormData = new FormData();
      _formData.append('email_id', this.signUpModel.email_id);
      _formData.append('password', this.signUpModel.password);

      _formData.append('name', this.signUpModel.name);
      _formData.append('mobile', this.signUpModel.mobile);

      _formData.append('city', this.signUpModel.city);
      _formData.append('type', this.signUpModel['type']);

      console.log('type', this.signUpModel['type']);
      console.log('formdata = >', _formData);
      var _url = `${environment.apiUrl}?req=registration`;
      $.ajax({
        type: "POST",
        url: _url,
        data: _formData,
        cache: false,
        processData: false,
        contentType: false,
        timeout: 600000,

        success: function (data) {
          return data;
        },
        error: function (e) {
          return e;
        }
      }).then((d) => {
        $("#preloader").hide();
        console.log("success : ", d);
        if (d.status == "1") {
          //window.location.href = `${environment.appurl}dashboard`

          this._router.navigate(['thankYou']);
        }
        else {
          $("#preloader").hide();
          alert(d.message);
        }
      });
    }
    else {
      //this.isFormValid = false;
      console.log('Invalid form');
      $("#preloader").hide();
      alert('please enter all the fields!');
      return;
    }
  }

}
