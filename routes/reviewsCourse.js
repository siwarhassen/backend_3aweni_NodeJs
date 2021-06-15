const express = require("express");
const reviewsrouter = express.Router();
const reviewsController = require("../controllers/reviewsCourseController");
const {protect} = require('../middleware/auth');
var cors = require('cors');


reviewsrouter.post("/add",protect,reviewsController.create);
reviewsrouter.delete("/delete/:id", reviewsController.delete);
reviewsrouter.get("/:course_id", reviewsController.get);
reviewsrouter.get("/count/:course_id",cors(), reviewsController.count);
reviewsrouter.put("/update/:id", reviewsController.update);
reviewsrouter.get("/average/:course_id",cors(), reviewsController.average);
reviewsrouter.get("/finereview/:id", reviewsController.finereview);

module.exports = reviewsrouter;