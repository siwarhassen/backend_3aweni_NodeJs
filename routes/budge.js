const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {add,update,getDetails,getAll,getMyBudges,deleteBudge} = require('../controllers/budge');

router.route("/add").post(protect,add);
router.route("/update/:id").put(protect,update);
router.route("/details/:id").get(protect,getDetails);
router.route("/getAll").get(protect,getAll);
router.route("/getAll/:iduser").get(protect,getMyBudges);
router.route("/delete/:id").delete(protect,deleteBudge);

module.exports = router;