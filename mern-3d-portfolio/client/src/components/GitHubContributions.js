import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const GitHubContributions = ({ username = 'The-Spartacus' }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // Fetch GitHub stats
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error('Error fetching GitHub stats:', err));
    }, [username]);

    return (
        <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 hover:border-green-500 transition-all">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FaGithub className="text-4xl text-white" />
                    <div>
                        <h3 className="text-xl font-bold text-white font-space">GITHUB ACTIVITY</h3>
                        <p className="text-gray-500 text-sm font-mono">@{username}</p>
                    </div>
                </div>
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-mono text-sm transition-colors"
                >
                    VIEW PROFILE
                </a>
            </div>

            {/* Stats Grid */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-500 font-space">{stats.public_repos}</div>
                        <div className="text-gray-400 text-xs font-mono mt-1">REPOSITORIES</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-500 font-space">{stats.followers}</div>
                        <div className="text-gray-400 text-xs font-mono mt-1">FOLLOWERS</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-500 font-space">{stats.following}</div>
                        <div className="text-gray-400 text-xs font-mono mt-1">FOLLOWING</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-500 font-space">{stats.public_gists}</div>
                        <div className="text-gray-400 text-xs font-mono mt-1">GISTS</div>
                    </div>
                </div>
            )}

            {/* Contribution Graph */}
            <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-mono text-gray-400 mb-3">CONTRIBUTION GRAPH</h4>
                <img
                    src={`https://ghchart.rshah.org/409ba5/${username}`}
                    alt="GitHub Contribution Graph"
                    className="w-full rounded"
                    style={{ imageRendering: 'pixelated' }}
                />
            </div>
        </div>
    );
};

export default GitHubContributions;
