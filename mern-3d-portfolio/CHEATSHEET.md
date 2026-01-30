# 🎮 BombSquad Portfolio - Quick Reference

## 🚀 Immediate Start
```bash
# 1. Start Backend
cd server
npm install
npm run seed    # Create admin (first time only)
npm run dev

# 2. Start Frontend (new terminal)
cd client
npm install
npm start
```

## 📂 Key File Locations

### Backend
- Routes: `server/routes/`
- Models: `server/models/`
- Controllers: `server/controllers/`
- Config: `server/.env`

### Frontend
- Pages: `client/src/pages/`
- Components: `client/src/components/`
- Context: `client/src/context/`
- Styles: `client/src/index.css`

## 🔑 Admin Access
- URL: http://localhost:3000/admin
- Default: admin@example.com / [from .env]
- Change in: `server/.env` → `ADMIN_EMAIL` & `ADMIN_PASSWORD`

## 🎮 Content Management

### Add New Project (via Admin Panel)
1. Login to admin
2. Go to "Missions" tab
3. Click "NEW MISSION"
4. Fill form → DEPLOY

### Project Categories
- web: Web Applications
- mobile: Mobile Apps
- ai: AI/Machine Learning
- 3d: 3D/Game Projects
- other: Other projects

### Difficulty Levels
- easy: Green gradient (Beginner)
- medium: Orange gradient (Intermediate) 
- hard: Red gradient (Advanced)

### Rarity Tiers (Skills)
- common: Gray, 1-2 stars
- rare: Blue, 3 stars
- epic: Purple, 4 stars
- legendary: Gold, 5 stars + animation

## 🛠️ Common Customizations

### Change Colors
Edit `client/src/index.css` - update CSS variables

### Update Hero Text
Edit `client/src/pages/Home.js` - look for "BombSquad" and hero section

### Add New Skill to 3D Keyboard
Edit `client/src/components/Keyboard3D.js` - modify `skills` array

### Change Player Stats
Edit `client/src/pages/Home.js` - About section, character stats

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB error | Check IP whitelist in Atlas |
| Login fails | Run `npm run seed` in server |
| 3D not loading | Enable WebGL in browser |
| Port conflict | Change PORT in server/.env |

## 🌐 Deployment Checklist
- [ ] MongoDB Atlas cluster created
- [ ] Connection string in .env
- [ ] Admin user seeded
- [ ] CORS origin updated
- [ ] Build optimized
- [ ] Environment variables set on host

## 📝 Useful Commands

```bash
# Reset Database
# WARNING: Deletes all projects!
cd server
node -e "require('mongoose').connect('...').then(() => require('./models/Project').deleteMany({}))"

# Create sample projects
curl -X POST http://localhost:5000/api/projects   -H "Content-Type: application/json"   -d '{"title":"Sample","description":"Test","technologies":["React"],"category":"web"}'
```

## 🎨 Tailwind Classes Cheat Sheet

```css
/* Gradients */
bg-gradient-to-r from-yellow-500 to-orange-600
bg-gradient-to-br from-blue-600 to-purple-700

/* Game Theme Colors */
text-yellow-500   /* Primary accent */
text-red-500      /* Admin/Danger */
text-green-500    /* Success/Live */
text-purple-500   /* Stats/Player */

/* Rarity Borders */
border-gray-500   /* Common */
border-blue-500   /* Rare */
border-purple-500 /* Epic */
border-yellow-500 /* Legendary */
```

## 🆘 Support
- Frontend Issues: Check browser console
- Backend Issues: Check terminal logs
- MongoDB Issues: Check Atlas Network Access

**Need Help?** Check README.md for detailed docs!