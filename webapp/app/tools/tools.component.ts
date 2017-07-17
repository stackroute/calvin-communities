import { Component, OnInit, Input } from '@angular/core';
import { ToolService } from '../tools/tools.service';

@Component({
  selector: 'Tools',
  templateUrl: '../tools/tools.component.html',
  styleUrls: ['../tools/tools.component.css'],
  providers: [ToolService]
})
export class ToolsComponent implements OnInit {

  @Input('tools') domain: string;
  tools = [];
  count;
  constructor(private toolservice: ToolService) { }

  ngOnInit() {
    let count;
    this.toolservice.getTools().subscribe(data => {

      this.tools = data;
      this.tools.forEach((data) => {
        count = data.length;
        console.log("length", this.count);
      })

      console.log(this.tools);
      this.tools.push({ counts: count });

      console.log(this.tools, 'ygfywfytw')
    });
  }

}
