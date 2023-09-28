import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Theatre } from './models/theatre.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  document = this.socket.fromEvent<Theatre>('seats');


  constructor(private socket: Socket) { }

  getDocument() {
    this.socket.emit('seatSelected');
  }

  getAllSeats() {
    this.socket.emit('getallseats');
  }

  seatSelected(seat: any) {
    this.socket.emit('seatSelected', seat);
  }

}
