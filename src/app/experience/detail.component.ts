import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private _userService: UserService,
    private route: ActivatedRoute, ) { }

  ngOnInit() {

    if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
      this.isBuyer = true;
    }
    else {
      this.isBuyer = false;
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
      $("#preloader").hide();
    });

  }


}
