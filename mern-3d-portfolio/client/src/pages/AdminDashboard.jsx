import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { FiPlus, FiTrash2, FiEdit3, FiX, FiSave } from 'react-icons/fi';
import { GiGamepad, GiTrophy, GiCog, GiExitDoor, GiSkills, GiCharacter } from 'react-icons/gi';
import { useSkills } from '../context/SkillContext';
import { useProfile } from '../context/ProfileContext';
import { useMessages } from '../context/MessageContext';
import SkillItem from '../components/SkillItem';
import toast from 'react-hot-toast';
import { FaEnvelope, FaTrash, FaCheck } from 'react-icons/fa';

const AdminDashboard = () => {
  const {
    projects,
    loading,
    stats,
    fetchStats,
    createProject,
    updateProject,
    deleteProject
  } = useProjects();
  const { logout } = useAuth();

  // Skills Context
  const { skills, fetchSkills, createSkill, updateSkill, deleteSkill } = useSkills();
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillFormData, setSkillFormData] = useState({
    name: '',
    icon: '⚡',
    rarity: 'common',
    power: 3,
    description: '',
    damage: 75,
    speed: 80,
    percentage: 50
  });

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Profile Context
  const { profile, fetchProfile, updateProfile } = useProfile();
  const [profileData, setProfileData] = useState({
    title: 'Level 1 Developer',
    bio: '',
    playerClass: 'Developer',
    rank: 'Rookie',
    specializations: [],
    socialLinks: { github: '', linkedin: '', email: '' },
    avatar: '',
    isOnline: false
  });

useEffect(() => {
  fetchProfile();
}, [fetchProfile]);

// Messages Context
const { messages, fetchMessages, deleteMessage, markAsRead } = useMessages();

useEffect(() => {
  fetchMessages();
}, [fetchMessages]);

useEffect(() => {
  if (profile) {
    setProfileData({
      title: profile.title || '',
      bio: profile.bio || '',
      playerClass: profile.playerClass || '',
      rank: profile.rank || '',
      specializations: profile.specializations || [],
      socialLinks: profile.socialLinks || { github: '', linkedin: '', email: '' },
      avatar: profile.avatar || '',
      isOnline: profile.isOnline || false
    });
  }
}, [profile]);

const handleProfileUpdate = async (e) => {
  e.preventDefault();
  await updateProfile(profileData);
};

const [newTag, setNewTag] = useState('');

const addTag = () => {
  if (!newTag.trim()) return;
  if (profileData.specializations && profileData.specializations.includes(newTag)) return;

  setProfileData({
    ...profileData,
    specializations: [...(profileData.specializations || []), newTag.trim()]
  });
  setNewTag('');
};

const removeTag = (tagToRemove) => {
  setProfileData({
    ...profileData,
    specializations: (profileData.specializations || []).filter(tag => tag !== tagToRemove)
  });
};

const [activeTab, setActiveTab] = useState('dashboard');
const [showModal, setShowModal] = useState(false);
const [editingProject, setEditingProject] = useState(null);
const [formData, setFormData] = useState({
  title: '',
  description: '',
  technologies: '',
  category: 'web',
  liveUrl: '',
  githubUrl: '',
  featured: false,
  difficulty: 'medium'
});

useEffect(() => {
  fetchStats();
}, [fetchStats]);

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    ...formData,
    technologies: formData.technologies.split(',').map(t => t.trim())
  };

  if (editingProject) {
    await updateProject(editingProject._id, data);
  } else {
    await createProject(data);
  }

  setShowModal(false);
  setEditingProject(null);
  resetForm();
};

const handleEdit = (project) => {
  setEditingProject(project);
  setFormData({
    title: project.title,
    description: project.description,
    technologies: project.technologies?.join(', '),
    category: project.category,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    featured: project.featured,
    difficulty: project.difficulty || 'medium'
  });
  setShowModal(true);
};

const handleDelete = async (id) => {
  if (window.confirm('⚠️ Are you sure you want to delete this mission?')) {
    await deleteProject(id);
    await fetchStats();
    await fetchStats();
  }
};

// Skill Handlers
const handleSkillSubmit = async (e) => {
  e.preventDefault();
  if (editingSkill) {
    await updateSkill(editingSkill._id, skillFormData);
  } else {
    await createSkill(skillFormData);
  }
  setShowModal(false);
  setEditingSkill(null);
  resetSkillForm();
};

const resetSkillForm = () => {
  setSkillFormData({
    name: '',
    icon: '⚡',
    rarity: 'common',
    power: 3,
    description: '',
    damage: 75,
    speed: 80,
    percentage: 50
  });
};

const resetForm = () => {
  setFormData({
    title: '',
    description: '',
    technologies: '',
    category: 'web',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    difficulty: 'medium'
  });
};

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  const uploadToast = toast.loading('Uploading image...');

  try {
    const res = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setProfileData({ ...profileData, avatar: res.data.url });
    toast.success('Image uploaded successfully', { id: uploadToast });
  } catch (error) {
    toast.error('Image upload failed', { id: uploadToast });
    console.error(error);
  }
};

return (
  <div className="min-h-screen bg-dark pt-20 pb-12">
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-space flex items-center gap-3">
            <GiCog className="text-yellow-500 animate-spin-slow" />
            COMMAND CENTER
          </h1>
          <p className="text-gray-500 font-mono mt-1">ADMINISTRATION PANEL v2.0</p>
        </div>
        <button
          onClick={logout}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-mono flex items-center gap-2 transition-colors"
        >
          <GiExitDoor />
          LOGOUT
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-gray-900/50 p-2 rounded-xl">
        {[
          { id: 'dashboard', label: '📊 DASHBOARD', icon: <GiGamepad /> },
          { id: 'projects', label: '🎮 MISSIONS', icon: <GiTrophy /> },
          { id: 'messages', label: '📨 MESSAGES', icon: <FaEnvelope /> },
          { id: 'skills', label: '⚡ SKILLS', icon: <GiSkills /> },
          { id: 'character', label: '👤 CHARACTER', icon: <GiCharacter /> },
          { id: 'settings', label: '⚙️ SYSTEM', icon: <GiCog /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
                flex-1 py-3 px-4 rounded-lg font-mono text-sm transition-all flex items-center justify-center gap-2
                ${activeTab === tab.id
                ? 'bg-yellow-500 text-black font-bold'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'}
              `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="TOTAL MISSIONS"
              value={stats?.totalProjects || 0}
              icon="🎮"
              color="blue"
            />
            <StatCard
              title="LEGENDARY QUESTS"
              value={stats?.featuredProjects || 0}
              icon="⭐"
              color="yellow"
            />
            <StatCard
              title="WEB DOMAINS"
              value={stats?.webProjects || 0}
              icon="🌐"
              color="green"
            />
            <StatCard
              title="EXPERIENCE"
              value={`${(stats?.totalProjects || 0) * 100}XP`}
              icon="✨"
              color="purple"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 font-space">📡 RECENT TRANSMISSIONS</h3>
            <div className="space-y-3">
              {stats?.recentProjects?.length > 0 ? (
                stats.recentProjects.map((project, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <span className="text-yellow-500 font-mono text-sm">#{idx + 1}</span>
                      <span className="text-white ml-3 font-bold">{project.title}</span>
                    </div>
                    <span className="text-gray-500 font-mono text-sm">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 font-mono text-center py-8">No recent missions found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white font-space">MISSION CONTROL</h2>
            <button
              onClick={() => {
                setEditingProject(null);
                resetForm();
                setShowModal(true);
              }}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-mono flex items-center gap-2 transition-colors"
            >
              <FiPlus />
              NEW MISSION
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto" />
              <p className="text-gray-500 font-mono mt-4">LOADING...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project._id} className="relative">
                  <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-mono text-gray-500">
                        LVL.{project.order || 1}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full font-mono">
                          ⭐ LEGENDARY
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-800">
                      <button
                        onClick={() => handleEdit(project)}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded font-mono transition-colors flex items-center justify-center gap-1"
                      >
                        <FiEdit3 />
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded font-mono transition-colors flex items-center justify-center gap-1"
                      >
                        <FiTrash2 />
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white font-space mb-6">INCOMING TRANSMISSIONS</h2>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-gray-400 font-mono text-sm uppercase">
                  <th className="p-4 border-b border-gray-700">Status</th>
                  <th className="p-4 border-b border-gray-700">Sender</th>
                  <th className="p-4 border-b border-gray-700">Message</th>
                  <th className="p-4 border-b border-gray-700">Date</th>
                  <th className="p-4 border-b border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <tr key={msg._id} className={`hover:bg-gray-800/50 transition-colors ${!msg.read ? 'bg-yellow-500/5' : ''}`}>
                      <td className="p-4">
                        {msg.read ? (
                          <span className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                            <FaCheck /> READ
                          </span>
                        ) : (
                          <button
                            onClick={() => markAsRead(msg._id)}
                            className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded font-mono hover:bg-yellow-500 hover:text-black transition-colors"
                          >
                            MARK READ
                          </button>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">{msg.name}</div>
                        <div className="text-gray-500 text-sm">{msg.email}</div>
                      </td>
                      <td className="p-4 text-gray-300 min-w-[200px]" title={msg.message}>
                        <div className="whitespace-pre-wrap">{msg.message}</div>
                      </td>
                      <td className="p-4 text-gray-500 font-mono text-sm">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            if (window.confirm('Delete message?')) deleteMessage(msg._id);
                          }}
                          className="text-red-500 hover:text-red-400 p-2 rounded hover:bg-red-500/10"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 font-mono">
                      NO TRANSMISSIONS RECEIVED
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SKILLS TAB */}
      {activeTab === 'skills' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white font-space">SKILL DATABASE</h2>
            <button
              onClick={() => {
                setEditingSkill(null);
                resetSkillForm();
                setShowModal(true);
              }}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-mono flex items-center gap-2 transition-colors"
            >
              <FiPlus />
              NEW SKILL
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skills.map(skill => (
              <SkillItem
                key={skill._id}
                skill={skill}
                isAdmin={true}
                onEdit={(s) => {
                  setEditingSkill(s);
                  setSkillFormData(s);
                  setShowModal(true);
                }}
                onDelete={deleteSkill}
              />
            ))}
          </div>
        </div>
      )}

      {/* CHARACTER TAB */}
      {activeTab === 'character' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-space">PLAYER PROFILE EDITOR</h2>

          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-yellow-500 font-mono text-sm mb-2">PLAYER TITLE</label>
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-yellow-500 font-mono text-sm mb-2">BIO / STATUS</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows="1"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-yellow-500 font-mono text-sm mb-2">AVATAR URL / UPLOAD</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profileData.avatar}
                    onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value })}
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                    placeholder="https://..."
                  />
                  <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg border border-gray-600 flex items-center justify-center text-white transition-colors">
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    <span className="text-xl">📂</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-yellow-500 font-mono text-sm mb-2">OPERATIONAL STATUS</label>
                <div className="flex items-center gap-4 h-[50px]">
                  <button
                    type="button"
                    onClick={() => setProfileData({ ...profileData, isOnline: !profileData.isOnline })}
                    className={`
                            relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none
                            ${profileData.isOnline ? 'bg-green-500' : 'bg-gray-700'}
                          `}
                  >
                    <span
                      className={`
                              inline-block h-5 w-5 transform rounded-full bg-white transition-transform
                              ${profileData.isOnline ? 'translate-x-7' : 'translate-x-1'}
                            `}
                    />
                  </button>
                  <span className={`font-mono font-bold ${profileData.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                    {profileData.isOnline ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-yellow-500 font-mono text-sm mb-2">GITHUB URL</label>
                <input
                  type="text"
                  value={profileData.socialLinks?.github || ''}
                  onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, github: e.target.value } })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label className="block text-yellow-500 font-mono text-sm mb-2">LINKEDIN URL</label>
                <input
                  type="text"
                  value={profileData.socialLinks.linkedin}
                  onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, linkedin: e.target.value } })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div>
                <label className="block text-yellow-500 font-mono text-sm mb-2">EMAIL (mailto:)</label>
                <input
                  type="text"
                  value={profileData.socialLinks.email}
                  onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, email: e.target.value } })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                  placeholder="mailto:..."
                />
              </div>
            </div>

            {/* TAGS SECTION */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-yellow-500 font-mono text-sm mb-4 uppercase">Profile Tags</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-400 font-mono text-xs mb-2">CLASS</label>
                  <input
                    type="text"
                    value={profileData.playerClass || ''}
                    onChange={(e) => setProfileData({ ...profileData, playerClass: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-mono text-xs mb-2">RANK</label>
                  <input
                    type="text"
                    value={profileData.rank || ''}
                    onChange={(e) => setProfileData({ ...profileData, rank: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-mono text-xs mb-2">SPECIALIZATIONS (TAGS)</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add new tag..."
                    className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-500"
                  >
                    ADD
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.specializations?.map((tag, i) => (
                    <span key={i} className="bg-gray-900 border border-gray-600 px-3 py-1 rounded-full text-sm text-gray-300 flex items-center gap-2">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-white">
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-mono font-bold transition-all"
              >
                SAVE PROFILE
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-space">⚙️ SYSTEM CONFIGURATION</h2>

          <div className="space-y-6">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-4">Database Status</h3>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-500 font-mono">CONNECTED</span>
                <span className="text-gray-500 font-mono">MongoDB Atlas</span>
              </div>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-4">API Endpoints</h3>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>GET /api/projects</span>
                  <span className="text-green-500">ACTIVE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>POST /api/projects</span>
                  <span className="text-green-500">ACTIVE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>PUT /api/projects/:id</span>
                  <span className="text-green-500">ACTIVE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>DELETE /api/projects/:id</span>
                  <span className="text-green-500">ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-4">Cache Clear</h3>
              <button
                onClick={() => toast.success('Cache cleared!')}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-mono transition-colors"
              >
                🔄 RESET SYSTEM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* MODAL */}
    {showModal && (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-gray-900 border-2 border-yellow-500 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-yellow-500/20 p-4 border-b border-yellow-500 flex justify-between items-center">
            <h3 className="text-xl font-bold text-yellow-500 font-space">
              {activeTab === 'skills'
                ? (editingSkill ? '✏️ EDIT SKILL' : '⚡ NEW SKILL')
                : (editingProject ? '✏️ EDIT MISSION' : '🎮 NEW MISSION')}
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={activeTab === 'skills' ? handleSkillSubmit : handleSubmit} className="p-6 space-y-4">
            {activeTab === 'skills' ? (
              // SKILLS FORM
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">SKILL NAME</label>
                    <input
                      type="text"
                      value={skillFormData.name}
                      onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">ICON (Emoji/URL)</label>
                    <input
                      type="text"
                      value={skillFormData.icon}
                      onChange={(e) => setSkillFormData({ ...skillFormData, icon: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-yellow-500 font-mono text-sm mb-2">MASTERY PERCENTAGE (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={skillFormData.percentage}
                    onChange={(e) => setSkillFormData({ ...skillFormData, percentage: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">RARITY</label>
                    <select
                      value={skillFormData.rarity}
                      onChange={(e) => setSkillFormData({ ...skillFormData, rarity: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    >
                      <option value="common">Common (Gray)</option>
                      <option value="rare">Rare (Blue)</option>
                      <option value="epic">Epic (Purple)</option>
                      <option value="legendary">Legendary (Gold)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">POWER LEVEL (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={skillFormData.power}
                      onChange={(e) => setSkillFormData({ ...skillFormData, power: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-yellow-500 font-mono text-sm mb-2">DESCRIPTION</label>
                  <textarea
                    value={skillFormData.description}
                    onChange={(e) => setSkillFormData({ ...skillFormData, description: e.target.value })}
                    rows="2"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">DAMAGE STAT</label>
                    <input
                      type="number"
                      value={skillFormData.damage}
                      onChange={(e) => setSkillFormData({ ...skillFormData, damage: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">SPEED STAT</label>
                    <input
                      type="number"
                      value={skillFormData.speed}
                      onChange={(e) => setSkillFormData({ ...skillFormData, speed: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // PROJECTS FORM
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">MISSION NAME</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">CATEGORY</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    >
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                      <option value="ai">AI/ML</option>
                      <option value="3d">3D/Game</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-yellow-500 font-mono text-sm mb-2">BRIEFING</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-yellow-500 font-mono text-sm mb-2">LOADOUT (Tech Stack)</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">LIVE URL</label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-500 font-mono text-sm mb-2">GITHUB URL</label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 bg-gray-800 border border-gray-700 rounded"
                    />
                    <span className="text-yellow-500 font-mono text-sm">⭐ LEGENDARY MISSION</span>
                  </label>
                </div>

              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-mono transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-mono transition-colors flex items-center justify-center gap-2"
              >
                <FiSave />
                {activeTab === 'skills'
                  ? (editingSkill ? 'UPDATE SKILL' : 'ADD SKILL')
                  : (editingProject ? 'UPDATE' : 'DEPLOY')}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
};



const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-700',
    yellow: 'from-yellow-500 to-orange-600',
    green: 'from-green-500 to-green-700',
    purple: 'from-purple-500 to-purple-700'
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={`px-3 py-1 text-xs font-mono rounded-full bg-gradient-to-r ${colors[color]} text-white`}>
          LIVE
        </span>
      </div>
      <div className="text-3xl font-bold text-white font-space mb-1">{value}</div>
      <div className="text-gray-500 font-mono text-sm">{title}</div>
    </div>
  );
};

export default AdminDashboard;