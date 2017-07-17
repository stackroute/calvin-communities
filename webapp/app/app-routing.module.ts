import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { SearchComponent } from './search/search.component';
import { CommunitiesComponent } from './communities/communities.component';
import { Routes, RouterModule } from '@angular/router';
import { ToolsComponent} from './tools/tools.component';
import { PurposeComponent } from './purpose/purpose.component';
import { CommunityPageComponent } from './community-page/community-page.component';
import {CommunitiesListComponent} from './communitieslist/communitieslist.component';




const routes: Routes = [
          {
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
              path: 'tools',
              component: ToolsComponent
          },
          {
              path: 'templatelist',
              component: TemplateListComponent
          },
          {
            path:'templates',
            component: TemplatesComponent
          },
          {
              path: 'purpose',
              component: PurposeComponent

          },
          {
            path: 'communitypage',
            component: CommunityPageComponent
          },
          {
            path: 'communities',
            component: CommunitiesComponent
          },
          {
              path: 'communitieslist/:template',
            component: CommunitiesListComponent
          },
          { path: '**', redirectTo: '/dashboard' }

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
