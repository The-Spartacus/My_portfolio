import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/profile');
            if (res.data.success && res.data.profile) {
                setProfile(res.data.profile);
            } else {
                // Default profile if none exists
                setProfile({
                    title: 'Level 1 Developer',
                    bio: 'Ready for action.',
                    stats: [
                        { label: 'XP', value: 0, color: 'bg-yellow-500' },
                        { label: 'INT', value: 50, color: 'bg-blue-500' },
                        { label: 'STR', value: 50, color: 'bg-red-500' },
                    ]
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            // toast.error('Failed to load profile'); // Silent fail is better for public view
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProfile = async (profileData) => {
        try {
            const res = await axios.put('/api/profile', profileData);
            if (res.data.success) {
                setProfile(res.data.profile);
                toast.success('Profile updated successfully!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
            return false;
        }
    };

    return (
        <ProfileContext.Provider value={{
            profile,
            loading,
            fetchProfile,
            updateProfile
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
