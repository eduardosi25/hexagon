import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


declare var $: any;
@Component({
  selector: 'app-datatables',
  templateUrl: 'datatables.component.html'
})
export class DataTablesComponent {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
}