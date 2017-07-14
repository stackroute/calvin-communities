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
 count = 0;
 images = ['https://career.webindia123.com/career/options/images/medical-tourism.jpg',
 'http://tefcel.com/wp-content/uploads/2015/11/technicaltefcel.jpg',
 'http://www.irishtimes.com/polopoly_fs/1.2932837.1484143758!/image/image.jpg',
 'http://www.piedmont.k12.ca.us/beach/wp/wp-content/uploads/2013/01/Art-1024x681.jpg'];
constructor(private getpurposeservice:GetPurposeService){};

getTemplates(val) {
	this.getpurposeservice.getAllTemplates(val).subscribe(
		data =>{
			this.Template=data;
			val = val.toUpperCase();
			console.log(val);
			this.alldata.push({purpose:val,data:this.Template,image:this.images[this.count]});
			this.count+=1;
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
