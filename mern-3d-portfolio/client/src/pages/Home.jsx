import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { GiGamepad, GiCharacter, GiSkills, GiExitDoor, GiTrophy } from 'react-icons/gi';
import { FaCode, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';

import { useProjects } from '../context/ProjectContext';
import { useSkills } from '../context/SkillContext';
import { useProfile } from '../context/ProfileContext';
import ParticleBackground from '../components/ParticleBackground';
import ProjectModal from '../components/ProjectModal';
import GitHubContributions from '../components/GitHubContributions';
import BombGame from '../components/BombGame';
import ProfileStats from '../components/ProfileStats';
import ContactPanel from '../components/ContactPanel';
import SkillsPanel from '../components/SkillsPanel';
import ProjectsPanel from '../components/ProjectsPanel';
import GameWindow from '../components/GameWindow';

const Home = () => {
  const { projects, fetchProjects } = useProjects();
  const { skills, fetchSkills } = useSkills();
  const { profile, fetchProfile } = useProfile();
  const [selectedProject, setSelectedProject] = useState(null);
  const [gameActive, setGameActive] = useState(false);

  const heroRef = useRef(null);

  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchProfile();

    const ctx = gsap.context(() => {
      gsap.fromTo('.game-title', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" });
      gsap.fromTo('.menu-item', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5 });
    }, heroRef);
    return () => ctx.revert();
  }, [fetchProjects, fetchSkills, fetchProfile]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen crt cursor-crosshair">
      <Helmet>
        <title>Vaishnav Portfolio | Game Mode</title>
      </Helmet>

      <ParticleBackground />
      <div className="scanline-anim"></div>

      {/* Global HUD Header */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-green-500/50 z-40"></div>
      <div className="fixed top-0 left-4 text-xs font-mono text-green-500 z-40 mt-2 text-shadow-glow">SYSTEM: ONLINE</div>
      <div className="fixed top-0 right-4 text-xs font-mono text-green-500 z-40 mt-2 text-shadow-glow">SECURE CONNECTION</div>
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-green-500/50 z-40"></div>

      {/* HERO SECTION - Intro + Game */}
      <section ref={heroRef} id="home" className="min-h-screen flex items-center relative pt-20 pb-12 px-6 md:px-12 lg:px-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-[85vh]">

          {/* LEFT COLUMN: Content */}
          <div className="text-left z-10 order-2 lg:order-1 flex flex-col justify-center h-full">
            <div className="game-title mb-8">
              <div className="inline-block p-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg mb-4">
                <div className="bg-dark px-4 py-2 rounded-lg border border-yellow-500/30">
                  <span className="text-xs text-yellow-500 font-mono tracking-widest animate-pulse">PLAYER ID: The_Spartacus_001</span>
                </div>
              </div>
              <h1 className="font-space text-5xl md:text-7xl font-black text-white mb-4 text-shadow-glow leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                  VAISHNAV
                </span>
              </h1>
              <p className="text-xl text-gray-400 font-mono max-w-lg mb-6 leading-relaxed">
                Full Stack Developer building immersive web experiences.
              </p>

              <div className="flex gap-4 mb-8">
                <a href={profile?.socialLinks?.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-white transition-all hover:scale-110">
                  <FaGithub className="text-xl" />
                </a>
                <a href={profile?.socialLinks?.linkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all hover:scale-110">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href={profile?.socialLinks?.email || "mailto:contact@example.com"} className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-500 transition-all hover:scale-110">
                  <FaEnvelope className="text-xl" />
                </a>
              </div>
            </div>

            {/* Main Menu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <button
                onClick={() => setGameActive(true)}
                className={`menu-item group flex items-center gap-3 px-6 py-4 border-2 rounded-lg transition-all 
                  ${gameActive
                    ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                    : 'bg-gray-900/80 border-gray-700 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  }`}
              >
                <GiGamepad className={`text-2xl ${gameActive ? 'text-red-500 animate-pulse' : 'text-gray-400 group-hover:text-red-500 group-hover:animate-bounce'}`} />
                <div>
                  <div className="text-sm font-bold text-white font-space">{gameActive ? 'MISSION ACTIVE' : 'START MISSION'}</div>
                  <div className={`text-[10px] font-mono ${gameActive ? 'text-red-400' : 'text-gray-400'}`}>BOMB SQUAD</div>
                </div>
              </button>
              <button onClick={() => scrollTo('profile')} className="menu-item group flex items-center gap-3 px-6 py-4 border-2 bg-gray-900/80 border-gray-700 hover:border-purple-500 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <GiCharacter className="text-2xl text-purple-500" />
                <div className="text-left">
                  <div className="text-sm font-bold text-white font-space">PLAYER PROFILE</div>
                  <div className="text-[10px] text-purple-500 font-mono">VIEW STATS</div>
                </div>
              </button>
              <button onClick={() => scrollTo('projects')} className="menu-item group flex items-center gap-3 px-6 py-4 border-2 bg-gray-900/80 border-gray-700 hover:border-yellow-500 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                <GiTrophy className="text-2xl text-yellow-500" />
                <div className="text-left">
                  <div className="text-sm font-bold text-white font-space">MISSION ARCHIVE</div>
                  <div className="text-[10px] text-yellow-500 font-mono">PROJECTS</div>
                </div>
              </button>
              <button onClick={() => scrollTo('skills')} className="menu-item group flex items-center gap-3 px-6 py-4 border-2 bg-gray-900/80 border-gray-700 hover:border-blue-500 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <GiSkills className="text-2xl text-blue-500 group-hover:animate-pulse" />
                <div className="text-left">
                  <div className="text-sm font-bold text-white font-space">INVENTORY</div>
                  <div className="text-[10px] text-blue-500 font-mono">SKILLS</div>
                </div>
              </button>
              <button onClick={() => scrollTo('github')} className="menu-item group flex items-center gap-3 px-6 py-4 border-2 bg-gray-900/80 border-gray-700 hover:border-green-500 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <FaCode className="text-2xl text-gray-400 group-hover:text-green-500" />
                <div className="text-left">
                  <div className="text-sm font-bold text-white font-space">CODE LOGS</div>
                  <div className="text-[10px] text-green-500 font-mono">GITHUB</div>
                </div>
              </button>
              <button onClick={() => scrollTo('contact')} className="menu-item group flex items-center gap-3 px-6 py-4 border-2 bg-gray-900/80 border-gray-700 hover:border-green-500 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <GiExitDoor className="text-2xl text-green-500" />
                <div className="text-left">
                  <div className="text-sm font-bold text-white font-space">SIGNAL TOWER</div>
                  <div className="text-[10px] text-green-500 font-mono">CONTACT</div>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Game (Game vs Placeholder) */}
          <div className="order-1 lg:order-2 h-full w-full relative">
            {gameActive && (
              <div className="h-full border-2 border-red-500/30 bg-gray-900/50 backdrop-blur rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-fadeIn">
                <BombGame active={true} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: PROFILE */}
      <section id="profile" className="py-20 px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto h-[600px]">
          <GameWindow title="PLAYER PROFILE" color="purple" className="h-full">
            <ProfileStats profile={profile} />
          </GameWindow>
        </div>
      </section>

      {/* SECTION 3: SKILLS */}
      <section id="skills" className="py-20 px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto h-[700px]">
          <GameWindow title="INVENTORY" color="blue" className="h-full">
            <SkillsPanel skills={skills} />
          </GameWindow>
        </div>
      </section>

      {/* SECTION 4: PROJECTS */}
      <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto h-[800px]">
          <GameWindow title="MISSION ARCHIVE" color="yellow" className="h-full">
            <ProjectsPanel projects={projects} setSelectedProject={setSelectedProject} />
          </GameWindow>
        </div>
      </section>

      {/* SECTION 5: GITHUB */}
      <section id="github" className="py-20 px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-5xl mx-auto">
          <GameWindow title="CODE LOGS" color="green">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white font-space">GITHUB ACTIVITY</h3>
              <p className="text-green-500 font-mono text-sm">COMMITS & DEPLOYMENTS</p>
            </div>
            <div className="flex justify-center items-center">
              <GitHubContributions username="The-Spartacus" />
            </div>
          </GameWindow>
        </div>
      </section>

      {/* SECTION 6: CONTACT */}
      <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-4xl mx-auto">
          <GameWindow title="SIGNAL TOWER" color="green">
            <ContactPanel />
          </GameWindow>
        </div>
      </section>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 bg-dark z-10 relative">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 font-mono text-sm">
            © 2024 Vaishnav Portfolio | Press INSERT to Admin
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;