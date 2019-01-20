import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subject } from 'rxjs';
import { template } from '@angular/core/src/render3';
import { FilterExpService } from '../services/filter-experience.service';
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
  noRecord: boolean = false;

  constructor(private _userService: UserService, private _filterExpService: FilterExpService) { }

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
          this.experienceList = data.content;
          //  this.data$.next(data.content);
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
  SideFilter() {
    console.log('SideFilter');
    var filtercategories = [];//$("ul.filtercategories li");
    var filterprice = [];//$("ul.filterprice li");
    //var filterrating = [];// $("ul.filterrating li");
    var filtercity = [];//$("ul.filtercity li");

    $('.filtercategories li input:checked').each(function () {
      var label = $(this).siblings('label').text();
      filtercategories.push(label);
    });
    $('.filterprice li input:checked').each(function () {
      var label = $(this).siblings('label').text();
      filterprice.push(label);
    });
    //  $('.filterrating li input:checked').each(function () {
    //   var label = $(this).siblings('label').text();
    //   filterrating.push(label);

    //   console.log(filterrating);
    // }); 
    $('.filtercity li input:checked').each(function () {
      var label = $(this).siblings('label').text();
      filtercity.push(label);
    });

    let cities = filtercity.join(",");
    // console.log(filterprice.join(","));
    // console.log(filterrating.join(","));
    let categories = filtercategories.join(",");
    //this.data$.next(this.experienceList.filter(_ => _.Nameq.title.toLowerCase().includes(val.toLowerCase())));
    if (cities.length > 0 || categories.length > 0) {
      $("#preloader").show();
      this._filterExpService.getFilterExperience(filtercity, filtercategories).subscribe(d => {
        if (d.status == "1") {
          let exp = d.content;
          //  this.data$.next(data.content);
          this.data$.next(exp);
        }
        $("#preloader").hide();
      });
    }
  }

}
