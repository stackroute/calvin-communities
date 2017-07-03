import { Component } from '@angular/core';
import { SearchComponent } from './../search/search.component';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'calvin-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
 })


export class ContentComponent {

constructor(public dialog: MdDialog) {}
openDialog() {
 const MdDialogRef = this.dialog.open(SearchComponent, {
  width: '90%',
  height: '90%'
  });
}

}
