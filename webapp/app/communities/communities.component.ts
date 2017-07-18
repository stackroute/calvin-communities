import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import {CommunitiesService} from './communities.service';
// import * as momemt from 'moment';

@Component({
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
  providers:[]
})
export class CommunitiesComponent {
	getCommunityResults =[];
	getToolsResults =[];
	getFinalResults =[];
	//domaindata=[];
	constructor(private communitiesService : CommunitiesService, private router: Router){};
getTools(value){
	this.communitiesService.selectTools(value.domain).subscribe(
		resultTools => { 
					this.getToolsResults = resultTools;
					console.log("tooools",this.getToolsResults);
					/*console.log(value.domain);*/
					this.getFinalResults.push({domain:value.domain,name:value.name,purpose:value.purpose,description:value.description,avatar:value.avatar,owner:value.owner,updatedon:value.updatedon,status:value.status,toolid:resultTools.tools});
					console.log('Final Result',this.getFinalResults);
					},
            error=>console.log(error),
            ()=>console.log("finished")
            );
}

	ngOnInit() {
		this.communitiesService.selectCommunities().subscribe(
			resultCommunity => {
			this.getCommunityResults = resultCommunity;
			resultCommunity.forEach((data)=>{
				this.getTools(data);
				});
		},error=>(error),
            ()=>console.log("finished")
		);
		}
	redirect(domain: string) {
		this.router.navigate(['/communities/'+ domain]);
	}


	}


/*
//Working code
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
	getResults =[];
	constructor(private communitiesService : CommunitiesService){};
		ngOnInit() {
		this.communitiesService.selectCommunities().subscribe(res => { 
		 this.getResults = res;
		  console.log(this.getResults);
	});
	}
}*/