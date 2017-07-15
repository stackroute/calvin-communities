import { Component, OnInit} from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdCardModule } from '@angular/material';
import { ToolsGraphService } from './tools-graph.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'calvin-tools-graph',
  templateUrl: './tools-graph.component.html'
})
export class ToolsGraphComponent implements OnInit {

constructor(private GraphService: ToolsGraphService) {
};

  tools;
  data;
  count;


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

 ngOnInit() {
    this.getToolsGraphDetails();
  }
getToolsGraphDetails() {
let count , tool;
    this.GraphService.getDomainsAndTools()
      .subscribe(tools => {
        this.tools = tools;
        this.tools.forEach((tool) => {
              count = tool.domains.length;
        })
        console.log("length", count);
       console.log("check",this.tools);

        })

          }

  public barChartLabels:string[] = [this.tools];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: this.tools , label: 'Tools'},
    {data: this.count, label: 'Domains'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = this.data;
    this.barChartData = clone;
  }
}