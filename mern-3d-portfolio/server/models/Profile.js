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
    specializations: {
        type: [String],
        default: ['Frontend', 'Backend']
    },
    playerClass: {
        type: String,
        default: 'Developer'
    },
    rank: {
        type: String,
        default: 'Rookie'
    },
    socialLinks: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' },
        email: { type: String, default: '' }
    },
    resumeUrl: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: 'Earth'
    },
    avatar: {
        type: String,
        default: ''
    },
    visitCount: {
        type: Number,
        default: 0
    },
    isOnline: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
