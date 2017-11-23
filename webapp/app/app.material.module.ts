import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdInputModule,
  MdButtonModule,
  MdSelectModule,
  MdToolbarModule,
  MdCheckboxModule,
  //Importing with alias
  MdSlideToggleModule as MatSlideToggleModule,
  MdSidenavModule as MatSidenavModule,
  MdListModule as MatListModule,
  MdTabsModule as MatTabsModule,
  MdCardModule as MatCardModule,
  MdProgressSpinnerModule as MatProgressSpinnerModule,
  MdChipsModule as MatChipsModule,
  MdPaginatorModule as MatPaginatorModule,
  MdIconModule as MatIconModule,
  //Imported with original component name as well
  MdSlideToggleModule,
  MdSidenavModule,
  MdListModule,
  MdTabsModule,
  MdCardModule,
  MdProgressSpinnerModule,
  MdChipsModule,
  MdPaginatorModule,
  MdIconModule
  /*MatSlideToggleModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatPaginatorModule,
  MatIconModule*/
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    MdButtonModule,
    MdSelectModule,
    MdToolbarModule,
    MdCheckboxModule,
    MatSlideToggleModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule,
    MatIconModule,
    MdSlideToggleModule,
    MdSidenavModule,
    MdListModule,
    MdTabsModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdChipsModule,
    MdPaginatorModule,
    MdIconModule
  ],
  exports: [
    MdInputModule,
    MdButtonModule,
    MdSelectModule,
    MdToolbarModule,
    MdCheckboxModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule,
    MatIconModule,
    MdSlideToggleModule,
    MdSidenavModule,
    MdListModule,
    MdTabsModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdChipsModule,
    MdPaginatorModule,
    MdIconModule
  ]
})
export class MaterialModule { }
