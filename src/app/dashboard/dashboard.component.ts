import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
    this._userService.getUserExperienceNew().subscribe(data => {
      //console.log('user experience = ', data);
      if (this.isViewALL) {
        this.experienceList = data.content;
        console.log('this.experienceList', this.experienceList);
      }
      else {

        let list = data.content;
        this.RCexperienceList = list.filter(q => q.ExpType == 'RC'
         //q.country.toLowerCase().includes(localStorage.getItem('city'))
        );
        console.log('this.RCexperienceList', this.RCexperienceList);
        this.NEexperienceList = list.filter(q =>  q.ExpType == 'NE'        
          //q.category.toLowerCase().includes('diving')
        );

        console.log('this.NEexperienceList', this.NEexperienceList);
        this.MPexperienceList = list.filter(q => q.ExpType == 'MP'
          //q.category.toLowerCase().includes('yoga')
      );

        console.log('this.MPexperienceList', this.MPexperienceList);
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
