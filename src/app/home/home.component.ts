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
    // this.experienceList = JSON.parse('[{"id":"1","title":"Bespoke Yoga Training","image":"http:\/\/akwebtech.com\/demo\/bukkzy\/image\/1546760179product_7.png","price":"1000","sprice":"800","address":"Noida","user_name":"Anil kumar"}]');
    this._userService.getUserExperience().subscribe(data => {
      //console.log('user experience = ', data);
      if (this.isViewALL) {
        this.experienceList = data['product_details'];
        //console.log('this.experienceList', this.experienceList);
      }
      else {

        let list = data['product_details'];
        this.RCexperienceList = list.filter(q =>
          q.price < 40
        );
        //console.log('this.RCexperienceList', this.RCexperienceList);
        this.NEexperienceList = list.filter(q =>
          q.sprice < 40
        );

        //console.log('this.NEexperienceList', this.NEexperienceList);
        this.MPexperienceList = list.filter(q =>
          q.title.toLowerCase().includes('yoga')
        );

        //console.log('this.MPexperienceList', this.MPexperienceList);
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

    /*
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
       });*/
  }
}
