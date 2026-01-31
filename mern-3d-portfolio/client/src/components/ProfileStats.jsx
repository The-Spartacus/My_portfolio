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

    // Tag editing is now handled via the Admin Dashboard
    // const handleTagEdit = ... (removed)

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
                <div className="flex gap-2 flex-wrap mb-4">
                    <span className="px-3 py-1 text-xs font-mono bg-purple-500/20 border border-purple-500/30 rounded text-purple-300">
                        CLASS: {profile.playerClass || 'DEVELOPER'}
                    </span>
                    <span className="px-3 py-1 text-xs font-mono bg-blue-500/20 border border-blue-500/30 rounded text-blue-300">
                        RANK: {profile.rank || 'ROOKIE'}
                    </span>
                    {profile.specializations?.map((spec, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-mono bg-gray-800 border border-gray-600 rounded text-gray-300"
                        >
                            {spec}
                        </span>
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
