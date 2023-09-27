import { Schema  } from 'redis-om'

const seatSchema = new Schema('seats', {
    id: { type: 'string' },
    row: { type: 'string', path: '$.seat.row'  },
    seatNumber: { type: 'number', path: '$.seat.seatNumber' },
},{
    dataStructure: 'JSON'
  });

export default seatSchema;