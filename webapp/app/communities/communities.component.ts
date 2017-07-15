import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {CommunitiesService} from './communities.service';

@Component({
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css']
})
export class CommunitiesComponent {
	getCommunityResults =[];
	getToolsResults =[];
	getResults =[];
	constructor(private communitiesService : CommunitiesService){};

	ngOnInit() {
		this.communitiesService.selectCommunities().subscribe(res => { 
		 this.getCommunityResults = res;
		  console.log(this.getCommunityResults);
		});

		 this.communitiesService.selectTools().subscribe(result => { 
		 this.getToolsResults = result;
		 console.log(this.getToolsResults);
		});
  }
}