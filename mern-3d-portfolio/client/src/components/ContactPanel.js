import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const ContactPanel = () => {
    return (
        <div className="h-full bg-gray-900 border-2 border-green-500/50 rounded-2xl p-6 overflow-y-auto">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white font-space">SIGNAL TOWER</h3>
                <p className="text-green-500 font-mono text-sm">ESTABLISH COMMUNICATION</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent! 📡'); }}>
                <div>
                    <label className="block text-xs font-mono text-green-500 mb-1">CALLSIGN</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label className="block text-xs font-mono text-green-500 mb-1">FREQUENCY</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                    />
                </div>
                <div>
                    <label className="block text-xs font-mono text-green-500 mb-1">MISSION BRIEFING</label>
                    <textarea
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="Describe your project..."
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                    <FaEnvelope />
                    TRANSMIT MESSAGE
                </button>
            </form>
        </div>
    );
};

export default ContactPanel;
