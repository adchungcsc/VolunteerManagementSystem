import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: any;
  private _pagesSource = new BehaviorSubject<number>(0);
  pages$ = this._pagesSource.asObservable();
  private _uptimeSource = new BehaviorSubject<number>(0);
  uptime$ = this._uptimeSource.asObservable();
  private _apiCallsSource = new BehaviorSubject<number>(0);
  apiCalls$ = this._apiCallsSource.asObservable();
  private _routesSource = new BehaviorSubject<any>([]);
  routesCalled$ = this._routesSource.asObservable();

  constructor() {}

  pagesChange(pageCount: number) {
    this._pagesSource.next(pageCount);
  }

  uptimeChange(uptimeSeconds: number) {
    this._uptimeSource.next(uptimeSeconds);
  }

  apiCallsChange(apiCalls: number) {
    this._apiCallsSource.next(apiCalls);
  }

  routesCalledChange(data: any) {
    this._routesSource.next(data);
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);  

    this.socket.on('server uptime', (data: number) => {
      this.uptimeChange(data);
    });

    this.socket.on('page count update', (data: number) => {
      this.pagesChange(data);
    });

    this.socket.on('api call update', (data: number) => {
      this.apiCallsChange(data);
    });

    this.socket.on('routes array update', (data: any) => {
      this.routesCalledChange(data);
    });
  }



  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
