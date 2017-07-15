import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdCardModule } from '@angular/material';
import { DashboardGraphService } from './dashboardGraphs.service';


@Component({
  selector: 'calvin-dashboard-graphs',
  templateUrl: `./dashboardGraphs.component.html`,
  styleUrls: [
    '../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None

})

export class DashboardGraphsComponent implements OnInit {

  constructor(private GraphService: DashboardGraphService) {

  }
  options;
  purposes;
  data;
  domains;
  count = [];

  ngOnInit() {
    this.getGraphDetails();
  }


  getGraphDetails() {
    let count = 0;
    this.GraphService.getPurposes()
      .subscribe(p => {
        this.purposes = p;
        this.GraphService.getAllCommunities()
          .subscribe(domains => {
            this.domains = domains;
            this.purposes.forEach((purpose) => {
              this.domains.forEach((domain) => {
                if (domain.purpose.toLowerCase() == purpose.toLowerCase()) {
                  count++;
                }
              });
              this.count.push({ type: purpose, value: count })
              count = 0;
            });
            this.getGraph(this.count);
          })
      })
  }

  getGraph(data) {
    this.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function(d) { return d.type; },
        y: function(d) { return d.value; },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.02,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    }
    const a = [{ type: 'Medical', value: 5 }, { type: 'Technical', value: '2' }, { type: 'Artist', value: '3' }];
    console.log(a);
    data.push();
    console.log(data);
    this.data = data;
  }
}
