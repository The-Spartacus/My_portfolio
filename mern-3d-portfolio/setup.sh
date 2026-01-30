#!/bin/bash

echo "🎮 BombSquad Portfolio Setup Script"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit
fi

echo "✅ Node.js detected: $(node -v)"
echo ""

# Setup Backend
echo "🚀 Setting up Backend..."
cd server
npm install

if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit server/.env with your MongoDB credentials!"
fi

echo "✅ Backend setup complete"
echo ""

# Setup Frontend
echo "🎨 Setting up Frontend..."
cd ../client
npm install

echo "✅ Frontend setup complete"
echo ""

# Instructions
echo "📋 NEXT STEPS:"
echo "=============="
echo ""
echo "1. Configure MongoDB:"
echo "   - Edit server/.env and add your MONGODB_URI"
echo "   - Get free cluster at mongodb.com"
echo ""
echo "2. Create Admin User:"
echo "   cd server"
echo "   npm run seed"
echo ""
echo "3. Start Development:"
echo "   Terminal 1: cd server && npm run dev"
echo "   Terminal 2: cd client && npm start"
echo ""
echo "4. Access Application:"
echo "   Portfolio: http://localhost:3000"
echo "   Admin: http://localhost:3000/admin"
echo ""
echo "🎮 Ready to deploy? Check README.md for deployment guide!"
