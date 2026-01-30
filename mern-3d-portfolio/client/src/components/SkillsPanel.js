import React from 'react';
import SkillItem from './SkillItem';

const SkillsPanel = ({ skills }) => {
    return (
        <div className="h-full bg-gray-900 border-2 border-blue-500/50 rounded-2xl p-6 overflow-y-auto relative">
            <div className="text-center mb-6 sticky top-0 bg-gray-900/95 pb-4 border-b border-gray-800 z-10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white font-space">INVENTORY</h3>
                <p className="text-blue-500 font-mono text-sm">EQUIPMENT & ABILITIES</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                    <SkillItem key={index} skill={skill} isAdmin={false} />
                ))}
            </div>

            {skills.length === 0 && (
                <div className="text-center py-10 text-gray-500 font-mono">
                    Inventory Empty.
                </div>
            )}
        </div>
    );
};

export default SkillsPanel;
