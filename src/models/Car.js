const mongoose = require("mongoose");

// Extended carSchema to fit your CSV data
const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    release_date: {
      type: Number,
      min: 1900,
      required: true,
    },
    transmission_type: {
      type: String,
      enum: [
        "MANUAL",
        "AUTOMATIC",
        "AUTOMATED_MANUAL",
        "DIRECT_DRIVE",
        "UNKNOWN",
      ],
      required: true,
    },
    size: {
      type: String,
      enum: ["Compact", "Midsize", "Large"],
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    engine_fuel_type: String,
    engine_hp: Number,
    engine_cylinders: Number,
    driven_wheels: String,
    number_of_doors: Number,
    market_category: String,
    highway_mpg: Number,
    city_mpg: Number,
    popularity: Number,
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
