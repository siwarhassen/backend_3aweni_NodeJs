const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const uploadMulter = require('../middleware/uploadImage');

const {addCv,getMyCvs,deleteCv} = require('../controllers/cv');

router.route("/add").post(protect,uploadMulter,addCv);
router.route("/getAll").get(protect,getMyCvs);
router.route("/delete/:id").delete(protect,deleteCv)


module.exports = router;