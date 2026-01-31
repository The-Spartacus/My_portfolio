import React from 'react';
import { GiRoundStar } from 'react-icons/gi';

const SkillItem = ({ skill, onClick, isAdmin, onEdit, onDelete }) => {
  const getRarityStyles = (level) => {
    if (level >= 90) return {
      border: 'border-orange-500',
      shadow: 'shadow-[0_0_10px_rgba(249,115,22,0.4)]',
      text: 'text-orange-500',
      bg: 'bg-orange-500'
    }; // Legendary
    if (level >= 75) return {
      border: 'border-purple-500',
      shadow: 'shadow-[0_0_10px_rgba(168,85,247,0.4)]',
      text: 'text-purple-500',
      bg: 'bg-purple-500'
    }; // Epic
    if (level >= 50) return {
      border: 'border-blue-500',
      shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.4)]',
      text: 'text-blue-500',
      bg: 'bg-blue-500'
    }; // Rare
    return {
      border: 'border-gray-500',
      shadow: 'shadow-none',
      text: 'text-gray-400',
      bg: 'bg-gray-500'
    }; // Common
  };

  const styles = getRarityStyles(skill.percentage || 50);
  const rarityName = skill.rarity ? skill.rarity.toUpperCase() : 'COMMON';

  return (
    <div
      className={`relative group bg-gray-900/80 border-2 ${styles.border} ${styles.shadow} p-3 rounded-xl transition-all hover:scale-105 hover:bg-gray-800 cursor-pointer overflow-hidden`}
      onClick={!isAdmin ? onClick : undefined}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Rarity Tag */}
      <div className={`absolute top-0 right-0 px-2 py-0.5 text-[10px] font-bold ${styles.text} bg-gray-900 border-l border-b ${styles.border} rounded-bl-lg`}>
        {rarityName}
      </div>

      <div className="flex flex-col items-center gap-2 relative z-10">
        <div className={`w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-3xl mb-1 border ${styles.border} overflow-hidden`}>
          {skill.icon && (skill.icon.startsWith('http') || skill.icon.startsWith('/')) ? (
            <img src={skill.icon} alt={skill.name} className="w-full h-full object-cover" />
          ) : (
            <span className="group-hover:animate-spin">{skill.icon || '⚙️'}</span>
          )}
        </div>

        <div className="text-center w-full">
          <h4 className="font-bold text-white font-space text-sm tracking-wide truncate">{skill.name}</h4>
          <div className="w-full bg-gray-800 h-1.5 mt-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${styles.bg}`}
              style={{ width: `${skill.percentage || 50}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-gray-500 mt-1 text-right">{skill.percentage || 50}/100</p>
        </div>
      </div>

      {isAdmin && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(skill); }}
            className="text-xs font-mono text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded w-24 border border-blue-400"
          >
            EDIT
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(skill._id); }}
            className="text-xs font-mono text-white bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded w-24 border border-red-400"
          >
            DELETE
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillItem;