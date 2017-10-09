import { Component, OnInit, Input } from '@angular/core';
import { ToolService } from '../tools/tools.service';

@Component({
  selector: 'Tools',
  templateUrl: '../tools/tools.component.html',
  styleUrls: ['../tools/tools.component.css'],
  providers:[ ToolService]
})
export class ToolsComponent implements OnInit {

    @Input('tools') domain: string;
  tools = [];
  constructor(private toolservice: ToolService) { }

  ngOnInit() {
    this.toolservice.getTools().subscribe(data => {
     
      this.tools = data;

       console.log(this.tools);
  });
}

}
