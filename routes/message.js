const express = require("express");
const messagerouter = express.Router();
const messageController = require("../controllers/MessageController");

var cors = require('cors');


messagerouter.post("/create",messageController.create);
messagerouter.get("/showmessage/:userid",messageController.getallmessages);
messagerouter.get("/:idsender/:idreceiver",messageController.get);
messagerouter.get("/last/:idsender/:idreceiver",messageController.getlastmessage);
messagerouter.put("/deleteforsender/:idmessage",messageController.deleteforsender);
messagerouter.put("/deleteforreceiver/:idmessage",messageController.deleteforreceiver);
messagerouter.put("/deleteforboth/:idmessage",messageController.deleteforboth);
module.exports = messagerouter;