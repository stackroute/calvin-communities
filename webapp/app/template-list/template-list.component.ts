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
dummy;
getResults = [];
getCommunities=[];
  constructor(private TemplateListService : TemplateListService)
  {
}


ngOnInit() {
 console.log("fjkfjkbvjfbv")
     this.TemplateListService.getAllCommunities().subscribe(
		data =>{
			this.getCommunities=data;
		
    console.log(this.getCommunities)
    this.getCommunities.forEach((data) =>
    {
      console.log(data.template)
      if(data.template == 'Surgeon')
      {

        this.getResults.push(this.getCommunities)
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