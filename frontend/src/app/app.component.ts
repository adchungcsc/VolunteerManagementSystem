import { Component } from '@angular/core';
import { SocketioService } from './socketio.service';
import { Router, Event, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'VolunteerManager';
  socket: any;

  constructor(private socketService: SocketioService, private router: Router) {
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        let eventUrl = event.url.replace("/", "");
        if (eventUrl == "") eventUrl = "landing";       
        this.socketService.socket.emit('route call update', eventUrl);
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
