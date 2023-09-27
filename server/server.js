import express from "express";
import bookingRouter from "./booking/booking.js";
import mongoose from "mongoose";
import { config } from "dotenv";

config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//Booking service
app.use("/booking", bookingRouter);

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
