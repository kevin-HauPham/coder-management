const { sendResponse, AppError } = require("../helpers/utils.js");
const Car = require("../models/Car.js");

const carController = {};

// Create a car
carController.createCar = async (req, res, next) => {
  try {
    const info = req.body;

    // Control your inputs
    if (!info || Object.keys(info).length === 0)
      throw new AppError(400, "Bad Request", "Create Car Error");

    // Mongoose query to create a new car
    const created = await Car.create(info);
    sendResponse(
      res,
      200,
      true,
      { car: created },
      null,
      "Create Car Successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get all cars with pagination and filtering
carController.getCars = async (req, res, next) => {
  try {
    // Optional filters from the query parameters
    const { make, model, year, size } = req.query;

    const filter = {};
    if (make) filter.make = make;
    if (model) filter.model = model;
    if (year) filter.release_date = year;
    if (size) filter.size = size;

    // Optional pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Find cars with filters and pagination
    const cars = await Car.find(filter).skip(skip).limit(limit);
    const totalCars = await Car.countDocuments(filter);

    sendResponse(
      res,
      200,
      true,
      { cars, page, totalCars },
      null,
      "Get Car List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Update a car
carController.editCar = async (req, res, next) => {
  try {
    // Get ID from request parameters
    const targetId = req.params.id;

    // Get update information from the request body
    const updateInfo = req.body;

    if (!targetId || !updateInfo || Object.keys(updateInfo).length === 0) {
      throw new AppError(400, "Bad Request", "Update Car Error");
    }

    // Options for updating
    const options = { new: true };

    // Mongoose query to find by ID and update
    const updatedCar = await Car.findByIdAndUpdate(
      targetId,
      updateInfo,
      options
    );

    if (!updatedCar)
      throw new AppError(404, "Car not found", "Update Car Error");

    sendResponse(
      res,
      200,
      true,
      { car: updatedCar },
      null,
      "Update Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Delete a car
carController.deleteCar = async (req, res, next) => {
  try {
    // Get ID from request parameters
    const targetId = req.params.id;

    if (!targetId) throw new AppError(400, "Bad Request", "Delete Car Error");

    // Mongoose query to find by ID and delete
    const deletedCar = await Car.findByIdAndDelete(targetId);

    if (!deletedCar)
      throw new AppError(404, "Car not found", "Delete Car Error");

    sendResponse(
      res,
      200,
      true,
      { car: deletedCar },
      null,
      "Delete Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

// Export the controller
module.exports = carController;
