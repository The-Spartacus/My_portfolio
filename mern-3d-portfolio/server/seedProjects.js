const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const sampleProjects = [
  {
    title: 'BombSquad Portfolio',
    description: 'A game-inspired interactive portfolio featuring 3D animations, particle systems, and immersive UI. Built with MERN stack and Three.js.',
    technologies: ['React', 'Three.js', 'Node.js', 'MongoDB', 'Tailwind'],
    category: 'web',
    difficulty: 'hard',
    featured: true,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/bombsquad-portfolio',
    order: 1
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured online store with real-time inventory, payment processing, and admin dashboard.',
    technologies: ['Next.js', 'Stripe', 'MongoDB', 'Redux'],
    category: 'web',
    difficulty: 'medium',
    featured: false,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/ecommerce',
    order: 2
  },
  {
    title: 'AI Image Generator',
    description: 'Machine learning powered image generation tool using Stable Diffusion and OpenAI APIs.',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    category: 'ai',
    difficulty: 'hard',
    featured: true,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/ai-generator',
    order: 3
  },
  {
    title: '3D Product Configurator',
    description: 'Interactive 3D product viewer with custom material and color options.',
    technologies: ['Three.js', 'Vue.js', 'Node.js', 'WebGL'],
    category: '3d',
    difficulty: 'medium',
    featured: false,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/3d-configurator',
    order: 4
  },
  {
    title: 'Social Media App',
    description: 'Mobile-first social platform with real-time messaging and story features.',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
    category: 'mobile',
    difficulty: 'medium',
    featured: false,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/social-app',
    order: 5
  }
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📡 Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log(`✅ Inserted ${sampleProjects.length} sample projects`);

    console.log('\n🎮 Sample Projects:');
    sampleProjects.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.title} (${p.category.toUpperCase()})`);
    });

    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

// Run if executed directly
if (require.main === module) {
  seedProjects();
}

module.exports = seedProjects;