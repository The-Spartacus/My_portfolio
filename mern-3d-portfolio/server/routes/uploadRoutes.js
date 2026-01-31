const express = require('express');
const router = express.Router();
const { uploadImage, uploadMiddleware } = require('../controllers/uploadController');

router.post('/', uploadMiddleware, uploadImage);

module.exports = router;
