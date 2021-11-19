import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: any;
  private _usersSource = new BehaviorSubject<number>(0);
  users$ = this._usersSource.asObservable();
  private _uptimeSource = new BehaviorSubject<number>(0);
  uptime$ = this._uptimeSource.asObservable();

  constructor() {}

  usersChange(userCount: number) {
    console.log("new user count: " + userCount);
    this._usersSource.next(userCount);
  }

  uptimeChange(uptimeSeconds: number) {
    this._uptimeSource.next(uptimeSeconds);
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);  

    this.socket.on('server uptime', (data: number) => {
      console.log(data);
      this.uptimeChange(data);
    });

    this.socket.on('user count update', (data: number) => {
      console.log(data);
      this.usersChange(data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
