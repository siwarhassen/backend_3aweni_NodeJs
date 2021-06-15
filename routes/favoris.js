const express = require('express');
const favorisCtrl = require('../controllers/favorisController');
const router = express.Router();
const {protect} = require('../middleware/auth');
router.post('/addfavoris',protect,favorisCtrl.addfavoris);
router.use('/displayf',protect,favorisCtrl.fav);
router.use('/verififavoris/:iduser/:idcourse',favorisCtrl.onefavoris);
router.delete('/deletefavoris/:id', favorisCtrl.deletefavoris);
module.exports = router;