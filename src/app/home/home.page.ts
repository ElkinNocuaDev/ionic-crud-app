import { Component, OnInit, ViewChild } from '@angular/core';
import { DbmanagerService } from '../services/dbmanager.service';
import { IClient } from '../IClient';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowValueChangedEvent } from 'ag-grid-community';
import { ButtonRendererComponent } from '../components/button-renderer/button-renderer.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  public editType: 'fullRow' = 'fullRow';

  rowData=[]
  columnDefs: ColDef[] = [
	  { field:'id',hide:true},
	  { field: 'name', editable:true, headerName:'Name', width:100 },
	  { field: 'lastname', editable:true, maxWidth:100 },
	  { field: 'email', editable:true, width:100 },
    { field: '', cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
	        clicked: (field: any) => {
		        console.log(field)
		        this.deleteRecord(field)
	        }
        },
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true
  };

  constructor(private dbmanagerService:DbmanagerService) {
    //this.addClient();
    //this.getClients();
    //this.getClientbyID();
    //this.updateClient();
    //this.deleteClient();

  }

  ngOnInit() {
    this.getClients();
  }

  onGridReady(params:any) {
    //params.api.sizeColumnsToFit();
  
  }
  
  async getClients()
  {
	  var response = await this.dbmanagerService.getClients();
	  //console.log(response)
    this.rowData=response;
  }

  onAddRow()
{
	var rowDataItem = this.createNewRowData();
	this.agGrid.api.applyTransaction({ add: [rowDataItem], addIndex:0 });

}

  createNewRowData() {
    var newData = {
      name:'',
      lastname:'',
      email:''
    };
    return newData;
  }

  async onRowValueChanged(event: RowValueChangedEvent) {
    var client = event.data;
    if(client.id)
    {
      var res = await this.dbmanagerService.updateClient(client);
    }
    else
    {
      var response = await this.dbmanagerService.addClient(client);
    }
  
  }

  deleteRecord(row:any)
  {
	  this.agGrid.api.applyTransaction({remove:[row]});
	  this.dbmanagerService.deleteClient(row.id)
  }

  async addClient()
  {
	  let client:IClient={id:7,name:"Isaias",lastname:"Nocua",email:"isa.nocua06@gmail.com"}

	  var response = await this.dbmanagerService.addClient(client);
	  console.log(response);
  }

  async getClientbyID()
  {
	  var response = await this.dbmanagerService.getClientbyID(5);
	  console.log(response)
  }

  async updateClient()
  {
    let client: IClient = {
      id: 4,
      name: "Monica",
      lastname: "Nocua",
      email: "monik.nocua@gmail.com"
    };
    
	  var response = await this.dbmanagerService.updateClient(client);
	  console.log(response)
  }

  async deleteClient()
  {
	  var response = await this.dbmanagerService.deleteClient(6);
	  console.log(response)
  }

}
