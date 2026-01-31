const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, incrementVisits } = require('../controllers/profileController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getProfile);
router.put('/', protect, adminOnly, updateProfile); // PUT to root updates the singleton profile
router.post('/visit', incrementVisits); // Public increment visit

module.exports = router;
