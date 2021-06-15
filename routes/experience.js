const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {addExperience,updateExperience,getExperienceDetails,getExperiences,getMyExperiences,deleteExperience} = require('../controllers/experience');

router.route("/add").post(protect,addExperience);
router.route("/update/:id").put(protect,updateExperience);
router.route("/details/:id").get(protect,getExperienceDetails);
router.route("/getAll/:iduser").get(protect,getExperiences);
router.route("/getAll").get(protect,getMyExperiences);
router.route("/delete/:id").delete(protect,deleteExperience);

module.exports = router;