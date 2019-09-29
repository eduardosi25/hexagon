import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import 'datatables.net';
/** Declaramos jquery para poder usarlo en el componente*/
declare var $: any;

@Component({
  selector: 'app-datatables',
  templateUrl: 'datatables.component.html'
})
export class DataTablesComponent implements OnInit {
@ViewChild('dataTable') table;
dataTable : any;
dtOptions:any;
constructor(){}

  ngOnInit():void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable();
  }
}