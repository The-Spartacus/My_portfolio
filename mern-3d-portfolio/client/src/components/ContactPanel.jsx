import { useState } from 'react';
import { FaPaperPlane, FaBroadcastTower } from 'react-icons/fa';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const ContactPanel = () => {
    const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SENT

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SENDING');

        try {
            await axios.post('/api/messages', formData);
            setStatus('SENT');
            toast.success('Message Transmitted!');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('IDLE'), 3000);
        } catch (error) {
            console.error(error);
            toast.error('Transmission Failed');
            setStatus('IDLE');
        }
    };

    return (
        <div className="h-full flex flex-col p-4 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-green-500/30">
                <div className="p-3 bg-green-900/20 border border-green-500 rounded-lg">
                    <FaBroadcastTower className="text-2xl text-green-500 animate-pulse" />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-white font-space tracking-wider">SIGNAL TOWER</h3>
                    <p className="text-green-500 font-mono text-xs">ENCRYPTED TRANSMISSION PROTOCOL</p>
                </div>
            </div>

            {/* Terminal Screen */}
            <div className="flex-1 bg-black/40 border border-green-500/30 rounded-lg p-6 relative">
                <div className="absolute inset-0 pointer-events-none bg-green-500/5 scanline-anim opacity-20"></div>

                {status === 'SENT' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                        <div className="w-16 h-16 border-4 border-green-500 rounded-full flex items-center justify-center mb-4">
                            <FaPaperPlane className="text-2xl text-green-500" />
                        </div>
                        <h4 className="text-xl font-bold text-green-500 font-space mb-2">TRANSMISSION CONFIRMED</h4>
                        <p className="text-gray-400 font-mono text-sm max-w-xs">
                            Message successfully uplinked to the mainframe. Stand by for response.
                        </p>
                    </div>
                ) : (
                    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                        <div className="group">
                            <label className="block text-xs font-mono text-green-500 mb-2 group-focus-within:text-white transition-colors">
                                {'>'} IDENTITY_VERIFICATION (NAME)
                            </label>
                            <input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                type="text"
                                required
                                className="w-full bg-gray-900/80 border-b-2 border-gray-700 px-4 py-3 text-white font-mono focus:border-green-500 focus:bg-green-900/10 focus:outline-none transition-all placeholder-gray-700"
                                placeholder="ENTER CALLSIGN..."
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-mono text-green-500 mb-2 group-focus-within:text-white transition-colors">
                                {'>'} COMM_FREQUENCY (EMAIL)
                            </label>
                            <input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                type="email"
                                required
                                className="w-full bg-gray-900/80 border-b-2 border-gray-700 px-4 py-3 text-white font-mono focus:border-green-500 focus:bg-green-900/10 focus:outline-none transition-all placeholder-gray-700"
                                placeholder="ENTER FREQUENCY..."
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-mono text-green-500 mb-2 group-focus-within:text-white transition-colors">
                                {'>'} PACKET_DATA (MESSAGE)
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows="4"
                                required
                                className="w-full bg-gray-900/80 border-b-2 border-gray-700 px-4 py-3 text-white font-mono focus:border-green-500 focus:bg-green-900/10 focus:outline-none transition-all placeholder-gray-700 resize-none"
                                placeholder="INPUT MESSAGE DATA..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'SENDING'}
                            className="w-full py-4 bg-green-600/20 hover:bg-green-600 border border-green-500 text-green-500 hover:text-white font-bold rounded font-mono transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3 group"
                        >
                            {status === 'SENDING' ? (
                                <span className="animate-pulse">UPLINKING...</span>
                            ) : (
                                <>
                                    <span className="group-hover:translate-x-1 transition-transform">INITIATE UPLINK</span>
                                    <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>

            {/* Footer Status */}
            <div className="mt-4 flex justify-between text-[10px] font-mono text-green-900">
                <span>ENCRYPTION: AES-256-GCM</span>
                <span>STATUS: {status === 'IDLE' ? 'READY' : status}</span>
            </div>
        </div>
    );
};

export default ContactPanel;
