import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.scss'],
  imports:[IonicModule],
  standalone:true
})
export class ButtonRendererComponent  implements OnInit, ICellRendererAngularComp {

  private params: any;

  constructor() { }

  ngOnInit() {}

  agInit(params: any): void {
    this.params = params;
    //console.log(this.params.data)
    //console.log(this.params.rowIndex)
  }

  btnClickedHandler(e:any) {

    this.params.clicked(this.params.data);
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = this.getValueToDisplay(params);
    return true;
  }

  getValueToDisplay(params: ICellRendererParams) {

    return params.valueFormatted ? params.valueFormatted : params.data;
  }

}
