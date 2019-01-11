import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expdetail',
  templateUrl: './detail.component.html',
  styleUrls: ['./experience.component.css']
})
export class DetailExpComponent implements OnInit {

  experienceList: any [] = [];
  isBuyer : boolean = false;
  constructor(private _userService: UserService,    
    private route: ActivatedRoute,) { }

  ngOnInit() {

    if (localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== null && localStorage.getItem('type') == 'buyer') {
      this.isBuyer  = true;
    }
    else {
      this.isBuyer = false;      
    }

    this.route.params.subscribe(params => {
      console.log(params["id"]);
      let id = params["id"];
     
    });
  }

}
