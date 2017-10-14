import { Component } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityPageService } from './community-page.service';
import * as moment from 'moment';

@Component({
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css'],
})


export class CommunityPageComponent {
  alldata = ["domain1","domain2"];
  arr = [];

  communityObj = {};
  communityMembers = {};
  communityTools = {};

  memberArray = [];
  toolsArray = [];
  createdon;
  updatedon;
constructor(private getpurposeservice : CommunityPageService, private router: Router, private route: ActivatedRoute){};

ngOnInit(){
/*  this.alldata.forEach(function(data)
    { */
      this.getpurposeservice.getCommunityDetails(this.route.snapshot.params['domain'])
      .subscribe(
        data =>{
          this.createdon =data.createdon;
          this.updatedon =data.updatedon;
          //console.log("tryinggggggggggggg",this.createdon);
          this.communityObj = data;
          //console.log("checking for prakhar",this.communityObj);

         data.createdon =  moment(this.createdon).subtract(1, 'days').calendar();
         data.updatedon =  moment(this.updatedon).subtract(1, 'days').calendar();
         //console.log("this is converted",this.createdon);
          this.arr.push(data);
          //console.log("Angular Data",data);
          this.getMembers(this.route.snapshot.params['domain']);
          this.getTools(this.route.snapshot.params['domain']);
        },
        error =>{console.log(error);},
        () =>console.log("finished")


        );
/*})*/
}
getMembers(domain){
  this.getpurposeservice.getMembers(domain)
  .subscribe(
    data=>{
      this.communityMembers = data;
      console.log(data.domain);  
      // console.log(data.MemberDetails[0].username);        
      this.memberArray.push(data);
      // console.log(this.memberArray);
    }
    )
}
getTools(domain){
  this.getpurposeservice.getTools(domain)
  .subscribe(
    data=>{
      this.communityTools = data;
      console.log(data);        
      this.toolsArray.push(data);
    }
    )
}

}
 

