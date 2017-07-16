import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdTabsModule} from '@angular/material';
import {TemplateListService} from './template-list.service';

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
       data => { this.getResults = data; console.log(this.getResults)}); 
  }
}
