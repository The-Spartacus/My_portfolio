const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        default: '⚡'
    },
    logoUrl: {
        type: String,
        default: ''
    },
    rarity: {
        type: String,
        enum: ['legendary', 'epic', 'rare', 'common'],
        default: 'common'
    },
    power: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    description: {
        type: String,
        required: true
    },
    damage: {
        type: Number,
        min: 0,
        max: 100,
        default: 50
    },
    speed: {
        type: Number,
        min: 0,
        max: 100,
        default: 50
    },
    order: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: '#3b82f6'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
