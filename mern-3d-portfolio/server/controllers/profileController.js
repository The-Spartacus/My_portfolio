const Profile = require('../models/Profile');

// @desc    Get profile data (Singleton)
// @route   GET /api/profile
// @access  Public
exports.getProfile = async (req, res) => {
    try {
        // Always fetch the first profile found. In single-user app, this is sufficient.
        let profile = await Profile.findOne();

        // If no profile exists, return default/empty structure or create one?
        // Let's just return null or empty object if not found, frontend handles defaults.
        if (!profile) {
            return res.status(200).json({ success: true, profile: null });
        }

        res.status(200).json({
            success: true,
            profile
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update or Create profile
// @route   PUT /api/profile
// @access  Private (Admin)
exports.updateProfile = async (req, res) => {
    try {
        const { title, bio, stats, socialLinks, avatar, isOnline } = req.body;

        // Find the profile
        let profile = await Profile.findOne();

        if (profile) {
            // Update
            profile.title = title || profile.title;
            profile.bio = bio || profile.bio;
            profile.stats = stats || profile.stats;
            profile.socialLinks = socialLinks || profile.socialLinks;
            // Allow empty string for avatar clearing, but use check if provided
            if (avatar !== undefined) profile.avatar = avatar;
            if (isOnline !== undefined) profile.isOnline = isOnline;

            const updatedProfile = await profile.save();
            return res.status(200).json({
                success: true,
                profile: updatedProfile,
                message: 'Profile updated successfully'
            });
        } else {
            // Create new
            profile = await Profile.create({
                title,
                bio,
                stats,
                socialLinks,
                avatar,
                isOnline,
                user: req.user._id
            });

            return res.status(201).json({
                success: true,
                profile,
                message: 'Profile created successfully'
            });
        }

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Increment visitor count
// @route   PUT /api/profile/visit
// @access  Public
exports.incrementVisits = async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            // If strictly no profile, maybe can't increment. But better to create one or fail silently?
            // Let's assume profile exists or create default
            profile = await Profile.create({ title: 'Default' });
        }

        profile.visitCount = (profile.visitCount || 0) + 1;
        await profile.save();

        res.status(200).json({ success: true, visitCount: profile.visitCount });
    } catch (error) {
        console.error('Error incrementing visits:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
