import React, { useEffect, useRef, useState } from 'react';

const DinoGame = () => {
    const canvasRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const dinoRef = useRef({
        x: 50,
        y: 150,
        width: 30,
        height: 30,
        dy: 0,
        jumpPower: -10,
        gravity: 0.5,
        grounded: true
    });

    const obstaclesRef = useRef([]);
    const frameRef = useRef(0);
    const scoreRef = useRef(0);
    const gameLoopRef = useRef(null);

    const jump = () => {
        if (dinoRef.current.grounded && !isGameOver) {
            dinoRef.current.dy = dinoRef.current.jumpPower;
            dinoRef.current.grounded = false;
        } else if (isGameOver) {
            resetGame();
        }
    };

    const resetGame = () => {
        setIsGameOver(false);
        setScore(0);
        scoreRef.current = 0;
        frameRef.current = 0;
        obstaclesRef.current = [];
        dinoRef.current = {
            x: 50,
            y: 150,
            width: 30,
            height: 30,
            dy: 0,
            jumpPower: -10,
            gravity: 0.5,
            grounded: true
        };
        gameLoop();
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update Dino
        const dino = dinoRef.current;
        dino.dy += dino.gravity;
        dino.y += dino.dy;

        // Ground collision
        if (dino.y + dino.height > canvas.height - 20) {
            dino.y = canvas.height - 20 - dino.height;
            dino.dy = 0;
            dino.grounded = true;
        }

        // Draw Dino (Emoji)
        ctx.font = '30px serif';
        ctx.fillText('🦖', dino.x, dino.y + 25);

        // Spawn Obstacles
        if (frameRef.current % 100 === 0) {
            obstaclesRef.current.push({
                x: canvas.width,
                y: canvas.height - 50,
                width: 20,
                height: 30,
                speed: 5 + (scoreRef.current * 0.01)
            });
        }

        // Update & Draw Obstacles
        obstaclesRef.current.forEach((obs, index) => {
            obs.x -= obs.speed;
            ctx.fillText('🌵', obs.x, obs.y + 25);

            // Collision Detection
            if (
                dino.x < obs.x + obs.width &&
                dino.x + dino.width > obs.x &&
                dino.y < obs.y + obs.height &&
                dino.y + dino.height > obs.y
            ) {
                setIsGameOver(true);
                cancelAnimationFrame(gameLoopRef.current);
                return;
            }

            // Remove off-screen
            if (obs.x + obs.width < 0) {
                obstaclesRef.current.splice(index, 1);
                scoreRef.current += 1;
                setScore(scoreRef.current);
            }
        });

        // Ground Line
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 20);
        ctx.lineTo(canvas.width, canvas.height - 20);
        ctx.strokeStyle = '#666';
        ctx.stroke();

        if (!isGameOver) {
            frameRef.current++;
            gameLoopRef.current = requestAnimationFrame(gameLoop);
        }
    };

    useEffect(() => {
        // Initial start
        gameLoop();

        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                jump();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(gameLoopRef.current);
        };
    }, [isGameOver]);

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-900 rounded-2xl relative overflow-hidden" onClick={jump}>
            <div className="absolute top-4 left-4 text-white font-mono z-10">
                SCORE: {score}
            </div>

            {isGameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 backdrop-blur-sm">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-red-500 mb-2 font-space">GAME OVER</h2>
                        <p className="text-white font-mono mb-4">Score: {score}</p>
                        <button
                            onClick={(e) => { e.stopPropagation(); resetGame(); }}
                            className="px-6 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition-colors"
                        >
                            TRY AGAIN
                        </button>
                    </div>
                </div>
            )}

            <canvas
                ref={canvasRef}
                width={500}
                height={300}
                className="max-w-full"
            />
            <p className="text-gray-500 text-xs mt-2 font-mono pb-4">Press SPACE or TAP to Jump</p>
        </div>
    );
};

export default DinoGame;
