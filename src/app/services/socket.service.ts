import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  constructor() {
    // establish two-way connection with socket.io server
    this.socket = io('https://mst-full-stack-dev-test.herokuapp.com/');
  }

  onDataUpdate(): Observable<any> {
    return new Observable((observer) => {
      // listen for the 'data-update' event
      this.socket.on('data-update', (data: any) => {
        observer.next(data);
      });
    });
  }
}
