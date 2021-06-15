const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {add,numberFU,numberF,getFollower_user,getFollowerss,getMyFollowers,deleteFollower,getMyFollowers_limit,numberFollowers,number,getMyFollowers1} = require('../controllers/followuser');

router.route("/add/:id").post(protect,add);
router.route("/getAll/:iduser").get(protect,getFollowerss);
router.route("/getAllu/:id").get(protect,getFollower_user);
router.route("/getAll").get(protect,getMyFollowers);
router.route("/getFollowers").get(protect,getMyFollowers_limit);
router.route("/getFollowers1").get(protect,getMyFollowers1);
router.route("/delete/:id").delete(deleteFollower);
router.route("/numbers").get(protect,numberFollowers);
router.route("/numbers/:id").get(protect,number);
router.route("/numbersf").get(protect,numberF);
router.route("/numbersfu/:id").get(protect,numberFU);

module.exports = router;