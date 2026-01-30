const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Skill = require('./models/Skill');

dotenv.config();

const skills = [
    { name: 'React.js', icon: '⚛️', color: '#61DAFB', rarity: 'legendary', power: 5, description: 'Component-based UI architecture master', damage: 95, speed: 90, order: 1 },
    { name: 'Node.js', icon: '🟢', color: '#339933', rarity: 'epic', power: 4, description: 'Server-side JavaScript runtime expert', damage: 85, speed: 80, order: 2 },
    { name: 'MongoDB', icon: '🍃', color: '#47A248', rarity: 'epic', power: 4, description: 'NoSQL database design and optimization', damage: 80, speed: 75, order: 3 },
    { name: 'Three.js', icon: '🎲', color: '#ffffff', rarity: 'rare', power: 4, description: '3D web graphics and WebGL programming', damage: 90, speed: 70, order: 4 },
    { name: 'Tailwind', icon: '🌊', color: '#06B6D4', rarity: 'common', power: 5, description: 'Utility-first CSS framework specialist', damage: 85, speed: 95, order: 5 },
    { name: 'TypeScript', icon: '📘', color: '#3178C6', rarity: 'rare', power: 4, description: 'Type-safe JavaScript development', damage: 88, speed: 82, order: 6 }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB');

        // Clear existing skills
        await Skill.deleteMany({});
        console.log('🗑️  Cleared existing skills');

        // Insert new skills
        await Skill.insertMany(skills);
        console.log('✅ Seeded skills successfully');

        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
