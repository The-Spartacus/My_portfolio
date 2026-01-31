import React from 'react';
import { GiUpgrade, GiHealthNormal, GiBrain, GiPowerLightning, GiCheckedShield } from 'react-icons/gi';

const ProfileStats = ({ profile }) => {
    if (!profile) return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
    );

    return (
        <div className="h-full flex flex-col p-4">
            {/* Header Info */}
            <div className="flex items-center gap-6 mb-8 pb-6 border-b border-purple-500/30">
                <div className="relative">
                    <div className="w-24 h-24 rounded-lg bg-purple-900/50 border-2 border-purple-500 flex items-center justify-center overflow-hidden">
                        <span className="text-4xl">👤</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded border border-green-400">
                        ONLINE
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-black text-white font-space tracking-wider mb-1">
                        {profile.title || 'UNKNOWN AGENT'}
                    </h2>
                    <p className="text-purple-400 font-mono text-sm mb-2">
                        {profile.bio || 'No bio data available.'}
                    </p>
                    <div className="flex gap-4">
                        <div className="bg-purple-500/20 px-3 py-1 rounded text-xs font-mono text-purple-300 border border-purple-500/30">
                            CLASS: DEVELOPER
                        </div>
                        <div className="bg-purple-500/20 px-3 py-1 rounded text-xs font-mono text-purple-300 border border-purple-500/30">
                            RANK: VETERAN
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2">
                {/* Main Attributes */}
                <div className="space-y-6">
                    <h3 className="text-purple-500 font-mono text-sm border-b border-purple-500/20 pb-2">CORE ATTRIBUTES</h3>

                    {profile.stats?.map((stat, index) => (
                        <div key={index} className="group">
                            <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                                <span className="group-hover:text-white transition-colors uppercase">{stat.label}</span>
                                <span className="text-white">{stat.value}/100</span>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-sm overflow-hidden border border-gray-700">
                                <div
                                    className={`h-full ${stat.color || 'bg-purple-500'} relative transition-all duration-1000 ease-out group-hover:brightness-125`}
                                    style={{ width: `${stat.value}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status / Bonus */}
                <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-6 flex flex-col gap-4">
                    <h3 className="text-purple-500 font-mono text-sm border-b border-purple-500/20 pb-2">ACTIVE BUFFS</h3>

                    <div className="flex items-center gap-4 text-sm font-mono text-gray-300">
                        <GiBrain className="text-2xl text-blue-400" />
                        <div>
                            <p className="text-white font-bold">Quick Learner</p>
                            <p className="text-xs text-gray-500">+20% XP Gain from new tech</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-mono text-gray-300">
                        <GiPowerLightning className="text-2xl text-yellow-400" />
                        <div>
                            <p className="text-white font-bold">Fast Debugging</p>
                            <p className="text-xs text-gray-500">-50% Time on logic errors</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-mono text-gray-300">
                        <GiCheckedShield className="text-2xl text-green-400" />
                        <div>
                            <p className="text-white font-bold">Clean Code</p>
                            <p className="text-xs text-gray-500">Auto-Linting Enabled</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Level Progress */}
            <div className="mt-8 pt-4 border-t border-purple-500/30">
                <div className="flex justify-between items-end mb-1">
                    <span className="text-xs text-gray-500 font-mono">NEXT LEVEL PROGRESS</span>
                    <span className="text-xl font-black text-white font-space">LVL. 99</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-blue-500 w-[85%] relative">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStats;
