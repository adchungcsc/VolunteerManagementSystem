import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  links = [
    {title: 'Dashboard', route: '/dashboard', icon: 'dashboard'},
    {title: 'Find Events', route: '/find-event', icon: 'add_circle_outline'},
    {title: 'My Events', route: '/my-events', icon: 'calendar_today'},
    {title: 'Reports', route: '/reports', icon: 'insights'},
    {title: 'Add/Edit Events', route: '/create-event', icon: 'create'}
  ];

  showFirst = false;
  desktop = false;

  router: Router;

  constructor(private _router: Router, private authService: MsalService){
    this.router = _router; 
  }

  ngOnInit(): void {
  }

    logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.desktop = true;
    } else {
      this.desktop = false;
      this.showFirst = true;
    }
  }

}
