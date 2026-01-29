import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun, ArrowRight, Mail, Copy, Check, ExternalLink, Twitter, Linkedin, Calendar } from 'lucide-react';

// --- CSS THEME ---
const themeStyles = `
  :root {
    --bg-main: #ffffff;
    --bg-card: #f9fafb;
    --text-main: #111827;
    --text-muted: #6b7280;
    --accent: #2563eb; /* Corporate Blue */
    --border: #e5e7eb;
  }

  .pitch-dark {
    --bg-main: #000000;
    --bg-card: #111111;
    --text-main: #ffffff;
    --text-muted: #a1a1aa;
    --accent: #3b82f6; /* Bright Blue */
    --border: #333333;
  }

  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: background-color 0.5s ease, color 0.5s ease;
  }
  
  .font-sans { font-family: 'Inter', sans-serif; }
  .font-serif { font-family: 'Playfair Display', serif; }
`;

// --- CONFIGURATION (Edit this to change the pitch) ---
const config = {
    // Brand Info
    name: "PROJECT: AETHER",
    type: "SaaS / Product / Service", // Label at top
    headline: "The One-Line Pitch That Explains Value Instantly.",
    subhead: "Don't build a complex backend yet. Validate the idea first. This template is designed to get you meetings, not users.",

    // The "Founder" Contact (No Backend required, just Email)
    email: "founder@example.com",
    calendly: "https://calendly.com", // For "Book a Call"
    twitter: "https://twitter.com",

    // Dummy Metrics for Social Proof
    stats: [
        { label: "Market Size", val: "$10B" },
        { label: "Growth YoY", val: "140%" },
        { label: "Waitlist", val: "2,000+" },
    ]
};

const ServicePitch = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [emailCopied, setEmailCopied] = useState(false);
    const [waitlistJoined, setWaitlistJoined] = useState(false); // Simulates backend state

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress);

    useEffect(() => {
        if (isDarkMode) document.body.classList.add('pitch-dark');
        else document.body.classList.remove('pitch-dark');
    }, [isDarkMode]);

    // --- ACTIONS (NO BACKEND) ---

    // 1. Copy Email to Clipboard
    const handleCopyEmail = () => {
        navigator.clipboard.writeText(config.email);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    // 2. Simulate Form Submission (Client-Side Only)
    const handleJoinWaitlist = (e) => {
        e.preventDefault();
        // In a real app, this would fetch() to an API.
        // Here, we just pretend it worked to show the UX.
        setWaitlistJoined(true);
    };

    return (
        <>
            <style>{themeStyles}</style>

            {/* Progress Bar */}
            <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[100]" />

            {/* --- NAVIGATION --- */}
            <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-[var(--bg-main)]/80 backdrop-blur border-b border-[var(--border)]">
                <span className="font-bold tracking-widest uppercase text-sm">{config.name}</span>
                <div className="flex gap-4">
                    {/* Simple Theme Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full hover:bg-[var(--bg-card)] text-[var(--text-main)] transition-colors"
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </nav>

            <div className="font-sans min-h-screen max-w-4xl mx-auto px-6 pt-32 pb-20 selection:bg-[var(--accent)] selection:text-white">

                {/* --- HERO SECTION --- */}
                <header className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="inline-block px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6"
                    >
                        {config.type}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8"
                    >
                        {config.headline}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        {config.subhead}
                    </motion.p>

                    {/* --- NO-BACKEND ACTION BUTTONS --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        {/* 1. MAILTO LINK (Opens Default Mail App) */}
                        <a
                            href={`mailto:${config.email}?subject=Interested in ${config.name}`}
                            className="px-8 py-4 bg-[var(--accent)] text-white font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2"
                        >
                            <Mail size={18} /> Contact Founder
                        </a>

                        {/* 2. EXTERNAL LINK (Calendly/Google Form) */}
                        <a
                            href={config.calendly}
                            target="_blank"
                            rel="noreferrer"
                            className="px-8 py-4 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-main)] font-bold rounded-lg hover:border-[var(--accent)] transition-all flex items-center gap-2"
                        >
                            <Calendar size={18} /> Book a Demo
                        </a>
                    </motion.div>

                    {/* 3. COPY TO CLIPBOARD (Utility) */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleCopyEmail}
                            className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] flex items-center gap-2 transition-colors"
                        >
                            {emailCopied ? <Check size={14} /> : <Copy size={14} />}
                            {emailCopied ? "Email Copied!" : "Copy Email Address"}
                        </button>
                    </div>
                </header>

                {/* --- SOCIAL PROOF GRID --- */}
                <section className="grid grid-cols-3 gap-4 mb-24 border-y border-[var(--border)] py-8">
                    {config.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl md:text-3xl font-black text-[var(--text-main)]">{stat.val}</div>
                            <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">{stat.label}</div>
                        </div>
                    ))}
                </section>

                {/* --- PROBLEM / SOLUTION (Static Content) --- */}
                <section className="grid md:grid-cols-2 gap-12 mb-24">
                    <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border)]">
                        <h3 className="text-[var(--accent)] font-bold uppercase tracking-widest text-xs mb-4">The Problem</h3>
                        <p className="text-lg leading-relaxed text-[var(--text-muted)]">
                            Describe the pain point here. Why does the current solution fail? Keep it emotional and relatable. Investors buy the problem before they buy the solution.
                        </p>
                    </div>
                    <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border)]">
                        <h3 className="text-[var(--accent)] font-bold uppercase tracking-widest text-xs mb-4">The Solution</h3>
                        <p className="text-lg leading-relaxed text-[var(--text-muted)]">
                            Describe your product/service here. How does it solve the problem 10x better? Use simple language. No jargon.
                        </p>
                    </div>
                </section>

                {/* --- "FAKE" WAITLIST DEMO --- */}
                {/* This demonstrates the UX without needing a database */}
                <section className="mb-24 text-center max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Get Early Access</h2>
                    <p className="text-[var(--text-muted)] mb-8">Join the waitlist to get notified when we launch. (Simulation)</p>

                    {!waitlistJoined ? (
                        <form onSubmit={handleJoinWaitlist} className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                required
                                className="flex-1 px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                            />
                            <button type="submit" className="px-6 py-3 bg-[var(--text-main)] text-[var(--bg-main)] font-bold rounded-lg hover:opacity-80 transition-opacity">
                                Join
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 font-bold flex items-center justify-center gap-2"
                        >
                            <Check size={20} /> You're on the list!
                        </motion.div>
                    )}
                    <p className="text-xs text-[var(--text-muted)] mt-4">
                        *This form uses React State to simulate a signup. No data is sent.
                    </p>
                </section>

                {/* --- FOOTER / EXTERNAL LINKS --- */}
                <footer className="text-center pt-12 border-t border-[var(--border)]">
                    <div className="flex justify-center gap-8 mb-8">
                        <a href={config.twitter} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                            <Twitter size={24} />
                        </a>
                        <a href="#" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                            <Linkedin size={24} />
                        </a>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
                        © 2026 {config.name}. All Rights Reserved.
                    </p>
                </footer>

            </div>
        </>
    );
};

export default ServicePitch;