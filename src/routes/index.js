const { sendResponse, AppError } = require("../helpers/utils.js");
const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controllers.js");

const app = express();

/* GET home page. */

router.get("/", (req, res, next) => {
  carController.getCars(req, res, next);
});
// crate a new car
router.post("/", (req, res, next) => {
  carController.createCar(req, res, next);
});
// edit car
router.put("/:id", (req, res, next) => {
  carController.editCar(req, res, next);
});
// delete car
router.delete("/:id", (req, res, next) => {
  carController.deleteCar(req, res, next);
});

module.exports = router;
