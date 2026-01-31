import React from 'react';
import { GiPadlock } from 'react-icons/gi';

const ProjectCard = ({ project, onClick }) => {
    return (
        <div
            onClick={() => onClick(project)}
            className="group relative h-64 bg-gray-900 border-2 border-yellow-500/30 hover:border-yellow-500 rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
        >
            {/* Folder Tab Effect */}
            <div className="absolute top-0 left-0 w-24 h-6 bg-yellow-500/20 border-r border-b border-yellow-500/30 rounded-br-lg z-10">
                <span className="text-[10px] font-mono text-yellow-500 ml-2">CONFIDENTIAL</span>
            </div>

            {/* Image/Content */}
            <div className="h-40 bg-gray-800 overflow-hidden relative">
                <div className="absolute inset-0 bg-yellow-900/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors"></div>
                {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-yellow-700">
                        <GiPadlock className="text-5xl" />
                    </div>
                )}

                {/* Scanline on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out z-20"></div>
            </div>

            {/* Info */}
            <div className="p-4 relative">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white font-space truncate pr-2 group-hover:text-yellow-400 transition-colors">
                        {project.title}
                    </h3>
                    <span className="px-1.5 py-0.5 border border-yellow-500/50 text-yellow-500 text-[10px] rounded font-mono">
                        TOP SECRET
                    </span>
                </div>

                <p className="text-gray-400 text-xs line-clamp-2 font-mono mb-3">
                    {project.description}
                </p>

                <div className="flex gap-2 text-[10px] text-gray-500 font-mono">
                    {project.techStack?.slice(0, 3).map((tech, i) => (
                        <span key={i} className="bg-gray-800 px-1 rounded">
                            {tech}
                        </span>
                    ))}
                    {project.techStack?.length > 3 && <span>+{project.techStack.length - 3}</span>}
                </div>
            </div>
        </div>
    );
};

const ProjectsPanel = ({ projects, setSelectedProject }) => {
    return (
        <div className="h-full flex flex-col p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-yellow-500/30">
                <div>
                    <h3 className="text-2xl font-black text-white font-space tracking-wider">MISSION ARCHIVE</h3>
                    <p className="text-yellow-500 font-mono text-xs">PAST OPERATIONS & DEPLOYMENTS</p>
                </div>
                <div className="flex gap-4 text-xs font-mono text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>ACTIVE: {projects.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>REDACTED: 0</span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-4 custom-scrollbar">
                {projects.map((project) => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}
                    />
                ))}
            </div>

            {projects.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 font-mono border-2 border-dashed border-gray-800 rounded-xl bg-gray-900/50">
                    <GiPadlock className="text-4xl mb-4 opacity-50" />
                    <p>NO FILES ACCESSIBLE</p>
                    <p className="text-xs mt-2">Clearance Level Too Low</p>
                </div>
            )}
        </div>
    );
};

export default ProjectsPanel;
