import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateListComponent } from './templatelist/templatelist.component';
import { SearchComponent } from './search/search.component';
import { PopularToolsComponent } from './populartools/populartools.component';
import { TopicsComponent } from './topics/topics.component';
import { Routes, RouterModule } from '@angular/router';
import { PurposeComponent } from './TemplateCommunities/TemplateCommunities.component';

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
          {
              path: 'templatelist',
              component: TemplateListComponent
          },
          {   
              path: 'purpose',
              component: PurposeComponent

          },
          { path: '**', redirectTo: '/dashboard' }

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
