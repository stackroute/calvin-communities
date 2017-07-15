import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import 'lodash';
import 'd3';
import 'nvd3';
import { NvD3Component } from 'ng2-nvd3';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGraphsComponent } from './dashboardGraphs/dashboardGraphs.component';
import { DashboardGraphService } from './dashboardGraphs/dashboardGraphs.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { TemplatesComponent } from './templates/templates.component';
import { TopicsComponent } from './topics/topics.component';
import { SearchComponent } from './search/search.component';
import { ManageCommunityComponent } from './managecommunity/managecommunity.component';
import { CommunitiesComponent } from './communities/communities.component';
import { CommunitiesService } from './communities/communities.service';
import { TemplatesService } from './templates/templates.service';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToolsComponent} from './tools/tools.component';
import { ToolService } from './tools/tools.service';
import { PurposeComponent } from './purpose/purpose.component';
import { GetPurposeService } from './purpose/purpose.service';
import { TemplateListComponent } from './templatelist/templatelist.component';
import { TemplateListService } from './templatelist/templatelist.service';

@NgModule({
  declarations: [
  AppComponent,
  DashboardComponent,
  DashboardGraphsComponent,
  NotificationsComponent,
  TemplatesComponent,
  TopicsComponent,
  SearchComponent,
  CommunitiesComponent,
  ManageCommunityComponent,
  ContentComponent,
  ToolsComponent,
  ContentComponent,
  PurposeComponent,
  TemplateListComponent,
  NvD3Component,
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

  providers: [ToolService,GetPurposeService, TemplatesService,
  TemplateListService, DashboardGraphService,CommunitiesService],
  bootstrap: [AppComponent],

})
export class AppModule { }
