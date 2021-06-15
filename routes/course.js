const express = require("express");
const courserouter = express.Router();
const courseController = require("../controllers/courseController");
const parser=require('../Api/cloudinary');
const {protect} = require('../middleware/auth');
const multer =require('multer');
var cors = require('cors');
var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, 'uploads/');    
    }, 
    filename: function (req, file, cb) { 
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
       cb(null , file.originalname);   
    }
 });


 
const upload=multer({storage: storage});

courserouter.post("/add",cors(),protect,parser.single('Photo'), courseController.create);
courserouter.put("/update/:id",cors(),parser.single('Photo'), courseController.update);
courserouter.get("/",cors(), courseController.get);
courserouter.get("/similair/:Category/:Level",cors(), courseController.similaircourses);
courserouter.get("/detail/:id",cors(), courseController.detailcourse);
courserouter.delete("/delete/:id", courseController.deletecourse);
courserouter.get("/displayquiz/:id",cors(), courseController.displayquiz);
courserouter.get("/coursesbyuser",protect,cors(), courseController.coursesbyuser);
courserouter.get("/searchnamelike/:Name",cors(), courseController.searchlikename);
courserouter.get("/filterbylevel/:Level",cors(), courseController.filterbylevel);
courserouter.post("/googledrive",cors(), courseController.google);
courserouter.get("/listofcoursesbyuser/:UserId",cors(), courseController.listofcoursesbyuser);
module.exports = courserouter;