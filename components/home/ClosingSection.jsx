"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaCheck,
  FaFileDownload,
  FaGamepad,
  FaTimes,
  FaTrophy,
  FaBug,
  FaExclamationTriangle,
  FaShieldAlt,
  FaFingerprint
} from "react-icons/fa";

// ==========================================
// 🕹️ GAME ENGINE (Unchanged but optimized)
// ==========================================

const GameCanvas = ({ onGameOver }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const scoreRef = useRef(0);
  const gameState = useRef({
    player: { x: 200, y: 350, width: 30, height: 30, color: "#E8D8C4" },
    bullets: [],
    enemies: [],
    particles: [],
    lastEnemySpawn: 0,
    frames: 0,
    isActive: true,
  });

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    gameState.current.player.x = Math.max(15, Math.min(x, rect.width - 15));
  };

  const handleClick = () => {
    if (!gameState.current.isActive) return;
    gameState.current.bullets.push({
      x: gameState.current.player.x,
      y: gameState.current.player.y - 10,
      radius: 4,
      speed: 10,
      color: "#00ffcc"
    });
  };

  const update = useCallback((time) => {
    if (!gameState.current.isActive) return;

    const state = gameState.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear & Grid
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(232, 216, 196, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    const gridOffset = (state.frames * 2) % 40;
    for (let i = 0; i < width; i += 40) { ctx.moveTo(i, 0); ctx.lineTo(i, height); }
    for (let i = gridOffset; i < height; i += 40) { ctx.moveTo(0, i); ctx.lineTo(width, i); }
    ctx.stroke();

    // Player
    ctx.fillStyle = state.player.color;
    ctx.beginPath();
    ctx.moveTo(state.player.x, state.player.y - 15);
    ctx.lineTo(state.player.x - 10, state.player.y + 15);
    ctx.lineTo(state.player.x + 10, state.player.y + 15);
    ctx.fill();

    // Bullets
    for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        b.y -= b.speed;
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (b.y < 0) state.bullets.splice(i, 1);
    }

    // Enemies
    if (time - state.lastEnemySpawn > 1000) {
        const type = Math.random() > 0.7 ? 'bug' : 'warn';
        state.enemies.push({
            x: Math.random() * (width - 40) + 20,
            y: -30,
            speed: 2 + Math.random() * 2,
            type: type,
            color: type === 'bug' ? '#ff4d4d' : '#ffd700'
        });
        state.lastEnemySpawn = time;
    }

    for (let i = state.enemies.length - 1; i >= 0; i--) {
        const e = state.enemies[i];
        e.y += e.speed;
        ctx.fillStyle = e.color;
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(e.type === 'bug' ? "🦠" : "⚠️", e.x, e.y);

        // Bullet Hit
        for (let j = state.bullets.length - 1; j >= 0; j--) {
            const b = state.bullets[j];
            if (Math.hypot(b.x - e.x, b.y - e.y) < 20) {
                createExplosion(e.x, e.y, e.color);
                scoreRef.current += 100;
                state.enemies.splice(i, 1);
                state.bullets.splice(j, 1);
                break;
            }
        }
        
        // Player Hit
        if (state.enemies[i] && Math.hypot(state.player.x - e.x, state.player.y - e.y) < 25) {
            gameState.current.isActive = false;
            onGameOver(scoreRef.current);
        }
        if (state.enemies[i] && e.y > height) state.enemies.splice(i, 1);
    }

    // Particles
    for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        if (p.life <= 0) state.particles.splice(i, 1);
    }

    // Score
    ctx.fillStyle = "#fff";
    ctx.font = "14px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`SCORE: ${scoreRef.current}`, 10, 20);

    state.frames++;
    requestRef.current = requestAnimationFrame((t) => update(t));
  }, [onGameOver]);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
        gameState.current.particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1.0, color, size: Math.random() * 3
        });
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame((t) => update(t));
    return () => cancelAnimationFrame(requestRef.current);
  }, [update]);

  return (
    <canvas 
        ref={canvasRef} width={400} height={400}
        onMouseMove={handleMouseMove} onClick={handleClick}
        className="w-full h-full cursor-none bg-[#120305]"
    />
  );
};


// ==========================================
// 📺 THE HOLO CONSOLE (Left Side)
// ==========================================

const HoloConsole = () => {
    const [mode, setMode] = useState("idle"); // 'idle', 'game', 'gameover'
    const [gameOverScore, setGameOverScore] = useState(null);

    const handleGameOver = (score) => {
        setGameOverScore(score);
        setMode("gameover");
      };
      

    return (
        <div className="relative w-full max-w-[420px] h-[420px] rounded-2xl border-2 border-[#C7B7A3]/10 bg-[#1a0508] shadow-2xl overflow-hidden flex flex-col group">
            
            {/* Header */}
            <div className="h-10 border-b border-[#C7B7A3]/10 bg-[#150406] flex items-center justify-between px-4 z-20">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${mode === 'game' ? 'bg-green-500 animate-pulse' : 'bg-red-500/50'}`} />
                    <span className="text-[10px] font-mono text-[#C7B7A3]/60 tracking-widest uppercase">
                        {mode === 'game' ? "SYSTEM :: ENGAGED" : "SYSTEM :: STANDBY"}
                    </span>
                </div>
                
                {mode !== 'idle' && (
                    <button onClick={() => setMode("idle")} className="text-[10px] text-red-400 hover:text-white uppercase tracking-wider flex items-center gap-1">
                        <FaTimes /> ABORT
                    </button>
                )}
            </div>

            {/* Viewport */}
            <div className="relative flex-1 w-full h-full">
                
                {/* 1. IDLE MODE (The Fight Button) */}
                {mode === "idle" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
                        
                        <div className="relative z-10 mb-6">
                            <FaShieldAlt className="text-6xl text-[#C7B7A3]/20 mb-4 mx-auto" />
                            <h3 className="text-[#E8D8C4] font-bold text-lg tracking-widest">DEFENSE PROTOCOL</h3>
                            <p className="text-[#C7B7A3]/40 text-xs font-mono mt-2">Bugs detected in sector 004.<br/>Manual intervention required.</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMode("game")}
                            className="relative group px-8 py-4 bg-[#E8D8C4] text-[#2a0a10] font-bold uppercase tracking-widest text-sm clip-path-polygon"
                            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <FaGamepad /> FIGHT GERMS
                            </span>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                        </motion.button>
                    </div>
                )}

                {/* 2. GAME MODE */}
                {mode === "game" && <GameCanvas onGameOver={handleGameOver} />}

                {/* 3. GAME OVER */}
                {mode === "gameover" && (
                    <div className="absolute inset-0 bg-[#120305]/95 flex flex-col items-center justify-center text-center z-30">
                        <FaTrophy className="text-4xl text-[#E8D8C4] mb-3" />
                        <h3 className="text-xl text-[#E8D8C4] font-serif mb-1">Sector Cleared</h3>
                        <p className="text-[#C7B7A3] font-mono mb-6 text-sm">SCORE: {gameOverScore}</p>
                        <button onClick={() => setMode("game")} className="px-6 py-2 bg-[#E8D8C4] text-[#2a0a10] text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition">
                            Reboot
                        </button>
                    </div>
                )}
            </div>

{/* 🔥 INTERACTION HINT LINE */}
{/* 🔥 INTERACTION HINT LINE */}
{mode !== "idle" && (
  <div className="h-7 flex items-center justify-center relative overflow-hidden border-t border-[#C7B7A3]/10 bg-[#150406]">
    <motion.div
      initial={{ x: "-40%" }}
      animate={{ x: "40%" }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5,
        ease: "easeInOut",
      }}
      className="absolute h-[1px] w-32 bg-[#E8D8C4]/40 rounded-full z-0"
    />
    <span className="relative z-10 text-xs font-mono text-[#C7B7A3]/70 tracking-[0.2em] bg-[#150406] px-2">
      {mode === "game" ? "CLICK TO REBOOT" : "CLICK / TAP TO SHOOT"}
    </span>
  </div>
)}


            
        </div>
    );
};


// ==========================================
// 📝 MAIN CONTACT SECTION
// ==========================================

const ClosingSection = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-[#2a0a10] px-6 lg:px-8 border-t border-[#C7B7A3]/10 flex items-center justify-center py-20 overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8D8C4] rounded-full blur-[200px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#561C24] rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10 items-center">
  
        {/* --- LEFT COLUMN: Console --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between min-h-[620px] items-center lg:items-start">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C7B7A3] mb-5">
            (004) — Interaction
          </span>

          <h2 className="text-4xl md:text-5xl font-medium text-[#E8D8C4] leading-[1] mb-6 text-center lg:text-left">
            Let's <br />
            <span className="text-[#C7B7A3] opacity-60 italic font-serif">collaborate.</span>
          </h2>

          <p className="text-sm text-[#C7B7A3] font-light max-w-sm leading-relaxed mb-8 text-center lg:text-left">
            Clear the bugs in the simulation, or send a direct transmission via the form.
          </p>

          <HoloConsole />
          
        </motion.div>

        {/* --- RIGHT COLUMN: Form + Resume Box --- */}
        <div className="flex flex-col  gap-6">
            
            {/* 1. THE FORM */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative bg-[#1a0508]  border border-[#C7B7A3]/10 p-8 rounded-3xl w-full shadow-2xl"
            >
                <AnimatePresence>
                    {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#1a0508] z-40 flex flex-col items-center justify-center text-center rounded-3xl"
                    >
                        <FaCheck className="text-3xl text-green-400 mb-4" />
                        <h3 className="text-xl text-[#E8D8C4] font-serif italic">Received.</h3>
                        <button onClick={() => setStatus("idle")} className="text-xs uppercase text-[#C7B7A3] mt-4 border-b border-[#C7B7A3] pb-1">Reset</button>
                    </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text" name="name" required placeholder="Your Name"
                            value={formState.name} onChange={handleChange}
                            className="w-full bg-transparent border-b border-[#C7B7A3]/20 py-3 text-[#E8D8C4] focus:outline-none focus:border-[#E8D8C4] transition-colors placeholder:text-[#C7B7A3]/20 text-sm"
                        />
                    </div>
                    <div>
                        <input
                            type="email" name="email" required placeholder="email@address.com"
                            value={formState.email} onChange={handleChange}
                            className="w-full bg-transparent border-b border-[#C7B7A3]/20 py-3 text-[#E8D8C4] focus:outline-none focus:border-[#E8D8C4] transition-colors placeholder:text-[#C7B7A3]/20 text-sm"
                        />
                    </div>
                    <div>
                        <textarea
                            name="message" required placeholder="Project details..."
                            rows="2" // Small message box
                            value={formState.message} onChange={handleChange}
                            className="w-full bg-transparent border-b border-[#C7B7A3]/20 py-3 text-[#E8D8C4] resize-none focus:outline-none focus:border-[#E8D8C4] transition-colors placeholder:text-[#C7B7A3]/20 text-sm"
                        />
                    </div>

                    <button
                    type="submit" disabled={status === "sending"}
                    className="w-full py-3 rounded-lg bg-[#C7B7A3]/10 text-[#E8D8C4] text-sm font-medium border border-[#C7B7A3]/20 hover:bg-[#E8D8C4] hover:text-[#2a0a10] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {status === "sending" ? "Transmitting..." : "Send Message"}
                        <FaPaperPlane className="text-xs" />
                    </button>
                </form>
            </motion.div>

            {/* 2. THE RESUME BOX (Rectangular, below form) */}
            <motion.a
                href="/resume.pdf"
                download="Sujal_Koshta_Resume"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#E8D8C4]/5 border border-[#C7B7A3]/20 p-5 rounded-xl flex items-center justify-between cursor-pointer group hover:bg-[#E8D8C4] transition-colors duration-300"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#2a0a10] flex items-center justify-center text-[#E8D8C4] group-hover:bg-[#2a0a10]/10 group-hover:text-[#2a0a10] transition-colors">
                        <FaFingerprint className="text-lg" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#E8D8C4] font-bold text-sm tracking-wide group-hover:text-[#2a0a10]">RESUME.PDF</span>
                        <span className="text-[#C7B7A3]/50 text-[10px] uppercase font-mono group-hover:text-[#2a0a10]/60">Secure Download • 1.2MB</span>
                    </div>
                </div>
                <div className="text-[#C7B7A3] group-hover:text-[#2a0a10] transition-colors">
                    <FaFileDownload className="text-xl" />
                </div>
            </motion.a>

        </div>
      </div>
    </section>
  );
};

export default ClosingSection;