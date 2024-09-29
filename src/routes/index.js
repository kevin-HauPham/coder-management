const { sendResponse, AppError } = require("../helpers/utils.js");
const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controllers.js");

const app = express();

/* GET home page. */

router.get("/", (req, res, next) => {
  carController.getCars(req, res, next);
});

module.exports = router;
