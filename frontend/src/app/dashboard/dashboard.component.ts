import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  usersSubscription: Subscription = new Subscription;
  uptimeSubscription: Subscription = new Subscription;
  users: number = 1;
  uptime: number = 0;
  uptimeFormatted: string = '00:00:00:00';

  constructor(private socketioService: SocketioService) {}

  ngOnInit() {
    this.usersSubscription = this.socketioService.users$
      .subscribe(change => this.users = change);
    this.uptimeSubscription = this.socketioService.uptime$
      .subscribe(curTime => this.uptime = Math.round(curTime));
    setInterval(() => {
      this.uptime++;
      this.uptimeFormatted = new Date(this.uptime * 1000).toISOString().substr(11, 8);;
    }, 1000);
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.uptimeSubscription.unsubscribe();
  }
    
}