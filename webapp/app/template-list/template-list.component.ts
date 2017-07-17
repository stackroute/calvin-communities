import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdTabsModule} from '@angular/material';
import {TemplateListService} from './template-list.service';


@Component({
  templateUrl: './template-list.component.html',
  selector:'template-list-component', 
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

getResults = [];
getcount=[];
  constructor(private TemplateListService : TemplateListService)
  {
    
  }
  ngOnInit() {
    this.TemplateListService.selectTemplates().subscribe(
       data => { this.getResults = data; console.log(this.getResults)}); 

    // this.getcommunities();
  }
  // getcommunities()
  // {

  //   this.TemplateListService.getAllCommunities().subscribe(
  //      data => { this.getcount = data; console.log(this.getResults)}); 

  // }

// ngOnInit() {
//     this.flag = 0;
//     this.getCount();
//   }

//   getCount() {
//     let flag = false;
//     let count = 0;
//     this.TemplateListService.selectTemplates()
//       .subscribe(p => {
//         this.templates = p;
//         this.TemplateListService.getAllCommunities()
//           .subscribe(domains => {
//             this.domains = domains;
//             this.templates.forEach((template) => {
//               this.domains.forEach((domain) => {
//                 if (domain.purpose.toLowerCase() == purpose.toLowerCase()) {
//                   count++;
//                   flag = true;
//                 }
//               });
//               this.count.push({ type: purpose, value: count })
//               count = 0;
//             });
//             this.flag = 1;
//             if(flag) {this.getGraph(this.count); }
//             if(!flag) {this.getGraph([]);}
//           })
//       })
//   }
 }
