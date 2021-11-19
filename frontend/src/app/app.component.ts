import { Component } from '@angular/core';
import { SocketioService } from './socketio.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VolunteerManager';
  currentRoute: string;

  constructor(private socketService: SocketioService, private router: Router) {
    this.currentRoute = '';
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;          
          console.log(event);
      }

      if (event instanceof NavigationError) {
          console.log(event.error);
      }
    })
  }
  
  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
