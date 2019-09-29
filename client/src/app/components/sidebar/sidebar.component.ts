import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService} from '../../services/user.service';
import { GLOBAL } from '../../services/global';
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit{
public title: string;
public identity;
public url: string;


constructor(
  private _router: Router,
  private _route:ActivatedRoute,
  private _userService:UserService

){
  this.url = GLOBAL.url;

}
ngOnInit() {
  
  this.identity = this._userService.getIdentity();
  //console.log(this.identity);
  $(function() {
    $( 'ul > li.navbars-nav.navs-link' ).on( 'click', function() {
          $( this ).parent().find( 'li.active' ).removeClass( 'active' );
          $( this ).addClass( 'active' );
    });
});
  
}
ngDoCheck(){
  //check for login
  this.identity = this._userService.getIdentity();
}
logout(){
  localStorage.clear();
  this.identity = null;
  this._router.navigate(['/login']);
}
}
