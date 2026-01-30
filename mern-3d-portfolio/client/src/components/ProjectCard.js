import { useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { GiCrossedSwords, GiTrophy } from 'react-icons/gi';

const ProjectCard = ({ project, isAdmin, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryIcons = {
    web: '🌐',
    mobile: '📱',
    ai: '🤖',
    '3d': '🎮',
    other: '🚀'
  };

  const difficultyColors = {
    easy: 'from-green-500 to-green-700',
    medium: 'from-yellow-500 to-orange-700',
    hard: 'from-red-500 to-red-700'
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Level Card */}
      <div className={`
        relative bg-gray-900 border-2 border-gray-700 rounded-xl overflow-hidden
        transform transition-all duration-300
        ${isHovered ? 'scale-105 border-yellow-500 shadow-lg shadow-yellow-500/20' : ''}
      `}>
        {/* Level Header */}
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
          <span className="text-xs font-mono text-gray-400">LVL.{project.order || 1}</span>
          {project.featured && (
            <GiTrophy className="text-yellow-500 animate-pulse" />
          )}
        </div>

        {/* Level Preview */}
        <div className={`
          h-48 bg-gradient-to-br ${difficultyColors[project.difficulty] || 'from-blue-600 to-purple-700'}
          flex items-center justify-center relative overflow-hidden
        `}>
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Level Icon */}
          <div className="text-6xl relative z-10 filter drop-shadow-lg">
            {categoryIcons[project.category] || '🚀'}
          </div>

          {/* Hover Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 animate-fadeIn">
              <button
                onClick={() => window.open(project.liveUrl, '_blank')}
                className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition-all hover:scale-110"
                title="Play Level (Live Demo)"
              >
                <GiCrossedSwords className="text-white text-xl" />
              </button>
              <button
                onClick={() => window.open(project.githubUrl, '_blank')}
                className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-all hover:scale-110"
                title="Source Code"
              >
                <FiGithub className="text-white text-xl" />
              </button>
            </div>
          )}
        </div>

        {/* Level Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 font-space">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack / Loot */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies?.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-gray-800 text-yellow-400 border border-yellow-500/30 rounded font-mono"
              >
                ⚡ {tech}
              </span>
            ))}
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex gap-2 pt-3 border-t border-gray-700">
              <button
                onClick={() => onEdit(project)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded font-mono transition-colors"
              >
                ✏️ EDIT
              </button>
              <button
                onClick={() => onDelete(project._id)}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded font-mono transition-colors"
              >
                🗑️ DELETE
              </button>
            </div>
          )}
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50 rounded-br-lg" />
      </div>
    </div>
  );
};

export default ProjectCard;