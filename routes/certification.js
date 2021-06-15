const express = require("express");
const certifrouter = express.Router();
const certificationController = require("../controllers/certificationController");
const {protect} = require('../middleware/auth');
var cors = require('cors');


certifrouter.post("/recieve",certificationController.create);
certifrouter.get("/display/:CourseId/:UserId",certificationController.get);
certifrouter.delete("/delete/:id",certificationController.delete);
certifrouter.get("/certifofuser/",protect,certificationController.certifofuser);
certifrouter.get("/detailcertif/:id",certificationController.detailcertif);

module.exports = certifrouter;