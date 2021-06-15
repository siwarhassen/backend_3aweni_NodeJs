const express = require("express");
const grouprouter = express.Router();
const groupController = require("../controllers/GroupController");

var cors = require('cors');


grouprouter.post("/create",groupController.create);
grouprouter.get("",groupController.get);
grouprouter.get("/group/:group_id",groupController.showonegroup);
grouprouter.get("/newest",groupController.recently);
grouprouter.put("/update/:group_id",groupController.updategroup);
grouprouter.delete("/deletegroup/:group_id",groupController.deletegroup);
grouprouter.get("/search/:name",groupController.displaygroup);
grouprouter.get("/mygroups/:owner",groupController.mygroups);

module.exports = grouprouter;