import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-listexp',
  templateUrl: './list.component.html',
  styleUrls: ['./experience.component.css']
})
export class ListExpComponent implements OnInit {

  experienceList: any[] = [];
  isBuyer: boolean = false;
  
  data$ = new Subject<any>();
  
  constructor(private _userService: UserService) { }

  ngOnInit() {

    if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
      this.isBuyer = true;
    }
    else {
      this.isBuyer = false;
    }
    this.LoadSearch();
  }

  LoadSearch() {
    $("#preloader").show();

    if (localStorage.getItem('search') !== undefined && localStorage.getItem('search') !== null) {
      let search = localStorage.getItem('search')

      let searchText = search.toLowerCase();
      this._userService.getUserExperienceNew().subscribe(data => {
        console.log('user experience = ', data);
        if (data.status == "1") {
          this.data$.next(data.content);
           this.experienceList = data.content;
        //   this.experienceList = this.experienceList.filter(q =>
        //     q.title.toLowerCase().includes(searchText)
        //   );
        // }
        this.data$.next(this.experienceList.filter(_q => _q.title.toLowerCase().includes(searchText.toLowerCase())));
        console.log(this.data$.hasError, 'this data$')
        }
        else {
          console.log('No Experience found');
        }
        $("#preloader").hide();

        console.log(this.experienceList);
      });
    }
  }
  SearchList() {
    window.localStorage['search'] = $("#txtsearch").val();
    this.LoadSearch();

  }
  filterEvent(val : string)
  {
    this.data$.next(this.experienceList.filter(_ => _.Nameq.title.toLowerCase().includes(val.toLowerCase())));
      
  }

}
