const Message = require('../models/Message');

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a message
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = await Message.create({ name, email, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        await message.deleteOne();
        res.status(200).json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
exports.markAsRead = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        message.read = true;
        await message.save();
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
