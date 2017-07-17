import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdTabsModule} from '@angular/material';
import {TemplatesService} from './templates.service';
import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import {TemplateListComponent} from '../template-list/template-list.component';
import {PurposeComponent} from '../purpose/purpose.component';

@Component({
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
getTemplate;
getPurpose;
  constructor(private TemplateService : TemplatesService,private route: ActivatedRoute)
  {
     
  }
  select(value){
    this.getTemplate='';
    this.getPurpose='';
    if(value==='basedontemplate')
    {
      this.getTemplate = 'template';
    }
    if(value === 'basedonpurpose')
    {
      this.getPurpose= 'purpose';
    }
  }
  ngOnInit() {} 
}
