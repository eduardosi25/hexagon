import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService} from './services/user.service';
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
public title: string;
public identity;

constructor(
  private _router: Router,
  private _route:ActivatedRoute,
  private _userService:UserService

){
  this.title = 'ASES';
}

ngOnInit() {



//boton navbar abre cierra menu
  $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
        //  $('.overlay').removeClass('active');
      });
  });
}


}
