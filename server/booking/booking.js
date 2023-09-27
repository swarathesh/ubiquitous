import express from "express";

import Cinema from "../model/cinemaSchema.js";

const router = express.Router();

//Return all movies
router.get("/", async (req, res) => {});

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
      ],
    });

    // Save the new cinema document to the database
    await newCinema.save();

    console.log("Document inserted:", result);
  } catch (err) {
    console.error("Error:", err);
  }
  return res.json(result);
});

router.post("/", async (req, res) => {});

export default router;
