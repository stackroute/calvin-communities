import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Http, Response} from '@angular/http';
import {MdButtonModule} from '@angular/material';
import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router'
import { FlexLayoutModule } from "@angular/flex-layout";
import {CommunitiesService} from './communities.service';

@Component({
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
  providers:[]
})

export class CommunitiesComponent {
	getCommunityResults =[];
	getToolsResults =[];
	getFinalResults =[];
	template;
	purpose;
	constructor(private communitiesService : CommunitiesService, private router: Router,private route: ActivatedRoute){};
	getCommunity(value){
		this.communitiesService.selectTools(value.domain).subscribe(
		resultTools => { 
			this.getToolsResults = resultTools;
			this.getFinalResults.push({domain:value.domain,name:value.name,purpose:value.purpose,description:value.description,avatar:value.avatar,owner:value.owner,updatedon:value.updatedon,status:value.status,toolid:resultTools.tools});
		},
		error=>console.log(error),
		()=>console.log("finished")
		);
	}
	doFilter(value){
		this.template = this.route.snapshot.params['template'];
		this.purpose = this.route.snapshot.params['purpose'];
		if(this.template || this.purpose){
			if(this.template){
				if(value.template ===  this.template){
					this.getCommunity(value);
				}
			}else if(this.purpose){
				if(value.purpose === this.purpose){
					this.getCommunity(value);
				}
			}
		}
	}
	ngOnInit() {
		if((this.route.snapshot.params['template'] !== undefined) || (this.route.snapshot.params['purpose']) !== undefined){
			this.communitiesService.selectCommunities().subscribe(
			resultCommunity => {
				this.getCommunityResults = resultCommunity;
				resultCommunity.forEach((data)=>{
				this.doFilter(data);
			});
			},error=>(error),
			()=>console.log("finished")
			);
		}
		else{
			this.communitiesService.selectCommunities().subscribe(
			resultCommunity => {
				this.getCommunityResults = resultCommunity;
				resultCommunity.forEach((data)=>{
					this.getCommunity(data);
				});
			},error=>(error),
			()=>console.log("finished")
			);
		}	
	}
	redirect(domain: string) {
		this.router.navigate(['/communities/'+ domain]);
	}
}
