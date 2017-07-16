import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdTabsModule} from '@angular/material';
import {TemplatesService} from './templates.service';
import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
getResults = [];
purpose;
  constructor(private TemplateService : TemplatesService,private route: ActivatedRoute)
  {
     
  }
   ngOnInit() {
      this.TemplateService.selectTemplate(this.route.snapshot.params['purpose']).subscribe(
       data => { this.getResults = data}); 
  }
}
