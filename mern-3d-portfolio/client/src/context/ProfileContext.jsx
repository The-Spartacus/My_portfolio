import { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "../api/axios";
import toast from 'react-hot-toast';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/profile");

            if (res.data?.success && res.data.profile) {
                // Merge backend profile with default structure to ensure all fields exist
                setProfile({ ...defaultProfile, ...res.data.profile });
            } else {
                setProfile(defaultProfile);
            }
        } catch (err) {
            setProfile(defaultProfile);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProfile = async (profileData) => {
        try {
            const res = await axios.put('/api/profile', profileData);
            if (res.data.success) {
                setProfile({ ...defaultProfile, ...res.data.profile });
                toast.success('Profile updated successfully!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
            return false;
        }
    };

    const incrementVisits = async () => {
        try {
            const res = await axios.post('/api/profile/visit');
            if (res.data.success && res.data.visitCount) {
                setProfile(prev => ({ ...prev, visitCount: res.data.visitCount }));
            }
        } catch (error) {
            console.error('Failed to increment visits:', error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return (
        <ProfileContext.Provider value={{
            profile,
            loading,
            fetchProfile,
            updateProfile,
            incrementVisits
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);

const defaultProfile = {
    username: "VAISHNAV",
    title: "Full-Stack Architect",
    bio: "Ready for deployment.",
    avatar: "/avatar/dev.png",
    isOnline: true,
    visitCount: 1337,
    level: 99,
    levelProgress: 85,

    specializations: [
        "Frontend DPS",
        "Backend Tank",
        "Security Mage",
        "AI Alchemist",
    ],

    stats: [
        { label: "CODE XP", value: 88, color: "bg-yellow-500" },
        { label: "LOGIC", value: 92, color: "bg-blue-500" },
        { label: "DEBUG", value: 85, color: "bg-red-500" },
        { label: "ARCH", value: 78, color: "bg-purple-500" },
    ],

    tools: ["React", "Node.js", "MongoDB", "Linux", "Docker"],

    // Portfolio Details
    location: "Cyber City, IN",
    resumeUrl: "#",
    socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "mailto:dev@example.com"
    }
};
