import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from 'projects/swimlane/ngx-datatable/src/lib/components/datatable.component';
import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'app-datatables',
  templateUrl: 'datatables.component.html',
  styleUrls: ['./datatables.component.css'],
})
export class DataTablesComponent {
  rows = [];

  temp = [];

  columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }, { name: 'status' }];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}