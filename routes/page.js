const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const uploadMulter = require('../middleware/uploadImage');

const {addPage,updatePage,getPageDetails,getPages,getMyPages,deletePage,getAllPages,getPagesByCategory,getPagesbyName} = require('../controllers/page');

router.route("/add").post(protect,uploadMulter,addPage);
router.route("/update/:id").put(protect,updatePage);
router.route("/details/:id").get(protect,getPageDetails);
router.route("/getAll").get(protect,getPages);
router.route("/Allpages").get(protect,getAllPages);
router.route("/getMyPages").get(protect,getMyPages);
router.route("/delete/:id").delete(protect,deletePage);
router.route("/getPagesByCategory/:category").get(protect,getPagesByCategory);
router.route("/searchbyname/:name").get(getPagesbyName);

module.exports = router;