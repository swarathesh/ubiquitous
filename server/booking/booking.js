import express from "express";

import Cinema from "../model/cinemaSchema.js";

const router = express.Router();

/**
 * Returns the cinema object with the given name.
 * @param {Object} req - The request object.
 * @returns {string} The value of the 'name' property.
 */
// Get information about a cinema by name
router.get("/:id", async (req, res) => {
  // Get the name of the cinema from the URL
  const name = req.params.id;
  try {
    // Find the cinema in the database by name
    Cinema.findOne({ name: name }).then((doc) => {
      // Return the cinema info as JSON
      return res.status(200).json(doc);
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a new cinema document
/**
 * Creates a new cinema object with the given name, address, seating capacity, and screen details.
 * @param {string} name - The name of the cinema.
 * @param {string} address - The address of the cinema.
 * @param {number} totalseats - The total number of seats in the cinema.
 * @returns {Cinema} - A new Cinema object.
 */
router.post("/initiate", async (req, res) => {
  const { name, address } = req.body;
  let result = {};

  try {
    const numRows = 5; // Number of rows
    const numColumns = 8; // Number of columns

    // Define an array of row identifiers (e.g., 'A', 'B', 'C', ...)
    const rowIdentifiers = ["A", "B", "C", "D", "E"];

    // Create an array to store the generated seat IDs
    let seatIds = [];
    let totalseats = [];

    // Loop through rows
    for (let row = 0; row < numRows; row++) {
      const rowIdentifier = rowIdentifiers[row];

      // Loop through columns
      for (let column = 1; column <= numColumns; column++) {
        // Generate a seat ID by combining the row identifier and column number
        const seatId = `${rowIdentifier}${column}`;

        // Push the generated seat ID to the array
        seatIds.push({
          seat_id: seatId,
          isBooked: false,
        });
      }
      totalseats.push(seatIds);
      seatIds = [];
    }

    const newCinema = new Cinema({
      name: name,
      address: address,
      seating_capacity: 50,
      screens: [
        {
          screen_number: 1,
          seating_arrangement: totalseats,
        },
        {
          screen_number: 2,
          seating_arrangement: totalseats,
        },
        {
          screen_number: 3,
          seating_arrangement: totalseats,
        },
      ],
    });

    // Save the new cinema document to the database
    await newCinema.save().then((doc) => {
      return res.status(201).json(doc);
    });

    console.log("Document inserted:", result);
  } catch (err) {
    console.error("Error:", err);
  }
});

/**
 * Finds the seat object with the given seat number from the seating arrangement array.
 * @param {number} seatNumber - The seat number to search for.
 * @returns {object} - The seat object with the given seat number.
 */
router.post("/seats", async (req, res) => {
  const { name, screenNumber, seatNumber } = req.body;

  try {
    Cinema.findOne({ name: name }).then((cinema) => {
      if (!cinema) {
        console.error("Cinema not found");
        return res.status(500).json({ error: "Cinema not found" });
      }

      const seat_number = cinema.screens.flat().find((seat) => {
        return seat.screen_number === screenNumber;
      });

      if (!seat_number) {
        console.error("screen number not found");
        return res.status(500).json({ error: "screen number not found" });
      }

      const seat = seat_number.seating_arrangement.flat().find((seat) => {
        return seat.seat_id === seatNumber;
      });

      // if (seat.isBooked) {
      //   return res.status(500).json({ error: "Seat is already booked" });
      // }

      seat.isBooked = !seat.isBooked ;

      cinema.save().then((doc) => {
        return res.status(200).json(doc);
      });
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
