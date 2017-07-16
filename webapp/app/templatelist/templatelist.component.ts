import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdTabsModule} from '@angular/material';
import {TemplateListService} from './templatelist.service';
//import { ExpansionPanelsModule } from 'ng2-expansion-panels';

@Component({
  templateUrl: './templatelist.component.html',
  styleUrls: ['./templatelist.component.css']
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
