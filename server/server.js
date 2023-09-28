import express from "express";
import bookingRouter from "./booking/booking.js";
import mongoose from "mongoose";
import { config } from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { get } from "mongoose";
import Cinema from "./model/cinemaSchema.js";

config();
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: 'http://localhost:4200',
  },
});
app.use(express.json());


const url = process.env.MONGODB_URL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("seatSelected", (data) => {
    const {  seat_id } = data;
    const seatNumber = seat_id;
    const screenNumber = 1;
    console.log(data);
    Cinema.findOne({ name: 'cineplex brampton' }).then((cinema) => {
      if (!cinema) {
        console.error("Cinema not found");
      }

      const seat_number = cinema.screens.flat().find((seat) => {
        return seat.screen_number === screenNumber;
      });

      if (!seat_number) {
        console.error("screen number not found");
      }

      const seat = seat_number.seating_arrangement.flat().find((seat) => {
        return seat.seat_id === seatNumber;
      });

      // if (seat.isBooked) {
      //   return res.status(500).json({ error: "Seat is already booked" });
      // }

      seat.isBooked = !seat.isBooked ;

      cinema.save().then((doc) => {
        io.emit("seats", doc);
      });
    });
  })

  socket.on("getallseats", (data) => {
    console.log("get all seats");
    Cinema.findOne({ name: 'cineplex brampton' }).then((doc) => {
      console.log(doc);
      io.emit("seats", doc);
    });
  });
  
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});




//Booking service
app.use("/booking", bookingRouter);

server.listen(3000, () => {
  console.log("Server is up on port 3000");
});
