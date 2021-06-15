const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {add,getFollowers,getMyFollowers,deleteFollower,numberFollowers,getFollower_user,number,get,getMyFollowers_limit} = require('../controllers/followpage');

router.route("/add/:id").post(protect,add);
router.route("/getAll/:iduser").get(protect,getFollowers);
router.route("/getAll").get(protect,getMyFollowers);
router.route("/delete/:id").delete(protect,deleteFollower);
router.route("/numbers").get(protect,numberFollowers);
router.route("/getFollowers").get(protect,getMyFollowers_limit);
router.route("/numbers/:id").get(protect,number);
router.route("/get/:id").get(protect,getFollower_user);
router.route("/getN").get(protect,get);

module.exports = router;