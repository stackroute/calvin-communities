import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material';

@Component({
  selector: 'calvin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

navigation = [
    { logo: 'dashboard', link: 'dashboard', label: 'Dashboard' },
    { logo: 'group', link: 'communities', label:'Communities'},
    { logo: 'build', link: 'tools', label: 'Tools' },
    { logo: 'search', link: 'search', label: 'Search'},
    { logo: 'dns', link: 'templatelist', label: 'TemplateList'},
    { logo: 'bookmark', link: 'purpose', label: 'Purpose'},
    { logo: '', link: 'communitypage', label: 'CommunityPage'},
  ];
}
