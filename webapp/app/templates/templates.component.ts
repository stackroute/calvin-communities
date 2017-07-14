import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdTabsModule} from '@angular/material';
import {TemplatesService} from './templates.service';

@Component({
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
 dummy='Surgeon';
getResults = [];
  constructor(private TemplateService : TemplatesService)
  {

  }
  ngOnInit() {
    this.TemplateService.selectTemplate('Specialists').subscribe(
       data => { this.getResults = data}); 
  }

selectTemplate(dummy)
  {
     this.TemplateService.selectTemplate('Surgeon').subscribe(
       (data) => { this.getResults = data});   // complete;


  }
}
