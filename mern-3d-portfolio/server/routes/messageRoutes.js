const express = require('express');
const router = express.Router();
const { getMessages, createMessage, deleteMessage, markAsRead } = require('../controllers/messageController');
const { protect, adminOnly: admin } = require('../middleware/auth');

router.get('/', protect, admin, getMessages);
router.post('/', createMessage);
router.delete('/:id', protect, admin, deleteMessage);
router.put('/:id/read', protect, admin, markAsRead);

module.exports = router;
