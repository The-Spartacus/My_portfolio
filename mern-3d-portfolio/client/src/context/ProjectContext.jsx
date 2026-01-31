import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  // Fetch all projects
  const fetchProjects = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters);
      const res = await axios.get(`/api/projects?${params}`);
      setProjects(res.data.data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single project
  const fetchProject = async (id) => {
    try {
      const res = await axios.get(`/api/projects/${id}`);
      return res.data.data;
    } catch (error) {
      toast.error('Project not found');
      return null;
    }
  };

  // Create project (Admin only)
  const createProject = async (projectData) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/projects', projectData);
      setProjects([res.data.data, ...projects]);
      toast.success('Project created successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update project (Admin only)
  const updateProject = async (id, projectData) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/projects/${id}`, projectData);
      setProjects(projects.map(p => p._id === id ? res.data.data : p));
      toast.success('Project updated successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update project');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete project (Admin only)
  const deleteProject = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
      toast.success('Project deleted successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete project');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch admin stats
  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/stats');
      setStats(res.data.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        stats,
        fetchProjects,
        fetchProject,
        createProject,
        updateProject,
        deleteProject,
        fetchStats
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);