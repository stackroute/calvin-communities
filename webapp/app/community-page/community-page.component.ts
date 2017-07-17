import { Component } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommunityPageService } from './community-page.service';

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

constructor(private getpurposeservice : CommunityPageService){};

ngOnInit(){
/*  this.alldata.forEach(function(data)
    { */ 
      this.getpurposeservice.getCommunityDetails("sandhyas")
      .subscribe(
        data =>{
          this.communityObj = data;
          this.arr.push(data);
          console.log("Angular Data",data);
          this.getMembers("sandhyas");
          this.getTools("sandhyas");
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
 

