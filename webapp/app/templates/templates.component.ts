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
selectedValue: string;
getResults=[];
getPurpose=[];
counter=[];
domains;
singular = ' Community ';
plural = ' Communities ';
getpurpose;
  constructor(private TemplateService : TemplatesService,private route: ActivatedRoute, private router: Router )
  {

  }
  ngOnInit() {
    this.TemplateService.selectTemplates().subscribe(

       data => { this.getResults = data;
          this.getResults.forEach((data) =>
          {
           if(!(this.getPurpose.includes(data.purpose))){

                this.getPurpose.push(data.purpose);
           }
          });
          this.getCount();
       });
  }

select(val) {
	this.TemplateService.getAllTemplates(val).subscribe(
		data =>{
			this.getResults=data;
		});
}

  getCount() {
    let flag = false;
    let count = 0;
    this.TemplateService.selectTemplates()
      .subscribe(p => {
        this.getpurpose = p;
        this.TemplateService.getAllCommunities()
          .subscribe(domains => {
            this.domains = domains;
            this.getpurpose.forEach((template) => {
              this.domains.forEach((domain) => {
                if (domain.template.toLowerCase() === template.name.toLowerCase()) {
                  count++;
                  flag = true;
                }
              });
              this.counter.push({value:count,type:template.name});
              count = 0;
            });

          })

      })
  }
 //  console.log(this.getResults);
 redirect(template: string, count) {
   if(count !== 0) {
   this.router.navigate(['/templates/communities/'+ template])
   }
 }

}
