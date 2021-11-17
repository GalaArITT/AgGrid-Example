import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ag-grid-child';
  @ViewChild('agGrid') agGrid: AgGridAngular;

  columnDefs: ColDef[] = [
    {field: 'make', rowGroup:true},
    {field: 'price' }
  ];
  
  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };
  
  autoGroupColumnDef: ColDef = {
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: true
    }
  };

  rowData:Observable<any>; 
  constructor(private http: HttpClient){
    this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }
  getSelectedRows(): void {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
