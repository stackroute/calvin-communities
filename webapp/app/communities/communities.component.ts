import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {CommunitiesService} from './communities.service';

@Component({
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
  providers:[]
})
export class CommunitiesComponent {
/*	getCommunitiesResults =[];
	getToolsResults =[];*/
	getResults =[];
	constructor(private communitiesService : CommunitiesService){};

// 	getCommunities(){
// 		this.communitiesService.selectCommunities().subscribe(res => { 
// 		 this.getResults = res;
// 		  //console.log(this.getCommunityResults);
// 		});
// this.communitiesService.selectTools().subscribe(result => { 
// 		 this.getResults = result;
// 		 //console.log(this.getToolsResults);
// 		 });
// 	}

	ngOnInit() {
		this.communitiesService.selectCommunities().subscribe(res => { 
		 this.getResults = res;
		  /*console.log(this.getResults);
		  console.log(res);*/
		});
/*this.communitiesService.selectTools().subscribe(result => { 
		 this.getResults = result;
		 console.log(this.getResults);
		 console.log(result);
		  });*/

		// this.communitiesService.getCommunities().subscribe(res => { 
		//  this.getResults = res;
		//  // console.log(this.getCommunityResults);
		// });
		/*this.communitiesService.selectCommunities().subscribe(res => { 
		 this.getCommunityResults = res;
		  console.log(this.getCommunityResults);
		});*/

		 /*this.communitiesService.selectTools().subscribe(result => { 
		 this.getToolsResults = result;
		 console.log(this.getToolsResults);
		});*/
  }
}