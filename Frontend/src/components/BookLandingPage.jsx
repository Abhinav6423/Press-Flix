import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun, Download, Mail, BookOpen, Star, Target, Zap, Globe, Feather, Award, ChevronRight } from 'lucide-react';
import { trackCtaClick } from '../api-calls/trackCtaClick';
// --- THEME & 3D STYLES ---
const themeStyles = `
  :root {
    --bg-primary: #f8f5f2; /* Clean Paper */
    --bg-secondary: #eeeae4;
    --text-main: #1a1a1a;
    --text-muted: #66605b;
    --accent-color: #d94625; /* Strong Orange-Red for Conversion */
    --border-color: #dcd7d0;
    --card-bg: #ffffff;
    --book-spine: #8a2b15;
    --shadow-soft: 0 20px 40px -10px rgba(0,0,0,0.1);
    --shadow-hover: 0 30px 60px -15px rgba(0,0,0,0.15);
  }

  .premium-dark {
    --bg-primary: #0f0f0f;
    --bg-secondary: #1a1a1a;
    --text-main: #f0f0f0;
    --text-muted: #888888;
    --accent-color: #ff5e3a;
    --border-color: #333333;
    --card-bg: #1e1e1e;
    --book-spine: #ff5e3a;
    --shadow-soft: 0 20px 40px -10px rgba(0,0,0,0.6);
    --shadow-hover: 0 30px 60px -15px rgba(0,0,0,0.7);
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-main);
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  .noise {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  /* 3D BOOK ENGINE */
  .book-stage {
    perspective: 2000px;
    height: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .book-3d {
    position: relative; width: 260px; height: 390px;
    transform-style: preserve-3d;
    transform: rotateY(-25deg) rotateX(10deg);
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 20px 20px 60px rgba(0,0,0,0.3);
  }
  .book-3d:hover {
    transform: rotateY(-15deg) rotateX(5deg) scale(1.05) translateY(-10px);
    box-shadow: 30px 40px 90px rgba(0,0,0,0.4);
  }
  .book-cover {
    position: absolute; width: 100%; height: 100%;
    backface-visibility: hidden; z-index: 2;
    border-radius: 2px 4px 4px 2px;
    background-color: var(--text-main); overflow: hidden;
  }
  .book-spine {
    position: absolute; top: 0; bottom: 0; left: -14px; width: 16px;
    transform: rotateY(-90deg); transform-origin: right;
    background: var(--book-spine);
  }
  .book-pages {
    position: absolute; top: 2px; bottom: 2px; right: -12px; width: 14px;
    transform: rotateY(90deg); transform-origin: left;
    background: #fff;
    background-image: linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0.05) 100%);
  }

  .serif-font { font-family: 'Times New Roman', serif; }
  .sans-font { font-family: 'Inter', system-ui, sans-serif; }
  
  /* UTILS */
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(45deg, var(--text-main), var(--text-muted));
  }
`;

const BookLandingPage = ({ pitchData }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });




    useEffect(() => {
        if (isDarkMode) document.body.classList.add("premium-dark");
        else document.body.classList.remove("premium-dark");
    }, [isDarkMode]);

    // --- SMART DATA EXTRACTION ---
    // Handles the messy data structure from the dump
    const d = pitchData?.data || {};
    const meta = d.character || {}; // User's dump seems to put meta fields here

    // Core Identity
    const title = pitchData?.title || "Untitled Masterpiece";
    const author = d.author || "Unknown Author";
    const genre = d.genre || "Fiction";
    const status = d.status || "Draft";
    const hook = d.hook || "A compelling story waiting to be told.";
    const tone = d.tone ? d.tone.split(',').map(t => t.trim()) : ["Mystery", "Thriller"];

    // Story
    const synopsis = d.synopsis || "";
    const world = d.world || "";
    const theme = d.theme || "";

    // Conversion & Market (Checking both root data and character object)
    const coverUrl = meta.coverUrl || d.coverUrl || "https://images.unsplash.com/photo-1621944190310-7b315954dd1e?q=80&w=1000&auto=format&fit=crop";
    const ctaLabel = meta.ctaLabel || d.ctaLabel || "Read Now";
    const email = meta.contactEmail || d.contactEmail || "";
    const authorBio = meta.authorBio || d.authorBio || "";
    const credibility = meta.credibility || d.credibility || "";
    const audience = meta.audience || d.audience || "General Readers";
    const comps = meta.comps || d.comps || "Unique in its genre";
    const usp = meta.usp || d.usp || "";

    const handleCtaClick = async () => {
        const result = await trackCtaClick(pitchData._id);
        if (result.success) {
            console.log("CTA click tracked successfully");
        }

        else {
            console.error("Failed to track CTA click", result.message);
        }
    }

    return (
        <div className="min-h-screen font-sans selection:bg-[var(--accent-color)] selection:text-white pb-20 overflow-x-hidden">
            <style>{themeStyles}</style>
            <div className="noise" />

            {/* PROGRESS BAR */}
            <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent-color)] origin-left z-[100]" />

            {/* NAV */}
            <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)] transition-all">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--accent-color)] rounded-lg flex items-center justify-center text-white font-bold serif-font">
                        {title.charAt(0)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-main)] hidden sm:block">{title}</span>
                </div>
                <div className="flex items-center gap-4">
                    {status && (
                        <span className="px-3 py-1 rounded-full border border-[var(--accent-color)] text-[var(--accent-color)] text-[10px] font-bold uppercase tracking-widest bg-[var(--accent-color)]/5">
                            {status}
                        </span>
                    )}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-main)] transition-colors"
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">

                    {/* LEFT: Copy & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-center lg:text-left space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="inline-block text-[var(--accent-color)] font-bold tracking-wider text-sm uppercase mb-2">
                                {genre}
                            </span>
                            <h1 className="text-5xl md:text-7xl serif-font font-bold text-[var(--text-main)] leading-[0.95] tracking-tight">
                                {title}
                            </h1>
                            <p className="text-xl md:text-2xl text-[var(--text-muted)] serif-font italic leading-relaxed">
                                {hook}
                            </p>
                        </div>

                        {/* Tone Tags */}
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                            {tone.map((t, i) => (
                                <span key={i} className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-muted)] rounded text-xs font-medium uppercase tracking-wide">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Conversion Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                            <a
                                href={email ? `mailto:${email}` : "#"}
                                className="px-8 py-4 bg-[var(--accent-color)] text-white rounded-lg font-bold tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg hover:shadow-[var(--accent-color)]/30 transform hover:-translate-y-1"
                            >
                                {ctaLabel} <ChevronRight size={18} />
                            </a>
                            <button className="px-8 py-4 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-main)] rounded-lg font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-[var(--bg-secondary)] transition-colors">
                                <Download size={18} /> Download One-Pager
                            </button>
                        </div>

                        {/* Trust Signal / Credibility Tiny */}
                        {credibility && (
                            <div className="pt-4 flex items-center gap-3 justify-center lg:justify-start text-xs text-[var(--text-muted)] opacity-80">
                                <Award size={14} className="text-[var(--accent-color)]" />
                                <span>{credibility.substring(0, 60)}{credibility.length > 60 && "..."}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* RIGHT: 3D Book */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 book-stage"
                    >
                        <div className="book-3d">
                            <div className="book-front book-cover relative group">
                                <img src={coverUrl} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            </div>
                            <div className="book-spine"></div>
                            <div className="book-pages"></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- SOCIAL PROOF & MARKET FIT (The "Business" Section) --- */}
            <section className="bg-[var(--bg-secondary)]/50 border-y border-[var(--border-color)] py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Audience */}
                        <div className="p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm">
                            <div className="flex items-center gap-2 mb-4 text-[var(--accent-color)]">
                                <Target size={20} />
                                <h3 className="font-bold uppercase tracking-widest text-sm">Target Audience</h3>
                            </div>
                            <p className="text-[var(--text-muted)] leading-relaxed">{audience}</p>
                        </div>

                        {/* Comps */}
                        <div className="p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm">
                            <div className="flex items-center gap-2 mb-4 text-[var(--accent-color)]">
                                <Zap size={20} />
                                <h3 className="font-bold uppercase tracking-widest text-sm">Comparables</h3>
                            </div>
                            <p className="text-[var(--text-muted)] leading-relaxed">{comps}</p>
                        </div>

                        {/* USP */}
                        <div className="p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Star size={100} />
                            </div>
                            <div className="flex items-center gap-2 mb-4 text-[var(--accent-color)]">
                                <Star size={20} />
                                <h3 className="font-bold uppercase tracking-widest text-sm">Why It Sells</h3>
                            </div>
                            <p className="text-[var(--text-main)] font-medium leading-relaxed">{usp}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- THE STORY --- */}
            <section className="max-w-4xl mx-auto px-6 py-24 text-center">
                <span className="text-[var(--accent-color)] font-serif italic text-xl">The Premise</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-8 serif-font text-[var(--text-main)]">Enter the World</h2>
                <p className="text-xl md:text-2xl leading-relaxed text-[var(--text-muted)] serif-font">
                    "{synopsis}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 text-left">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-2 mb-4">
                            <Globe size={18} className="text-[var(--text-muted)]" />
                            <h4 className="font-bold uppercase tracking-widest text-sm text-[var(--text-main)]">The World</h4>
                        </div>
                        <p className="text-[var(--text-muted)] leading-relaxed">
                            {world || "A richly detailed setting waiting to be explored."}
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-2 mb-4">
                            <Feather size={18} className="text-[var(--text-muted)]" />
                            <h4 className="font-bold uppercase tracking-widest text-sm text-[var(--text-main)]">Core Theme</h4>
                        </div>
                        <p className="text-[var(--text-muted)] leading-relaxed">
                            {theme || "A universal story of human experience."}
                        </p>
                    </div>
                </div>
            </section>

            {/* --- AUTHOR AUTHORITY --- */}
            <section className="py-20 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
                    <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-full mx-auto flex items-center justify-center text-3xl font-serif text-[var(--accent-color)] border-2 border-[var(--accent-color)]">
                        {author.charAt(0)}
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold serif-font">About {author}</h2>
                        {authorBio ? (
                            <p className="text-[var(--text-muted)] leading-relaxed text-lg">{authorBio}</p>
                        ) : (
                            <p className="text-[var(--text-muted)] italic">Author biography not provided.</p>
                        )}
                    </div>

                    {credibility && (
                        <div className="inline-block px-6 py-3 bg-[var(--bg-primary)] rounded border border-[var(--border-color)]">
                            <p className="text-sm font-bold text-[var(--accent-color)] uppercase tracking-wide">
                                {credibility}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-24 bg-[var(--text-main)] text-[var(--bg-primary)] text-center px-6">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-4xl serif-font font-bold">Ready to see the manuscript?</h2>
                    <p className="opacity-80 text-lg">Contact us today to request the full deck or schedule a meeting.</p>
                    <div className="flex justify-center">
                        <div
                            onClick={handleCtaClick}
                            className="px-10 py-5 bg-[var(--accent-color)] text-white rounded font-bold text-lg tracking-wide hover:opacity-90 transition-opacity shadow-2xl"
                        >
                            {ctaLabel}
                        </div>
                    </div>
                    <p className="text-xs opacity-40 uppercase tracking-widest mt-8">
                        © {new Date().getFullYear()} {author}. All Rights Reserved.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default BookLandingPage;