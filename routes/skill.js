const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {addSkill,updateSkill,getSkillDetails,getSkills,getMySkills,deleteSkill} = require('../controllers/skill');

router.route("/add").post(protect,addSkill);
router.route("/update/:id").put(protect,updateSkill);
router.route("/details/:id").get(protect,getSkillDetails);
router.route("/getAll/:iduser").get(protect,getSkills);
router.route("/getAll").get(protect,getMySkills);
router.route("/delete/:id").delete(protect,deleteSkill);

module.exports = router;