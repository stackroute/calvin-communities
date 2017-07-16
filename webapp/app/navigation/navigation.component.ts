import { Component, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'calvin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isDarkTheme: boolean = false;
  constructor() {

  }

  ngOnInit() {}
  navigation = [
    { logo: 'dashboard', link: 'dashboard', label: 'Dashboard' },
    { logo: 'group', link: 'communities', label: 'Communities' },
    { logo: 'build', link: 'tools', label: 'Tools' },
    { logo: 'search', link: 'search', label: 'Search' },
    { logo: 'dns', link: 'templatelist', label: 'TemplateList' },
    { logo: 'bookmark', link: 'purpose', label: 'Purpose' },
    { logo: '', link: 'templates', label: 'Templates' },
    { logo: '', link: 'communitypage', label: 'CommunityPage' },
  ];

  toggle(){
    this.isDarkTheme = this.isDarkTheme === false ? true : false;
  }
}
