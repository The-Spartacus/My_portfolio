import React from 'react';
import SkillItem from './SkillItem'; // Ensure correct import path

const SkillsPanel = ({ skills }) => {
    return (
        <div className="flex flex-col p-2">
            {/* Header */}
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-blue-500/30">
                <div>
                    <h3 className="text-xl font-black text-white font-space tracking-wider">INVENTORY</h3>
                    <p className="text-blue-500 font-mono text-[10px]">EQUIPPED SKILLS & MODULES</p>
                </div>
                <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 font-mono text-[10px]">
                    Slots: {skills.length}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skills.map((skill, index) => (
                    <SkillItem key={index} skill={skill} isAdmin={false} />
                ))}
            </div>

            {skills.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-gray-500 font-mono border-2 border-dashed border-gray-800 rounded-xl">
                    [ NO ITEMS FOUND ]
                </div>
            )}
        </div>
    );
};

export default SkillsPanel;
