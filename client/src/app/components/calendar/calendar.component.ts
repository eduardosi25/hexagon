import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [UserService]
})
export class CalendarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route:ActivatedRoute,
    private _userService:UserService
  ) { }

  ngOnInit() {
  }

}
