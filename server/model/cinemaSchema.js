import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Cinema schema
const cinemaSchema = new Schema({
  name: String,
  address: String,
  seating_capacity: Number,
  screens: [
    {
      screen_number: Number,
      seating_arrangement: [
        [
          {
            seat_id: String,
            isBooked: Boolean,
          }
        ]
      ]
    }
  ]
});

// Create a Cinema model based on the schema
const Cinema = mongoose.model("Cinema", cinemaSchema);

export default Cinema;
