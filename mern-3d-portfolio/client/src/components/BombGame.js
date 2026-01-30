import React, { useEffect, useRef, useState } from 'react';
import { GiGamepad, GiTrophy } from 'react-icons/gi';

const BombGame = ({ active }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameState, setGameState] = useState('lobby'); // lobby, playing, gameover
    const gameStateRef = useRef('lobby');

    // Game Refs
    const playerRef = useRef({ x: 200, y: 350, width: 40, height: 40, speed: 6, vx: 0 });
    const bombsRef = useRef([]);
    const particlesRef = useRef([]); // For explosions
    const frameRef = useRef(0);
    const scoreRef = useRef(0);
    const requestRef = useRef(null);
    const keysRef = useRef({});

    useEffect(() => {
        const savedHigh = localStorage.getItem('bombSquadHighScore');
        if (savedHigh) setHighScore(parseInt(savedHigh));
    }, []);

    const startGame = () => {
        setGameState('playing');
        gameStateRef.current = 'playing';
        resetGame();
    };

    const resetGame = () => {
        const canvas = canvasRef.current;
        setScore(0);
        scoreRef.current = 0;
        frameRef.current = 0;
        bombsRef.current = [];
        particlesRef.current = [];
        // Center player
        playerRef.current = {
            x: canvas ? canvas.width / 2 - 20 : 200,
            y: canvas ? canvas.height - 50 : 350,
            width: 40,
            height: 40,
            speed: 6,
            vx: 0
        };
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        gameLoop();
    };

    const createExplosion = (x, y, color = '#f59e0b') => {
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            particlesRef.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    };

    const gameOver = () => {
        setGameState('gameover');
        gameStateRef.current = 'gameover';
        createExplosion(playerRef.current.x + 20, playerRef.current.y + 20, '#ef4444');

        if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current);
            localStorage.setItem('bombSquadHighScore', scoreRef.current);
        }
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Clear
        ctx.fillStyle = '#111827'; // Dark BG
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Grid Background
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 1;
        const gridSize = 40;
        const offset = (frameRef.current * 2) % gridSize;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
        }
        for (let y = offset - gridSize; y <= canvas.height; y += gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }
        ctx.stroke();

        if (gameStateRef.current === 'playing') {
            // Player Movement
            const p = playerRef.current;
            if (keysRef.current['ArrowLeft'] && p.x > 0) {
                p.x -= p.speed;
            }
            if (keysRef.current['ArrowRight'] && p.x < canvas.width - p.width) {
                p.x += p.speed;
            }

            // Draw Player (Shield Shape)
            ctx.fillStyle = '#3b82f6'; // Blue
            ctx.shadowColor = '#3b82f6';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.width, p.y);
            ctx.lineTo(p.x + p.width, p.y + p.height - 10);
            ctx.lineTo(p.x + p.width / 2, p.y + p.height);
            ctx.lineTo(p.x, p.y + p.height - 10);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;

            // Spawn Bombs
            // Difficulty Curve: Speed/Rate based on score
            const difficulty = Math.min(scoreRef.current / 500, 5); // Caps at 2500 score
            const spawnRate = Math.max(30 - difficulty * 4, 10); // Spawns faster
            const bombSpeed = 3 + Math.random() * 2 + difficulty;

            if (frameRef.current % Math.floor(spawnRate) === 0) {
                bombsRef.current.push({
                    x: Math.random() * (canvas.width - 30),
                    y: -30,
                    width: 30,
                    height: 30,
                    speed: bombSpeed,
                    rotation: 0
                });
            }

            // Update Bombs
            for (let i = bombsRef.current.length - 1; i >= 0; i--) {
                const bomb = bombsRef.current[i];
                bomb.y += bomb.speed;
                bomb.rotation += 0.1;

                // Draw Bomb
                ctx.save();
                ctx.translate(bomb.x + 15, bomb.y + 15);
                ctx.rotate(bomb.rotation);
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(0, 0, 12, 0, Math.PI * 2);
                ctx.fill();
                // Fuse
                ctx.strokeStyle = '#fbbf24';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, -12);
                ctx.quadraticCurveTo(5, -20, 10, -15);
                ctx.stroke();
                ctx.restore();

                // Collision
                if (
                    bomb.x < p.x + p.width - 8 && // Hitbox tightening
                    bomb.x + bomb.width > p.x + 8 &&
                    bomb.y < p.y + p.height - 5 &&
                    bomb.y + bomb.height > p.y + 5
                ) {
                    gameOver();
                }

                // Remove off-screen
                if (bomb.y > canvas.height) {
                    bombsRef.current.splice(i, 1);
                    scoreRef.current += 10;
                    setScore(scoreRef.current);
                }
            }
        }

        // Update Particles (Always run for explosion effect)
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const part = particlesRef.current[i];
            part.x += part.vx;
            part.y += part.vy;
            part.life -= 0.02;
            part.size *= 0.95;

            ctx.globalAlpha = part.life;
            ctx.fillStyle = part.color;
            ctx.beginPath();
            ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;

            if (part.life <= 0) particlesRef.current.splice(i, 1);
        }

        frameRef.current++;
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    useEffect(() => {
        const handleDown = (e) => {
            if (active) keysRef.current[e.key] = true;
            // Prevent scrolling with arrows
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        };
        const handleUp = (e) => keysRef.current[e.key] = false;

        window.addEventListener('keydown', handleDown);
        window.addEventListener('keyup', handleUp);

        // Initial draw for lobby background
        if (gameState === 'lobby') {
            requestRef.current = requestAnimationFrame(gameLoop);
        }

        return () => {
            window.removeEventListener('keydown', handleDown);
            window.removeEventListener('keyup', handleUp);
            cancelAnimationFrame(requestRef.current);
        };
    }, [active, gameState]);

    return (
        <div className="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center border-4 border-gray-800 shadow-2xl">
            {/* HUD */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none z-10">
                <div className="bg-gray-900/80 backdrop-blur px-4 py-2 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400 font-mono">SCORE</p>
                    <p className="text-2xl font-bold text-white font-mono">{score}</p>
                </div>
                <div className="bg-gray-900/80 backdrop-blur px-4 py-2 rounded-lg border border-yellow-500/30">
                    <p className="text-xs text-yellow-500 font-mono">HIGH SCORE</p>
                    <p className="text-xl font-bold text-yellow-500 font-mono">{highScore}</p>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                width={600}
                height={500}
                className="w-full h-full object-cover"
            />

            {/* LOBBY SCREEN */}
            {gameState === 'lobby' && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                    <div className="text-6xl mb-6 animate-bounce">💣</div>
                    <h2 className="text-5xl font-black text-white font-space mb-2 tracking-wider">BOMB SQUAD</h2>
                    <p className="text-gray-400 font-mono mb-8 text-center max-w-md">
                        Evade the falling ordnance. Survive as long as you can.<br />
                        <span className="text-yellow-500">Speed increases over time.</span>
                    </p>
                    <button
                        onClick={startGame}
                        className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                    >
                        <span className="flex items-center gap-3 font-mono text-xl">
                            <GiGamepad className="text-2xl" />
                            DEPLOY AGENT
                        </span>
                        <div className="absolute inset-0 border-2 border-white/20 rounded-xl group-hover:border-white/50 transition-colors" />
                    </button>
                </div>
            )}

            {/* GAME OVER SCREEN */}
            {gameState === 'gameover' && (
                <div className="absolute inset-0 bg-red-900/80 backdrop-blur-md flex flex-col items-center justify-center z-20">
                    <h2 className="text-6xl font-black text-white mb-2 font-space drop-shadow-lg">MIA</h2>
                    <p className="text-red-200 font-mono text-xl mb-8 tracking-widest">MISSION FAILED</p>

                    <div className="bg-black/40 p-6 rounded-2xl border border-red-500/30 mb-8 w-64 text-center">
                        <p className="text-gray-400 text-sm font-mono mb-1">FINAL SCORE</p>
                        <p className="text-4xl font-bold text-white font-mono mb-4">{score}</p>

                        {score >= highScore && score > 0 && (
                            <div className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 animate-pulse">
                                <GiTrophy /> NEW RECORD
                            </div>
                        )}
                    </div>

                    <button
                        onClick={startGame}
                        className="px-8 py-3 bg-white text-red-600 hover:bg-gray-100 font-bold rounded-lg transition-colors font-mono text-lg shadow-lg"
                    >
                        RETRY MISSION
                    </button>
                    <button
                        onClick={() => {
                            setGameState('lobby');
                            gameStateRef.current = 'lobby';
                            resetGame();
                        }}
                        className="mt-4 text-white/50 hover:text-white text-sm font-mono border-b border-transparent hover:border-white transition-all"
                    >
                        RETURN TO BASE
                    </button>
                </div>
            )}
        </div>
    );
};

export default BombGame;
