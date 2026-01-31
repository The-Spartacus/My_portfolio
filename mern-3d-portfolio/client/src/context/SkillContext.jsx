import { createContext, useState, useContext, useCallback } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSkills = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/skills');
            if (res.data.success) {
                setSkills(res.data.skills);
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
            toast.error('Failed to load skills');
        } finally {
            setLoading(false);
        }
    }, []);

    const createSkill = async (skillData) => {
        try {
            const res = await axios.post('/api/skills', skillData);
            if (res.data.success) {
                setSkills([...skills, res.data.skill]);
                toast.success('Skill added successfully!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create skill');
            return false;
        }
    };

    const updateSkill = async (id, skillData) => {
        try {
            const res = await axios.put(`/api/skills/${id}`, skillData);
            if (res.data.success) {
                setSkills(skills.map(s => s._id === id ? res.data.skill : s));
                toast.success('Skill updated successfully!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update skill');
            return false;
        }
    };

    const deleteSkill = async (id) => {
        try {
            const res = await axios.delete(`/api/skills/${id}`);
            if (res.data.success) {
                setSkills(skills.filter(s => s._id !== id));
                toast.success('Skill deleted successfully!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete skill');
            return false;
        }
    };

    return (
        <SkillContext.Provider value={{
            skills,
            loading,
            fetchSkills,
            createSkill,
            updateSkill,
            deleteSkill
        }}>
            {children}
        </SkillContext.Provider>
    );
};

export const useSkills = () => useContext(SkillContext);
