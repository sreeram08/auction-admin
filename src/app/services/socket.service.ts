import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket;
  constructor() { }
  initiateSocket() {
    this.socket = io(env.SOCKET_URL)
  }
}
