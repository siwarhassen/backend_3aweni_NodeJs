const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {add,update,getDetails,getAll,getByName,deleteQuiz} = require('../controllers/quiz');

router.route("/add").post(protect,add);
router.route("/update/:id").put(protect,update);
router.route("/details/:id").get(protect,getDetails);
router.route("/getAll").get(protect,getAll);
router.route("/getAll/:name").get(protect,getByName);
router.route("/delete/:id").delete(protect,deleteQuiz);

module.exports = router;