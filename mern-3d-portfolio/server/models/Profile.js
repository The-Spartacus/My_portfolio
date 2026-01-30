const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Level 1 Developer'
    },
    bio: {
        type: String,
        default: 'Waiting for mission briefing...'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    stats: [{
        label: String,
        value: Number,
        color: String
    }],
    socialLinks: {
        github: { type: String, default: 'https://github.com' },
        linkedin: { type: String, default: 'https://linkedin.com' },
        email: { type: String, default: 'mailto:contact@example.com' }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
