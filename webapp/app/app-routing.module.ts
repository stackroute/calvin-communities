import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrendingComponent } from './trending/trending.component';
import { PopularToolsComponent } from './populartools/populartools.component';
import { TopicsComponent } from './topics/topics.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
