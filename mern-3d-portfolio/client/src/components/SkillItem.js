import { useState } from 'react';

const SkillItem = ({ skill, isAdmin, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const rarityColors = {
    common: 'border-gray-500 bg-gray-900',
    rare: 'border-blue-500 bg-blue-900/20',
    epic: 'border-purple-500 bg-purple-900/20',
    legendary: 'border-yellow-500 bg-yellow-900/20'
  };

  const rarity = skill.rarity || 'common';

  return (
    <div 
      className={`
        relative p-4 rounded-lg border-2 ${rarityColors[rarity]}
        transition-all duration-300 cursor-pointer
        hover:scale-105 hover:shadow-lg
        ${showDetails ? 'ring-2 ring-yellow-500' : ''}
      `}
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Rarity Badge */}
      <div className={`
        absolute -top-3 left-1/2 transform -translate-x-1/2 
        px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider
        ${rarity === 'legendary' ? 'bg-yellow-500 text-black animate-pulse' : 
          rarity === 'epic' ? 'bg-purple-500 text-white' :
          rarity === 'rare' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200'}
      `}>
        {rarity}
      </div>

      {/* Icon */}
      <div className="text-4xl mb-3 text-center">
        {skill.icon || '⚡'}
      </div>

      {/* Name */}
      <h4 className="text-center font-bold text-white font-space mb-1">
        {skill.name}
      </h4>

      {/* Power Level */}
      <div className="flex justify-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < (skill.power || 3) ? 'bg-yellow-500' : 'bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Details Panel */}
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-700 text-sm text-gray-300 animate-fadeIn">
          <p className="mb-2">{skill.description}</p>
          <div className="text-xs text-yellow-500 font-mono">
            DMG: {skill.damage || 75} | SPD: {skill.speed || 80}
          </div>

          {isAdmin && (
            <div className="flex gap-2 mt-3">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(skill); }}
                className="flex-1 py-1 bg-blue-600 text-xs rounded"
              >
                EDIT
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(skill._id); }}
                className="flex-1 py-1 bg-red-600 text-xs rounded"
              >
                DELETE
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillItem;