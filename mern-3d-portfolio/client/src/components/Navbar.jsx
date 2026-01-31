import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.includes('/admin');

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <span className="font-space text-2xl font-bold gradient-text">
              Portfolio
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {!isAdminRoute ? (
                <>
                  <a href="#home" className="nav-link px-3 py-2 text-sm font-medium text-white/90 hover:text-white">
                    Home
                  </a>
                  <a href="#skills" className="nav-link px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                    Skills
                  </a>
                  <a href="#projects" className="nav-link px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                    Projects
                  </a>
                  <a href="#contact" className="nav-link px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                    Contact
                  </a>
                  <Link 
                    to="/admin" 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all"
                  >
                    Admin
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="nav-link px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                    View Site
                  </Link>
                  {user && (
                    <button 
                      onClick={logout}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold transition-all"
                    >
                      Logout
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!isAdminRoute ? (
              <>
                <a href="#home" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-white">Home</a>
                <a href="#skills" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Skills</a>
                <a href="#projects" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Projects</a>
                <a href="#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Contact</a>
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-blue-400">Admin</Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">View Site</Link>
                {user && (
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-400"
                  >
                    Logout
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;