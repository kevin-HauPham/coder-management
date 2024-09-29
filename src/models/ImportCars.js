const mongoose = require("mongoose");
const csv = require("csvtojson");
const Car = require("../models/Car");

// Path to your CSV file
const csvFilePath = "../dataset";

// Function to validate if a value is a valid number
const validateNumber = (value, defaultValue = null) => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
};

// Function to import CSV data into MongoDB
const importCars = async () => {
  try {
    // Convert CSV to JSON
    const cars = await csv().fromFile(csvFilePath);

    // Map CSV data to Mongoose schema fields and validate/clean the data
    const formattedCars = cars.map((car) => ({
      make: car.Make,
      model: car.Model,
      release_date: validateNumber(car.Year),
      engine_fuel_type: car["Engine Fuel Type"],
      engine_hp: validateNumber(car["Engine HP"], 0), // Default to 0 if invalid
      engine_cylinders: validateNumber(car["Engine Cylinders"], 0), // Default to 0 if invalid
      transmission_type: car["Transmission Type"],
      driven_wheels: car.Driven_Wheels,
      number_of_doors: validateNumber(car["Number of Doors"], 4), // Default to 4 if invalid
      market_category: car["Market Category"] || "Unknown",
      size: car["Vehicle Size"],
      style: car["Vehicle Style"],
      highway_mpg: validateNumber(car["highway MPG"], 0), // Default to 0 if invalid
      city_mpg: validateNumber(car["city mpg"], 0), // Default to 0 if invalid
      popularity: validateNumber(car.Popularity, 0), // Default to 0 if invalid
      price: validateNumber(car.MSRP, 0), // Default to 0 if invalid
    }));

    // Insert data into MongoDB
    await Car.insertMany(formattedCars);
    console.log("Data successfully imported!");
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the import function
importCars();
