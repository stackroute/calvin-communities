import { Component } from '@angular/core';

@Component({
  templateUrl: './TemplateCommunities.component.html',
  styleUrls: ['./TemplateCommunities.component.css']
})
export class PurposeComponent {
 newArray = [1,2,3,4,5,6,7,8];
 tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 2, rows: 2, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}
