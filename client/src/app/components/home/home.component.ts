import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserService} from '../../services/user.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})

export class HomeComponent implements OnInit, DoCheck{
public title:string;
public identity;

constructor(
  private _router: Router,
  private _route:ActivatedRoute,
  private _userService:UserService
){

}


  ngOnInit(){
      this.identity = this._userService.getIdentity();
  //  console.log("cargo home");
  }
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }
}
