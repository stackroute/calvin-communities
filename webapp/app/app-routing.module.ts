import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatesComponent } from './templates/templates.component';
import { SearchComponent } from './search/search.component';
import { PopularToolsComponent } from './populartools/populartools.component';
import { TopicsComponent } from './topics/topics.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
          path: '',
          redirectTo: '/dashboard',
          pathMatch: 'full'
          },
          {
              path: 'dashboard',
              component: DashboardComponent
          },
          {
          		path: 'search',
          		component: SearchComponent
          },
          {
              path: 'templates',
              component: TemplatesComponent
          },
          {
              path: 'topics',
              component: TopicsComponent
          },
          {
              path: 'populartools',
              component: PopularToolsComponent
          },
          { path: '**', redirectTo: '/dashboard' }

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
