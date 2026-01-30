const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getProfile);
router.put('/', protect, adminOnly, updateProfile); // PUT to root updates the singleton profile

module.exports = router;
