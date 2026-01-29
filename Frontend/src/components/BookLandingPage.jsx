import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Moon, Sun, Download, Mail, User, Users, Target, Sparkles, Quote } from 'lucide-react';

// --- CSS VARIABLES & 3D BOOK STYLES ---
const themeStyles = `
  :root {
    --bg-primary: #f4f1ea; /* Bone/Paper White */
    --bg-secondary: #eaddcf;
    --bg-accent: #1a1a1a;
    --text-main: #1c1917;
    --text-muted: #57534e;
    --accent-color: #c2410c; /* Burnt Orange */
    --border-color: #d6d3d1;
    --card-bg: #ffffff;
    --book-spine: #9a3412;
  }

  .premium-dark {
    --bg-primary: #0a0a0a; /* Deep Black */
    --bg-secondary: #171717;
    --bg-accent: #f4f1ea;
    --text-main: #e5e5e5;
    --text-muted: #a3a3a3;
    --accent-color: #fb923c; /* Bright Orange */
    --border-color: #262626;
    --card-bg: #1c1917;
    --book-spine: #ea580c;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-main);
    transition: background-color 0.5s ease, color 0.5s ease;
  }

  /* GRAIN OVERLAY */
  .noise {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  /* 3D BOOK CSS */
  .book-container {
    perspective: 1500px;
  }
  .book {
    position: relative;
    width: 240px; 
    height: 360px;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
    box-shadow: 20px 20px 50px rgba(0,0,0,0.3);
  }
  .book:hover {
    transform: rotateY(-25deg) rotateX(10deg) scale(1.05);
    box-shadow: 30px 30px 70px rgba(0,0,0,0.4);
  }
  .book-front {
    position: absolute; width: 100%; height: 100%;
    backface-visibility: hidden;
    z-index: 2;
    border-radius: 2px 4px 4px 2px;
  }
  .book-spine {
    position: absolute;
    top: 0; bottom: 0; left: -14px; width: 15px;
    transform: rotateY(-90deg);
    transform-origin: right;
    background: var(--book-spine);
  }
  .book-side {
    position: absolute; top: 0; bottom: 0; right: -14px; width: 15px;
    transform: rotateY(90deg);
    transform-origin: left;
    background: #fff; /* Pages color */
    background-image: linear-gradient(90deg, #fff 0%, #ddd 5%, #fff 10%, #ddd 15%, #fff 20%);
    background-size: 3px 100%;
  }

  .font-serif { font-family: 'Times New Roman', serif; }
  .font-sans { font-family: 'Inter', sans-serif; }
  html { scroll-behavior: smooth; }
`;

// --- DUMMY CONTENT ---
const pitch = {
    title: "ECHOES OF SILICA",
    author: "J.D. Kincaid",
    genre: "Dystopian Sci-Fi / Noir",
    // 1. Hook
    hook: "A disgraced terraformer hunts a saboteur on a dying glass planet—only to realize the sabotage predicts his own deleted memories.",
    // 2. Big Idea
    theme: "Echoes of Silica explores the price of perfection. If you remove your trauma, are you still human?",
    // 3. Synopsis
    synopsis: "In the glass city of Aero, perfection is mandatory. Kael, a former architect turned detective, is hired to investigate a series of 'glitches' in the city's atmospheric dome. As he pulls the thread, he uncovers a conspiracy: the city isn't just malfunctioning; it's waking up.",
    // 4. Characters
    chars: [
        { name: "Kael Vossen", role: "Protagonist", trait: "Obsessive Detail-Oriented" },
        { name: "Unit 734", role: "Sidekick", trait: "Defective Android" },
        { name: "Halloway", role: "Antagonist", trait: "Coldly Utilitarian" }
    ],
    // 5. World
    world: "Aero: A city built entirely of shifting glass on a desert planet. The sun is lethal. Shadows are currency.",
    // 6. Audience
    audience: "Adult Sci-Fi & Thriller (25-45). Fans of Blade Runner 2049.",
    // 7. USP
    usp: "The environment is the murder weapon. The city shifts layout every 24 hours.",
    // Cover Image
    coverUrl: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000&auto=format&fit=crop"
};

// --- COMPONENTS ---
const SectionTitle = ({ num, title }) => (
    <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-[var(--border-color)] text-[10px] font-bold text-[var(--text-muted)]">{num}</span>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-color)]">{title}</h3>
    </div>
);

const BookLandingPitch = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress);

    useEffect(() => {
        if (isDarkMode) document.body.classList.add('premium-dark');
        else document.body.classList.remove('premium-dark');
    }, [isDarkMode]);

    return (
        <>
            <style>{themeStyles}</style>
            <div className="noise"></div>

            {/* Scroll Progress Bar */}
            <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent-color)] origin-left z-[100]" />

            {/* Nav */}
            <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-[var(--bg-primary)]">
                <div className="text-xs font-bold uppercase tracking-widest opacity-80">Pitch Deck v1.0</div>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                    {isDarkMode ? <Sun color='white' size={18} /> : <Moon color='gray' size={18} />}
                </button>
            </nav>

            <div className="max-w-5xl mx-auto px-6 font-sans selection:bg-[var(--accent-color)] selection:text-white">

                {/* --- 1. HERO & BOOK COVER --- */}
                <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 pt-20">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
                        className="flex-1 space-y-8 text-center md:text-left order-2 md:order-1"
                    >
                        <div className="inline-block px-3 py-1 border border-[var(--accent-color)] text-[var(--accent-color)] text-[10px] font-bold uppercase tracking-widest rounded-full">
                            Unpublished Manuscript
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-[var(--text-main)]">
                            ECHOES <br /> OF SILICA
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--text-muted)] font-serif italic">
                            "{pitch.hook}"
                        </p>
                        <div className="pt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                            <button className="px-6 py-3 bg-[var(--text-main)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--accent-color)] transition-colors">
                                Request Full Manuscript
                            </button>
                        </div>
                    </motion.div>

                    {/* 3D Book Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                        className="flex-1 flex justify-center order-1 md:order-2 book-container"
                    >
                        <div className="book">
                            <div className="book-front">
                                <img src={pitch.coverUrl} alt="Cover" className="w-full h-full object-cover rounded-r-md" />
                                {/* Title Overlay on Cover */}
                                <div className="absolute top-10 left-0 right-0 text-center text-white mix-blend-overlay">
                                    <h2 className="text-3xl font-black font-serif uppercase leading-none tracking-tighter">Echoes<br />of<br />Silica</h2>
                                </div>
                                <div className="absolute bottom-10 left-0 right-0 text-center text-white mix-blend-overlay">
                                    <p className="text-xs font-bold tracking-[0.3em] uppercase">{pitch.author}</p>
                                </div>
                            </div>
                            <div className="book-spine"></div>
                            <div className="book-side"></div>
                        </div>
                    </motion.div>
                </section>


                {/* --- 2 & 3. IDEA & SYNOPSIS --- */}
                <section className="py-24 border-t border-[var(--border-color)]">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <SectionTitle num="02" title="The Big Idea" />
                            <p className="text-3xl font-serif text-[var(--text-main)] leading-tight">{pitch.theme}</p>
                        </div>
                        <div className="bg-[var(--bg-secondary)] p-8 rounded-sm">
                            <SectionTitle num="03" title="Short Synopsis" />
                            <p className="text-[var(--text-muted)] text-lg leading-relaxed">{pitch.synopsis}</p>
                        </div>
                    </div>
                </section>


                {/* --- 4. CHARACTERS --- */}
                <section className="py-24 border-t border-[var(--border-color)]">
                    <SectionTitle num="04" title="Main Characters" />
                    <div className="grid md:grid-cols-3 gap-6">
                        {pitch.chars.map((char, i) => (
                            <div key={i} className="p-6 border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent-color)] transition-colors group">
                                <User size={20} className="text-[var(--text-muted)] mb-4 group-hover:text-[var(--accent-color)]" />
                                <h4 className="text-xl font-bold text-[var(--text-main)]">{char.name}</h4>
                                <p className="text-xs uppercase tracking-widest text-[var(--accent-color)] mb-2">{char.role}</p>
                                <p className="text-sm text-[var(--text-muted)] italic">"{char.trait}"</p>
                            </div>
                        ))}
                    </div>
                </section>


                {/* --- 5. WORLD & 7. USP --- */}
                <section className="py-24 border-t border-[var(--border-color)]">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="relative h-[400px] overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute bottom-0 left-0 p-8 bg-[var(--bg-primary)] m-4 max-w-xs shadow-lg">
                                <SectionTitle num="05" title="The World" />
                                <p className="text-sm text-[var(--text-main)]">{pitch.world}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center space-y-12">
                            <div>
                                <SectionTitle num="06" title="Audience" />
                                <div className="flex gap-4 items-start">
                                    <Users className="shrink-0 text-[var(--accent-color)]" />
                                    <p className="text-[var(--text-main)] text-lg">{pitch.audience}</p>
                                </div>
                            </div>
                            <div>
                                <SectionTitle num="07" title="Unique Selling Point" />
                                <div className="flex gap-4 items-start">
                                    <Sparkles className="shrink-0 text-[var(--accent-color)]" />
                                    <p className="text-[var(--text-main)] text-lg font-medium">{pitch.usp}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* --- 8, 9, 10. BIO & CTA --- */}
                <footer className="py-24 border-t border-[var(--border-color)] mb-20 text-center">
                    <div className="max-w-2xl mx-auto space-y-12">
                        <div>
                            <SectionTitle num="08" title="The Author" />
                            <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-full mx-auto mb-4 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-2xl font-serif text-[var(--text-main)]">{pitch.author}</h3>
                            <p className="text-[var(--text-muted)]">Ex-Architect turned writer. Debut Novel.</p>
                        </div>

                        <div className="p-8 bg-[var(--bg-secondary)] rounded-sm">
                            <Quote className="mx-auto mb-4 text-[var(--accent-color)]" size={24} />
                            <p className="font-serif italic text-xl text-[var(--text-main)]">"The glass doesn't reflect who you are. It reflects who you're afraid to be."</p>
                        </div>

                        <div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-[var(--text-main)] mb-8">Ready to Read?</h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-4 bg-[var(--accent-color)] text-white font-bold uppercase tracking-widest hover:brightness-110 flex items-center justify-center gap-2">
                                    <Mail size={18} /> Contact for Rights
                                </button>
                                <button className="px-8 py-4 border border-[var(--border-color)] text-[var(--text-main)] font-bold uppercase tracking-widest hover:bg-[var(--text-main)] hover:text-[var(--bg-primary)] flex items-center justify-center gap-2 transition-all">
                                    <Download size={18} /> Download One-Pager
                                </button>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
};

export default BookLandingPitch;