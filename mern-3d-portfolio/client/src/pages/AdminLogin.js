import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiUser, FiTerminal } from 'react-icons/fi';
import { GiSecurityGate } from 'react-icons/gi';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Terminal Header */}
        <div className="bg-gray-900 border-2 border-red-500/50 rounded-t-xl p-4 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-auto text-red-500 font-mono text-sm flex items-center gap-2">
            <FiTerminal />
            SECURE_TERMINAL_v2.0
          </span>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900/90 border-x-2 border-b-2 border-red-500/50 rounded-b-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-red-500/20 rounded-full mb-4">
              <GiSecurityGate className="text-4xl text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white font-space mb-2">ADMIN ACCESS</h2>
            <p className="text-gray-500 font-mono text-sm">SECURE CONNECTION REQUIRED</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-red-500 font-mono text-sm mb-2">
                <FiUser />
                USERNAME
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-red-500/30 rounded-lg text-white font-mono focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
                placeholder="admin@bombsquad.dev"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-red-500 font-mono text-sm mb-2">
                <FiLock />
                PASSCODE
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-red-500/30 rounded-lg text-white font-mono focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold font-mono rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  <GiSecurityGate />
                  ACCESS SYSTEM
                </>
              )}
            </button>
          </form>

          {/* Terminal Footer */}
          <div className="mt-6 p-4 bg-black rounded-lg font-mono text-xs text-green-500">
            <p className="mb-1">{`>`} SECURITY LEVEL: MAXIMUM</p>
            <p className="mb-1">{`>`} ENCRYPTION: AES-256</p>
            <p className="animate-pulse">{`>`} AWAITING CREDENTIALS_</p>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-gray-500 hover:text-white text-sm font-mono transition-colors">
              ← RETURN TO MAIN MENU
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-500/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-500/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-500/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-500/50" />
    </div>
  );
};

export default AdminLogin;