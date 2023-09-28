import { Component } from '@angular/core';
import { SocketService } from '../socket.service';
import { Theatre } from '../models/theatre.model';

@Component({
  selector: 'app-seatview',
  templateUrl: './seatview.component.html',
  styleUrls: ['./seatview.component.css']
})
export class SeatviewComponent {

  theater: Theatre | undefined ;

  constructor(private socketService: SocketService) {
    this.socketService.getAllSeats();
    this.socketService.document.subscribe((document) => {
      console.log("document: " + document);
      this.theater = document;
    });
   }

  onclick() {
    console.log("onclick");
    this.socketService.getAllSeats();
  }

  onSeatSelected(seat: any) {
    this.socketService.seatSelected(seat);
  }

}
