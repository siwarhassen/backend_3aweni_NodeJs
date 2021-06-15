const express = require('express');
const router = express.Router();
const uploadMulter = require('../middleware/uploadImage');

const {uploadimage} = require('../controllers/upload');

router.post('/uploadimage', uploadMulter, uploadimage)

module.exports = router;


