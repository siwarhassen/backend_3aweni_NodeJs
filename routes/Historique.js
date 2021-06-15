const express = require("express");
const historiquerouter = express.Router();
const historiqueController = require("../controllers/HistoriqueController");
var cors = require('cors');


historiquerouter.post("/add",historiqueController.create);
historiquerouter.get("/:groupid",cors(), historiqueController.get);


module.exports = historiquerouter;