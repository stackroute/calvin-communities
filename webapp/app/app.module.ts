import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NvD3Component } from 'ng2-nvd3';
import { ChartsModule } from 'ng2-charts';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGraphsComponent } from './dashboardGraphs/dashboardGraphs.component';
import { DashboardGraphService } from './dashboardGraphs/dashboardGraphs.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { TemplatesComponent } from './templates/templates.component';
import { PopularToolsComponent } from './populartools/populartools.component';
import { TopicsComponent } from './topics/topics.component';
import { SearchComponent } from './search/search.component';
import { ManageCommunityComponent } from './managecommunity/managecommunity.component';
import { TemplatesService } from './templates/templates.service';
import { PurposeComponent } from './purpose/purpose.component';
import { GetPurposeService } from './purpose/purpose.service';
import { TemplateListComponent } from './templatelist/templatelist.component';
import { TemplateListService } from './templatelist/templatelist.service';
import { ToolsGraphComponent } from './tools-graph/tools-graph.component';
import { ToolsGraphService } from './tools-graph/tools-graph.service';
import 'd3';
import 'nvd3';

@NgModule({
  declarations: [
  AppComponent,
  DashboardComponent,
  DashboardGraphsComponent,
  NotificationsComponent,
  TemplatesComponent,
  PopularToolsComponent,
  TopicsComponent,
  SearchComponent,
  ManageCommunityComponent,
  ContentComponent,
  PurposeComponent,
  NvD3Component,
  TemplateListComponent,
  PurposeComponent,
  ToolsGraphComponent,
  NvD3Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    ChartsModule
    ],
  providers: [GetPurposeService, TemplatesService,TemplateListService, ToolsGraphService, DashboardGraphService ],
  bootstrap: [AppComponent],

})
export class AppModule { }
