const express = require("express");
const recorouter = express.Router();
const recoController = require("../controllers/recoController");

var cors = require('cors');


recorouter.post("/:id",recoController.reco);
recorouter.put("/refreshfile/up",recoController.refresh);

module.exports = recorouter;