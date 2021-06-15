const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {addEducation,updateEducation,getEducationDetails,getEducations,getMyEducations,deleteEducation} = require('../controllers/education');

router.route("/add").post(protect,addEducation);
router.route("/update/:id").put(protect,updateEducation);
router.route("/details/:id").get(protect,getEducationDetails);
router.route("/getAll/:iduser").get(protect,getEducations);
router.route("/getAll").get(protect,getMyEducations);
router.route("/delete/:id").delete(protect,deleteEducation);

module.exports = router;