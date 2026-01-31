import React from 'react';
import { GiRoundStar } from 'react-icons/gi';

const SkillItem = ({ skill, onClick, isAdmin }) => {
  const getRarityColor = (level) => {
    if (level >= 90) return 'border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)] text-orange-500'; // Legendary
    if (level >= 75) return 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)] text-purple-500'; // Epic
    if (level >= 50) return 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)] text-blue-500'; // Rare
    return 'border-gray-500 text-gray-400'; // Common
  };

  const rarityColor = getRarityColor(skill.level);
  const rarityName = skill.level >= 90 ? 'LEGENDARY' : skill.level >= 75 ? 'EPIC' : skill.level >= 50 ? 'RARE' : 'COMMON';

  return (
    <div
      className={`relative group bg-gray-900/80 border-2 ${rarityColor} p-3 rounded-xl transition-all hover:scale-105 hover:bg-gray-800 cursor-pointer overflow-hidden`}
      onClick={onClick}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Rarity Tag */}
      <div className={`absolute top-0 right-0 px-2 py-0.5 text-[10px] font-bold ${rarityColor.split(' ')[2]} bg-gray-900 border-l border-b ${rarityColor.split(' ')[0]} rounded-bl-lg`}>
        {rarityName}
      </div>

      <div className="flex flex-col items-center gap-2 relative z-10">
        <div className={`w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-3xl mb-1 border ${rarityColor.split(' ')[0]}`}>
          {/* Fallback Icon if image fails or isn't provided */}
          <span className="group-hover:animate-spin">⚙️</span>
        </div>

        <div className="text-center w-full">
          <h4 className="font-bold text-white font-space text-sm tracking-wide truncate">{skill.name}</h4>
          <div className="w-full bg-gray-800 h-1.5 mt-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${rarityColor.split(' ')[2].replace('text', 'bg')}`}
              style={{ width: `${skill.level}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-gray-500 mt-1 text-right">{skill.level}/100</p>
        </div>
      </div>

      {isAdmin && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-mono text-white bg-blue-600 px-2 py-1 rounded">EDIT SLOT</span>
        </div>
      )}
    </div>
  );
};

export default SkillItem;