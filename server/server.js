import express from "express";
import bookingRouter from "./booking/booking.js";
import mongoose from "mongoose";
import { config } from "dotenv";
import http from "http";
import { Server } from "socket.io";

config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
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
});

//Booking service
app.use("/booking", bookingRouter);

server.listen(3000, () => {
  console.log("Server is up on port 3000");
});
