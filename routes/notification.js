const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {add,getNotifs,getMyNotifs,deleteNotif,getMyNotifs1,getAllMyNotifs,getMyNotifs2} = require('../controllers/notifications');

router.route("/add/:id").post(protect,add);
router.route("/getAll/:iduser").get(protect,getNotifs);
router.route("/getAll").get(protect,getMyNotifs);
router.route("/getAll1").get(protect,getMyNotifs1);
router.route("/getAll2").get(protect,getMyNotifs2);
router.route("/getNotif").get(protect,getAllMyNotifs);
router.route("/delete/:id").delete(protect,deleteNotif);

module.exports = router;