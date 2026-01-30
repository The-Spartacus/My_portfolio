import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsPanel = ({ projects, setSelectedProject }) => {
    return (
        <div className="h-full bg-gray-900 border-2 border-yellow-500/50 rounded-2xl p-6 overflow-y-auto relative">
            <div className="text-center mb-6 sticky top-0 bg-gray-900/95 pb-4 border-b border-gray-800 z-10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white font-space">MISSION ARCHIVE</h3>
                <p className="text-yellow-500 font-mono text-sm">COMPLETED OPERATIONS</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div key={project._id} className="transform transition-all hover:scale-[1.02]">
                        <ProjectCard
                            project={project}
                            onClick={() => setSelectedProject(project)}
                            adminControls={null}
                            compact={true}
                        />
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="text-center py-10 text-gray-500 font-mono">
                        No missions found in archive.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPanel;
