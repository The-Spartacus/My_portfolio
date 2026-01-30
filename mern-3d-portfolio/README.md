# 🎮 BombSquad Portfolio

**A MERN Stack Game-Inspired Portfolio with Admin Panel**

![Portfolio Preview](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge)

---

## 🎯 Features

### 🎮 **Game-Inspired Design**
- **START GAME** - View Projects as "Levels"
- **INVENTORY** - Skills as collectible items with rarity tiers
- **PLAYER PROFILE** - Stats and experience system
- **SIGNAL TOWER** - Contact form with game aesthetics
- **Command Center** - Admin panel with secure access

### 🛠 **Technical Stack**
- **Frontend**: React 18, Three.js/React Three Fiber, GSAP, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT with bcrypt
- **3D Graphics**: Interactive floating skill keyboard
- **Animations**: Particle system, GSAP scroll triggers

### 🔒 **Admin Features**
- Secure JWT authentication
- Create/Edit/Delete projects
- Real-time dashboard stats
- Featured projects (Legendary quests)
- Category management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Setup
```bash
git clone <your-repo>
cd mern-3d-portfolio
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in `/server`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bombsquad-portfolio
JWT_SECRET=your_super_secret_key_here_change_this
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

Create admin user:
```bash
npm run seed
```

Start server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm start
```

### 4. Access Application
- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

Login credentials (from .env):
- Email: `admin@example.com`
- Password: (your `ADMIN_PASSWORD`)

---

## 📁 Project Structure

```
mern-3d-portfolio/
├── server/
│   ├── config/         # Database config
│   ├── controllers/    # Business logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Auth middleware
│   ├── .env.example    # Environment template
│   ├── seeder.js       # Admin creation script
│   └── server.js       # Entry point
│
├── client/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React context (Auth, Projects)
│   │   ├── pages/      # Main pages
│   │   ├── App.js      # Router setup
│   │   └── index.css   # Tailwind styles
│   └── package.json
│
└── README.md
```

---

## 🎮 Game Theme Elements

| UI Element | Game Equivalent |
|------------|-----------------|
| Projects | Game Levels |
| Skills | Inventory Items |
| Featured | Legendary Quests |
| Admin Panel | Command Center |
| Contact Form | Signal Tower |
| About Page | Player Profile |

### Rarity System
- ⚪ **Common** - Gray border
- 🔵 **Rare** - Blue glow
- 🟣 **Epic** - Purple glow  
- 🟡 **Legendary** - Gold border + animation

---

## 🔌 API Endpoints

### Authentication
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/register` | Create admin (run once) |

### Projects
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/projects` | No | Get all projects |
| GET | `/api/projects/:id` | No | Get single project |
| POST | `/api/projects` | Yes | Create project |
| PUT | `/api/projects/:id` | Yes | Update project |
| DELETE | `/api/projects/:id` | Yes | Delete project |

### Admin
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/admin/stats` | Yes | Dashboard statistics |

---

## 🎨 Customization Guide

### 1. **Change Game Theme Colors**
Edit `client/src/index.css`:
```css
:root {
  --primary: #3b82f6;    /* Change blue accent */
  --rare: #8b5cf6;       /* Change rare items */
  --legendary: #eab308;  /* Change legendary */
}
```

### 2. **Update Skill Data**
Edit `client/src/pages/Home.js`, find the `skills` array (~line 20):
```javascript
const skills = [
  { 
    name: 'Your Skill', 
    icon: '🔥', 
    rarity: 'legendary', 
    power: 5,
    description: 'Your description',
    damage: 100, 
    speed: 90 
  }
];
```

### 3. **Update 3D Keyboard**
Edit `client/src/components/Keyboard3D.js`, modify the `skills` array (~line 9).

### 4. **Player Stats**
Edit `client/src/pages/Home.js`, About section (~line 180):
```javascript
<div className="text-2xl font-bold text-white font-space">Your Name</div>
<p className="text-purple-400 font-mono">Your Title</p>
```

### 5. **Add New Project Fields**
Edit `server/models/Project.js` to add fields, then update the form in `AdminDashboard.js`.

---

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create account at [mongodb.com](https://mongodb.com)
2. Create cluster → Database Access → Create user
3. Network Access → Allow from anywhere
4. Get connection string
5. Add to `.env` file

### Backend Deployment (Render/Railway)
```bash
cd server
# Push to GitHub
git push origin main
# Connect to Render or Railway
# Add environment variables
# Deploy
```

### Frontend Deployment (Vercel)
```bash
cd client
# Update package.json proxy to deployed backend URL
npm run build
# Or directly deploy to Vercel
vercel --prod
```

---

## 🎓 Learning Resources

**Three.js in React**: [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
**GSAP Animations**: [GSAP Documentation](https://greensock.com/docs/)
**MongoDB**: [MongoDB University](https://university.mongodb.com/)

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if IP is whitelisted in MongoDB Atlas
- Verify connection string format
- Ensure password doesn't have special characters needing URL encoding

### Admin Login Not Working
- Run `npm run seed` in server directory
- Check if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in `.env`
- Clear browser localStorage and try again

### 3D Scene Not Loading
- Check console for Three.js errors
- Ensure WebGL is enabled in browser
- Try disabling hardware acceleration

---

## 📄 License

MIT License - feel free to use this for your portfolio!

---

## 🙏 Acknowledgments

- Original concept inspired by game menu UIs
- 3D keyboard concept from Naresh-Khatri's portfolio
- Particle system using Three.js
- Icons by React Icons

**Crafted with 💣 and ☕ by BombSquad Team**

---

<div align="center">
  <h3>⭐ Star this repo if you found it helpful!</h3>
  <p>Deckard Cain would be proud of your quest log.</p>
</div>
