import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatesComponent } from './templates/templates.component';
import { TopicsComponent } from './topics/topics.component';
import { SearchComponent } from './search/search.component';
import { NotifyComponent } from './notify/notify.component';
import { ManageCommunityComponent } from './managecommunity/managecommunity.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToolsComponent} from './tools/tools.component';
import{ToolService} from './tools/tools.service';
@NgModule({
  declarations: [
  AppComponent,
  DashboardComponent,
  TemplatesComponent,
  TopicsComponent,
  SearchComponent,
  ManageCommunityComponent,
  NotifyComponent,
  ContentComponent,
  ToolsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
    ],
  providers: [ToolService],
  bootstrap: [AppComponent],
  entryComponents: [ SearchComponent ]

})
export class AppModule { }
