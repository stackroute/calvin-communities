import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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
  MatPaginatorModule
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
    MatPaginatorModule
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
    MatPaginatorModule
  ]
})
export class MaterialModule { }
