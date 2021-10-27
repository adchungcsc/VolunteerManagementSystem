import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  links = [
    {title: 'Find Events', route: '/find-event'},
    {title: 'My Events', route: '/my-events'},
    {title: 'Reports', route: '/reports'},
    {title: 'Dashboard', route: '/dashboard'},
    {title: 'Add/Edit Events', route: '/create-event'}
  ];

  showFirst = false;

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

}
