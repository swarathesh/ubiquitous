export class Theatre {
  _id: string;
  name: string;
  address: string;
  seating_capacity: number;
  screens: Screen[];
  __v: number;

  constructor(_id: string, name: string, address: string, seating_capacity: number, screens: Screen[], __v: number) {
    this._id = _id;
    this.name = name;
    this.address = address;
    this.seating_capacity = seating_capacity;
    this.screens = screens;
    this.__v = __v;
  }
}

class Screen {
  _id: string;
  screen_number: number ;
  seating_arrangement: Seat[][] ;

  constructor(_id: string, screen_number: number, seating_arrangement: Seat[][]) {
    this._id = _id;
    this.screen_number = screen_number;
    this.seating_arrangement = seating_arrangement;
  }
}

class Seat {
  seat_id: string ;
  isBooked: boolean;
  _id: string ;

  constructor(seat_id: string, isBooked: boolean, _id: string) {
    this.seat_id = seat_id;
    this.isBooked = isBooked;
    this._id = _id;
  }
}


