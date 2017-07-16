import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdTabsModule} from '@angular/material';
<<<<<<< HEAD:webapp/app/templatelist/templatelist.component.ts
import {TemplateListService} from './templatelist.service';
//import { ExpansionPanelsModule } from 'ng2-expansion-panels';
=======
import {TemplateListService} from './template-list.service';
>>>>>>> 17aab5d243c4c9babc99c5a5e231b8131c5d9a47:webapp/app/template-list/template-list.component.ts

@Component({
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
getResults = [];
  constructor(private TemplateListService : TemplateListService)
  {
    
  }
  ngOnInit() {
    this.TemplateListService.selectTemplate().subscribe(
       data => { this.getResults = data}); 
  }
}
