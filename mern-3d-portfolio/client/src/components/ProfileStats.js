import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const StatBar = ({ label, value, color }) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400 font-mono">{label}</span>
            <span className="text-white font-mono">{value}/100</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div
                className={`h-full ${color} transition-all duration-1000`}
                style={{ width: `${value}%` }}
            />
        </div>
    </div>
);

const SocialLink = ({ icon, href, label }) => (
    <a
        href={href}
        className="p-3 bg-gray-800 hover:bg-purple-600 rounded-lg text-gray-400 hover:text-white transition-all transform hover:scale-110"
        title={label}
    >
        {icon}
    </a>
);

const ProfileStats = ({ profile }) => {
    return (
        <div className="h-full flex flex-col justify-center p-6 bg-gray-900 border-2 border-purple-500/30 rounded-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="grid grid-cols-1 gap-6">
                {/* Avatar */}
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-4xl mb-4 border-4 border-purple-500/30 shadow-lg shadow-purple-500/20">
                        🎮
                    </div>
                    <h3 className="text-2xl font-bold text-white font-space">Vaishnav</h3>
                    <p className="text-purple-400 font-mono">{profile?.title || 'Level 1 Developer'}</p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        {profile?.stats?.length > 0 ? (
                            profile.stats.map((stat, index) => (
                                <StatBar key={index} label={stat.label} value={stat.value} color={stat.color} />
                            ))
                        ) : (
                            <>
                                <StatBar label="Experience" value={0} color="bg-yellow-500" />
                                <StatBar label="Loading..." value={0} color="bg-gray-500" />
                            </>
                        )}
                    </div>

                    <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <p className="text-gray-300 text-sm leading-relaxed italic">
                            "{profile?.bio || "Loading mission briefing..."}"
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center pt-2">
                        <SocialLink icon={<FaGithub />} href="#" label="GitHub" />
                        <SocialLink icon={<FaLinkedin />} href="#" label="LinkedIn" />
                        <SocialLink icon={<FaTwitter />} href="#" label="Twitter" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStats;
