import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  pagesSubscription: Subscription = new Subscription;
  uptimeSubscription: Subscription = new Subscription;
  apiCallsSubscription: Subscription = new Subscription;
  routesSubscription: Subscription = new Subscription;
  pages: number = 0;
  uptime: number = 0;
  days: number = 0;
  uptimeFormatted: string = '00:00:00';
  apiCalls: number = 0;
  routesCalled: any = [];

  constructor(private socketioService: SocketioService) {}

  ngOnInit() {
    this.pagesSubscription = this.socketioService.pages$
      .subscribe(change => this.pages = change);
    this.uptimeSubscription = this.socketioService.uptime$
      .subscribe(curTime => this.uptime = Math.round(curTime));
    setInterval(() => {
      if (this.uptime == 86399) {
        this.days++;
        this.uptime = 0;
      } else {
        this.uptime++;
      }
      this.uptimeFormatted = new Date(this.uptime * 1000).toISOString().substr(11, 8);
    }, 1000);
    this.apiCallsSubscription = this.socketioService.apiCalls$
      .subscribe(change => this.apiCalls = change);
    this.routesSubscription = this.socketioService.routesCalled$
      .subscribe(updatedRoutes => this.routesCalled = updatedRoutes.reverse());
  }

  ngOnDestroy() {
    this.pagesSubscription.unsubscribe();
    this.uptimeSubscription.unsubscribe();
    this.apiCallsSubscription.unsubscribe();
    this.routesSubscription.unsubscribe();
  }
    
}