const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');

const {add,getcategories,filterBycategories} = require('../controllers/PageCategory');

router.route("/add").post(protect,add);
router.route("/getAll").get(protect,getcategories);
router.route("/filter/:name").get(protect,filterBycategories);
module.exports = router;