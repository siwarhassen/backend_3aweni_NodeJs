const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {addProject,updateProject,getProjectDetails,getProjects,getMyProjects,deleteProject} = require('../controllers/project');

router.route("/add").post(protect,addProject);
router.route("/update/:id").put(protect,updateProject);
router.route("/details/:id").get(protect,getProjectDetails);
router.route("/getAll/:iduser").get(protect,getProjects);
router.route("/getAll").get(protect,getMyProjects);
router.route("/delete/:id").delete(protect,deleteProject);

module.exports = router;