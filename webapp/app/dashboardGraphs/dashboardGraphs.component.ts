import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdCardModule} from '@angular/material';
import { DashboardGraphService } from './dashboardGraphs.service';

declare let d3: any;

@Component({
	selector: 'calvin-dashboard-graphs',
  templateUrl:`./dashboardGraphs.component.html`,
  styleUrls: [
    '../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None

})

export class DashboardGraphsComponent implements OnInit {

constructor(private Graphservice: DashboardGraphService) {

}

options;
  data;
  ngOnInit() {
  

    
  }
}
