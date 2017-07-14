import { Component } from '@angular/core';
import { GetPurposeService } from './purpose.service';

@Component({
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.css'],
  providers: [GetPurposeService]
})
export class PurposeComponent {
 getData = [];
 Template=[];
 alldata = [];
constructor(private getpurposeservice:GetPurposeService){};

getTemplates(val) {
	console.log("gng to serviceee!!");
	this.getpurposeservice.getAllTemplates(val).subscribe(
		data =>{
			this.Template=data;
			console.log({purpose:val,data:this.Template});
			this.alldata.push({purpose:val,data:this.Template});
		},
            error=>console.log(error),
            ()=>console.log("finished")
		);
}


ngOnInit() {
	this.getpurposeservice.getAllPurpose().subscribe(
		data =>{
			this.getData=data;
			data.forEach((value)=>{
				this.getTemplates(value);
			});
		},
            error=>(error),
            ()=>console.log("finished")
		);
}

}
