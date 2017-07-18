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
    { logo: 'bookmark', link: 'templates', label: 'Templates' },
  ];

  toggle(){
    this.isDarkTheme = this.isDarkTheme === false ? true : false;
  }
}
