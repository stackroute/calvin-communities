import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdTabsModule} from '@angular/material';
import {CommunitiesListService} from './communitieslist.service';
import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';


@Component({
  templateUrl: './communitieslist.component.html',
  selector:'communitieslist.component', 
  styleUrls: ['./communitieslist.component.css']
})
export class CommunitiesListComponent implements OnInit {
dummy;
getResults = [];
getCommunities=[];
template;
  constructor(private CommunitiesListService : CommunitiesListService,private route: ActivatedRoute)
  {
}


ngOnInit() {

 this.template = this.route.snapshot.params['template'];
     this.CommunitiesListService.getAllCommunities().subscribe(
		data =>{
			this.getCommunities=data;
		
    console.log(this.getCommunities)

    this.getCommunities.forEach((data1) =>
    {
      console.log("templa",data1.template)
      console.log("this.template",this.template)
      if(data1.template == this.template)
      {
       this.getResults.push({description:data1.description});
        console.log("results",this.getResults.description)
      }
    })
    });
}


  // getCommunities(dummy)
  // {
  //    this.TemplateListService.getAllCommunities().subscribe(
	// 	data =>{
	// 		this.getCommunities=data;
	// 	});
  //   this.getCommunities.forEach((data) =>
  //   {
  //     if(data.template === dummy)
  //     {
  //       getResults.push(getCommunities)
  //     }
  //   })

  // }

}