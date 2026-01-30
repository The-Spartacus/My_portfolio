const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const Project = require('../models/Project');

    const totalProjects = await Project.countDocuments();
    const featuredProjects = await Project.countDocuments({ featured: true });
    const webProjects = await Project.countDocuments({ category: 'web' });
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt category');

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        featuredProjects,
        webProjects,
        recentProjects
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
});

module.exports = router;