import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
declare var $: any;

@Component({
  selector: 'app-listexp',
  templateUrl: './list.component.html',
  styleUrls: ['./experience.component.css']
})
export class ListExpComponent implements OnInit {

  experienceList: any[] = [];
  isBuyer: boolean = false;
  constructor(private _userService: UserService) { }

  ngOnInit() {

    if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
      this.isBuyer = true;
    }
    else {
      this.isBuyer = false;
    }
   this. LoadSearch();
  }

  LoadSearch() {
    $("#preloader").show();


    if (localStorage.getItem('search') !== undefined && localStorage.getItem('search') !== null) 
    {
     let search = localStorage.getItem('search')

      let searchText = search.toLowerCase();
      this._userService.getUserExperience().subscribe(data => {
        //console.log('user experience = ', data);
        this.experienceList = data['product_details'];
        this.experienceList = this.experienceList.filter(q =>
          q.title.toLowerCase().includes(searchText)
        );
        $("#preloader").hide();

        console.log(this.experienceList);
      });
    }
  }

}
