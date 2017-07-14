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
import { DashboardGraphsComponent } from './dashboardGraphs/dashboardGraphs.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TemplatesComponent } from './templates/templates.component';
import { PopularToolsComponent } from './populartools/populartools.component';
import { TopicsComponent } from './topics/topics.component';
import { SearchComponent } from './search/search.component';
import { ManageCommunityComponent } from './managecommunity/managecommunity.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PurposeComponent } from './TemplateCommunities/TemplateCommunities.component';

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
  PurposeComponent
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
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ SearchComponent ]

})
export class AppModule { }
