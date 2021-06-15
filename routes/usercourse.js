const express = require("express");
const usercourserouter = express.Router();
const usercourseController = require("../controllers/usercourseController");
const {protect} = require('../middleware/auth');
var cors = require('cors');


usercourserouter.post("/inscription",protect,usercourseController.create);
usercourserouter.get("/find/:CourseId",protect,usercourseController.find);
usercourserouter.get("/displaycourses",protect,cors(),usercourseController.displaycourses);
usercourserouter.put("/passquiz/:id",usercourseController.passquiz);
usercourserouter.get("/numberusers/:CourseId",cors(),usercourseController.numberusers);
usercourserouter.get("/verif/:id/:Index",protect,cors(),usercourseController.verif);
usercourserouter.get("/findusers/:CourseId",cors(),usercourseController.findusers);
usercourserouter.delete("/delete/:id",cors(),usercourseController.delete);
usercourserouter.get("/mostenrolled",cors(),usercourseController.mostenrolled);
usercourserouter.get("/userwillrecievecertif/:id",cors(),usercourseController.willrecieve);
usercourserouter.put("/updateshow/:id",usercourseController.update);
usercourserouter.get("/finduserstriAsc/:CourseId",cors(),usercourseController.finduserstriAsc);
usercourserouter.get("/learncourse/:id",usercourseController.learncourse);

module.exports = usercourserouter;