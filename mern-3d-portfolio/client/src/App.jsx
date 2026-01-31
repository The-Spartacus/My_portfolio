import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { SkillProvider } from './context/SkillContext';
import { ProfileProvider } from './context/ProfileContext';
import { MessageProvider } from './context/MessageContext';

// Pages
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Components

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ProjectProvider>
          <SkillProvider>
            <ProfileProvider>
              <MessageProvider>
                <Router>
                  <div className="min-h-screen bg-dark">

                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/admin" element={<AdminLogin />} />
                      <Route
                        path="/admin/dashboard"
                        element={
                          <PrivateRoute>
                            <AdminDashboard />
                          </PrivateRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        style: {
                          background: '#1a1a2e',
                          color: '#fff',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                        },
                      }}
                    />
                  </div>
                </Router>
              </MessageProvider>
            </ProfileProvider>
          </SkillProvider>
        </ProjectProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;