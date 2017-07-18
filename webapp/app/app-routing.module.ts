import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatesComponent } from './templates/templates.component';
import { CommunitiesComponent } from './communities/communities.component';
import { Routes, RouterModule } from '@angular/router';
import { ToolsComponent} from './tools/tools.component';
import { CommunityPageComponent } from './community-page/community-page.component';




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
              path: 'tools',
              component: ToolsComponent
          },
          {
            path:'templates',
            component: TemplatesComponent
          },
          {
            path: 'communities/:domain',
            component: CommunityPageComponent
          },
          {
            path: 'communities',
            component: CommunitiesComponent
          },
          {
            path: 'templates/communities/:template',
            component: CommunitiesComponent
          },
          {
            path: 'purpose/communities/:purpose',
            component: CommunitiesComponent
          },
          { path: '**', redirectTo: '/dashboard' }

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
