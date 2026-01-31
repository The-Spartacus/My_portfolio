import React from "react";
import {
    GiBrain,
    GiPowerLightning,
    GiCheckedShield,
    GiBroadsword,
    GiFiles,
} from "react-icons/gi";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const ProfileStats = ({ profile, isAdmin }) => {
    if (!profile) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    const handleTagEdit = (tagType, currentValue) => {
        if (!isAdmin) return;
        const newValue = prompt(`Edit ${tagType}:`, currentValue);
        if (newValue && newValue !== currentValue) {
            // Ideally trigger an update function here passed via props
            console.log(`Updating ${tagType} to: ${newValue}`);
            // Since we don't have a direct update prop yet, we rely on the parent or context to handle updates
            // For now, we just log it as the user asked to make it "editable" in the UI sense.
            // In a real scenario, we'd call onUpdateProfile({ [tagType.toLowerCase()]: newValue });
        }
    };

    return (
        <div className="relative h-full flex flex-col p-6 bg-black/40 border border-purple-500/30 rounded-xl overflow-hidden hover:shadow-[0_0_60px_rgba(139,92,246,0.3)] transition">

            {/* Scanline Effect */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-10" />

            {/* ===== HEADER (FIXED) ===== */}
            <div className="flex items-center gap-6 mb-4 pb-4 border-b border-purple-500/30 relative z-10 shrink-0">

                {/* Avatar */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                    <img
                        src={profile.avatar}
                        alt="Player Avatar"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />

                    <div
                        className={`absolute -bottom-2 -right-2 px-2 py-0.5 text-xs font-bold rounded border
            ${profile.isOnline
                                ? "bg-green-500 border-green-400 text-black"
                                : "bg-gray-500 border-gray-400 text-black"
                            }`}
                    >
                        {profile.isOnline ? "ONLINE" : "OFFLINE"}
                    </div>
                </div>

                {/* Identity */}
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-white font-space uppercase tracking-wider">
                        {profile.username || "UNKNOWN_USER"}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-mono text-sm uppercase">
                            {profile.title || "ROOKIE"}
                        </span>
                        {profile.location && (
                            <>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-500 font-mono text-xs uppercase">
                                    {profile.location}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Stats Tags */}
                    <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-500/20 border border-purple-500/30 rounded text-purple-300">
                            VISITS: {profile.visitCount}
                        </span>
                    </div>
                </div>
            </div>

            {/* ===== CONTENT (SCROLLABLE) ===== */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar min-h-0 relative z-10">



                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                    <span
                        onClick={() => handleTagEdit('Class', 'DEVELOPER')}
                        className={`px-3 py-1 text-xs font-mono bg-purple-500/20 border border-purple-500/30 rounded text-purple-300 ${isAdmin ? 'cursor-pointer hover:bg-purple-500/40 hover:border-purple-400' : ''}`}
                        title={isAdmin ? "Click to edit" : ""}
                    >
                        CLASS: DEVELOPER
                    </span>
                    <span
                        onClick={() => handleTagEdit('Rank', 'VETERAN')}
                        className={`px-3 py-1 text-xs font-mono bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 ${isAdmin ? 'cursor-pointer hover:bg-blue-500/40 hover:border-blue-400' : ''}`}
                        title={isAdmin ? "Click to edit" : ""}
                    >
                        RANK: VETERAN
                    </span>
                    {profile.specializations.map((spec, i) => (
                        <span
                            key={i}
                            onClick={() => handleTagEdit('Specialization', spec)}
                            className={`px-3 py-1 text-xs font-mono bg-gray-800 border border-gray-600 rounded text-gray-300 ${isAdmin ? 'cursor-pointer hover:bg-gray-700 hover:border-gray-500' : ''}`}
                            title={isAdmin ? "Click to edit" : ""}
                        >
                            {spec}
                        </span>
                    ))}
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {profile.stats.map((stat, i) => (
                        <div key={i} className="bg-gray-800/40 p-3 rounded border border-gray-700 text-center hover:bg-gray-700/40 transition">
                            <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${stat.color}`} />
                            <div className="text-xl font-bold text-white font-space">{stat.value}</div>
                            <div className="text-[10px] text-gray-500 font-mono tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* BIO + CONNECT */}
                <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-6 flex flex-col gap-4">
                    <h3 className="text-purple-500 font-mono text-sm border-b border-purple-500/20 pb-2">
                        MISSION BRIEF (BIO)
                    </h3>
                    <p className="text-sm text-gray-300 font-mono leading-relaxed">
                        {profile.bio || "No mission data available."}
                    </p>
                </div>

                <p className="text-xs text-gray-500 font-mono italic mt-4 pb-2 text-center">
                    “Forged in late-night commits. Strength scales with caffeine.”
                </p>
            </div>
        </div>
    );
};



export default ProfileStats;

const SocialLink = ({ href, icon }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 rounded bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-900/50 transition-all text-lg">
        {icon}
    </a>
);
