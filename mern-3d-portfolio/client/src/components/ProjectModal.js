import React from 'react';
import { FiX, FiGithub } from 'react-icons/fi';
import { GiCrossedSwords, GiInfo } from 'react-icons/gi';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gray-900 border-2 border-yellow-500 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modalSlide">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors z-10"
        >
          <FiX className="text-white" />
        </button>

        {/* Mission Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 rounded-t-xl">
          <div className="flex items-center gap-3 mb-2">
            <GiInfo className="text-2xl text-white" />
            <span className="text-sm font-mono text-white/80">MISSION BRIEFING</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-space">{project.title}</h2>
        </div>

        {/* Mission Details */}
        <div className="p-6">
          {/* Objectives */}
          <div className="mb-6">
            <h3 className="text-yellow-500 font-bold mb-2 font-mono">📋 OBJECTIVES</h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="text-yellow-500 font-bold mb-3 font-mono">🛠️ LOADOUT</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-yellow-400 font-mono text-sm"
                >
                  ⚡ {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Mission Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-xs text-gray-400">COMPLETED</div>
              <div className="text-white font-mono">
                {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-2xl mb-1">🏷️</div>
              <div className="text-xs text-gray-400">CLASS</div>
              <div className="text-white font-mono uppercase">{project.category}</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-xs text-gray-400">STATUS</div>
              <div className="text-white font-mono">
                {project.featured ? 'LEGENDARY' : 'NORMAL'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold transition-all hover:scale-105"
            >
              <GiCrossedSwords />
              PLAY LEVEL
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-bold transition-all hover:scale-105"
            >
              <FiGithub />
              VIEW SOURCE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;