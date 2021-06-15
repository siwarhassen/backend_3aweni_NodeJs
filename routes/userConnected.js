const express = require("express");
const userConnectedrouter = express.Router();
const userConnectedController = require("../controllers/userConnectedControllers");
const {protect} = require('../middleware/auth');
var cors = require('cors');


userConnectedrouter.post("/add",protect,userConnectedController.create);
userConnectedrouter.delete("/delete/:userid", userConnectedController.delete);
userConnectedrouter.get("/",cors(), userConnectedController.get);
userConnectedrouter.get("/userconnected/:id",cors(),userConnectedController.getByUserId);

module.exports = userConnectedrouter;