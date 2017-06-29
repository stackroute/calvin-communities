import { Component } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
	constructor(public dialogRef: MdDialogRef<SearchComponent>) {}
}
