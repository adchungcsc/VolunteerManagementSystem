import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  links = [
    {title: 'Find an Event', route: '/find-event'},
    {title: 'My Registered Events', route: '/my-events'},
    {title: 'Reports', route: '/reports'},
    {title: 'Dashboard', route: '/dashboard'},
    {title: 'Create/Edit an Event', route: '/event-admin'}
  ];

  router: Router;

  constructor(private _router: Router){
    this.router = _router; 
  }

  ngOnInit(): void {
  }

}
