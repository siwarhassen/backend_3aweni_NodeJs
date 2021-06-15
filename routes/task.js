const express = require("express");
const grouprouter = express.Router();
const taskcontroller = require("../controllers/taskcontroller");

var cors = require('cors');


grouprouter.post("/add",taskcontroller.create);
grouprouter.get("/done/:group_id",taskcontroller.taskdone);
grouprouter.get("/doing/:group_id",taskcontroller.taskdoing);
grouprouter.get("/todo/:group_id",taskcontroller.tasktodo);
grouprouter.delete("/deletetask/:task_id",taskcontroller.deletetask);
grouprouter.put("/update/:id",taskcontroller.updatetask);
grouprouter.get("/:id",taskcontroller.taskname);
module.exports = grouprouter;