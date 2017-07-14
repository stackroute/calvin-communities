import { Component, OnInit, Input } from '@angular/core';
import { ToolService } from '../tools/tools.service';
import { MD_DIALOG_DATA} from '@angular/material';
import { MdDialog} from '@angular/material';



@Component({
  selector: 'calvin-community-tool-management',
  templateUrl: './tools/tools.component.html',
  styleUrls: ['./tools/tools.component.css'],
  providers:[ ToolService]
})
export class ToolsComponent implements OnInit {

    @Input('community') domain: string;
  tools = [];
  constructor(public dialog: MdDialog,private toolservice: ToolService) { }

  ngOnInit() {
    this.toolservice.getTools(this.domain).subscribe(data => {
     
      this.tools = data;
       console.log(this.tools,this.domain);
  });
}
   openBox(){
     this.dialog.open(CommunityDialogue);
   }

}



@Component({
  selector:'dialogebox',
  templateUrl:'./dialoge.html',
  providers:[ ToolService]
})
export class CommunityDialogue {
}