import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './topbar/topbar.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrendingComponent } from './trending/trending.component';
import { PopularToolsComponent } from './populartools/populartools.component';
import { TopicsComponent } from './topics/topics.component';
import { SearchComponent } from './search/search.component';
import { NotifyComponent } from './notify/notify.component';
import { ManageCommunityComponent } from './managecommunity/managecommunity.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
  AppComponent,
  DashboardComponent,
  TrendingComponent,
  PopularToolsComponent,
  TopicsComponent,
  SearchComponent,
  ManageCommunityComponent,
  NotifyComponent,
  TopBarComponent,
  ContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
