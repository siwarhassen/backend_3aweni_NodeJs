const express = require("express");
const groupmemberrouter = express.Router();
const groupmemberController = require("../controllers/GroupMemberController");

var cors = require('cors');


groupmemberrouter.post("/join",groupmemberController.join);
groupmemberrouter.get("/members/:groupid",groupmemberController.members);
groupmemberrouter.get("/member/:id",groupmemberController.member);
groupmemberrouter.put("/updaterole/:id",groupmemberController.updaterole);
groupmemberrouter.delete("/leave/:id",groupmemberController.leave);
groupmemberrouter.get("/groupsjoined/:id",groupmemberController.groupsofmember);


module.exports = groupmemberrouter;