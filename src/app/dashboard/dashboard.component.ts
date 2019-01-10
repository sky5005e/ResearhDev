import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  experienceList: any [] = [];
  isBuyer : boolean = false;
  constructor(private _userService: UserService) { }

  ngOnInit() {

    if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
      this.isBuyer  = true;
    }
    else {
      this.isBuyer = false;      
   // this.showExperience();
    }

   this.showExperience();
  }

  showExperience() {
    // this.experienceList = JSON.parse('[{"id":"1","title":"Bespoke Yoga Training","image":"http:\/\/akwebtech.com\/demo\/bukkzy\/image\/1546760179product_7.png","price":"1000","sprice":"800","address":"Noida","user_name":"Anil kumar"}]');
    this._userService.getUserExperience().subscribe(data => {
      // console.log('user experience = ', data);
      this.experienceList = data['product_details'];
    });
  }

  Search()
  {
    $("#preloader").show();
   
    let search = $("#txtsearch").val();
    let searchText = search.toLowerCase();
      this._userService.getUserExperience().subscribe(data => {
        //console.log('user experience = ', data);
        this.experienceList = data['product_details'];
        this.experienceList = this.experienceList.filter(q=>
          q.title.toLowerCase().includes(searchText)
         );
         $("#preloader").hide();
   
    console.log(this.experienceList);
      });
  }
}
