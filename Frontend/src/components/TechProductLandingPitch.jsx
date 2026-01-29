import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Moon, Sun, Box, Cpu, Battery, Layers, Zap, ArrowRight, Hammer, Globe, ShieldCheck } from 'lucide-react';

// --- CSS THEME & INDUSTRIAL STYLES ---
const themeStyles = `
  :root {
    --bg-main: #f3f4f6;       /* Light Grey Surface */
    --bg-card: #ffffff;       /* Pure White Cards */
    --text-main: #111827;     /* Almost Black */
    --text-muted: #6b7280;    /* Muted Grey */
    --accent: #2563eb;        /* Engineering Blue */
    --border: #e5e7eb;
    --grid-color: rgba(0,0,0,0.1);
  }

  .tech-dark {
    --bg-main: #09090b;       /* Deep Matte Black */
    --bg-card: #18181b;       /* Zinc 900 */
    --text-main: #f4f4f5;     /* Zinc 100 */
    --text-muted: #a1a1aa;    /* Zinc 400 */
    --accent: #bef264;        /* Acid Lime (High-Tech feel) */
    --border: #27272a;
    --grid-color: rgba(255,255,255,0.1);
  }

  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: background-color 0.5s ease, color 0.5s ease;
  }

  /* TECHNICAL GRID BACKGROUND */
  .grid-bg {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
    mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
  }

  .font-mono { font-family: 'JetBrains Mono', 'Roboto Mono', monospace; }
  .font-sans { font-family: 'Inter', system-ui, sans-serif; }
`;

// --- DUMMY PRODUCT DATA (Replace with your idea) ---
const product = {
  name: "NEXUS-1",
  tagline: "The First Ambient Computing Node for Remote Teams.",
  description: "A physical desktop portal that keeps you connected without the distraction of a screen. Haptic presence, spatial audio, and one-touch collaboration.",
  stage: "Prototyping Phase - TRL 6", // Technology Readiness Level
  
  // Specs
  specs: [
    { label: "Material", val: "Anodized Aluminum 6061", icon: <Layers size={16}/> },
    { label: "Processor", val: "Quad-Core ARM Cortex", icon: <Cpu size={16}/> },
    { label: "Battery", val: "48h Continuous Use", icon: <Battery size={16}/> },
    { label: "Conn.", val: "WiFi 6E / BT 5.3", icon: <Zap size={16}/> },
  ],

  // Roadmap
  roadmap: [
    { phase: "Q1 2026", task: "Functional Prototype", status: "Complete" },
    { phase: "Q2 2026", task: "Design for Mfg (DFM)", status: "In Progress" },
    { phase: "Q3 2026", task: "Tooling & Molds", status: "Pending" },
    { phase: "Q4 2026", task: "Mass Production", status: "Pending" },
  ]
};

// --- COMPONENTS ---

const SectionBadge = ({ text }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[var(--border)] bg-[var(--bg-card)] text-[10px] uppercase tracking-widest font-bold text-[var(--accent)] mb-6 font-mono">
    <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse"></div>
    {text}
  </div>
);

const ProductLandingPitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark for Tech products
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  useEffect(() => {
    if (isDarkMode) document.body.classList.add('tech-dark');
    else document.body.classList.remove('tech-dark');
  }, [isDarkMode]);

  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <style>{themeStyles}</style>
      <div className="grid-bg"></div>

      {/* Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[100]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 backdrop-blur-md border-b border-[var(--border)] bg-[var(--bg-main)]/80">
        <div className="flex items-center gap-2">
           <Box className="text-[var(--accent)]" />
           <span className="font-bold tracking-tighter uppercase text-lg">Hardware<span className="text-[var(--text-muted)]">.Inc</span></span>
        </div>
        
        <div className="flex items-center gap-6">
            <span className="hidden md:block text-xs font-mono text-[var(--text-muted)] uppercase">Status: {product.stage}</span>
            <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full border border-[var(--border)] hover:bg-[var(--bg-card)] transition-colors text-[var(--text-main)]"
            >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 font-sans selection:bg-[var(--accent)] selection:text-[var(--bg-main)]">

        {/* --- 1. HERO: THE DEVICE --- */}
        <section className="min-h-[80vh] grid md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-6">
                <div className="inline-block px-4 py-2 bg-[var(--accent)] text-[var(--bg-main)] text-xs font-bold uppercase tracking-widest">
                    Project Alpha
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase">
                    Physical <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] to-[var(--text-muted)]">Connection.</span>
                </h1>
                <p className="text-xl text-[var(--text-muted)] max-w-md leading-relaxed">
                    {product.tagline} <br/>
                    <span className="text-sm font-mono mt-2 block opacity-70">// Reducing screen time by 40%.</span>
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <button className="px-8 py-4 bg-[var(--text-main)] text-[var(--bg-main)] font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity">
                        View Prototype
                    </button>
                    <button className="px-8 py-4 border border-[var(--border)] text-[var(--text-main)] bg-[var(--bg-card)] font-bold uppercase tracking-widest text-xs hover:border-[var(--accent)] transition-colors">
                        Tech Specs
                    </button>
                </div>
            </motion.div>

            {/* PRODUCT RENDER PLACEHOLDER */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1 }}
                className="relative h-[400px] md:h-[500px] bg-[var(--bg-card)] rounded-xl border border-[var(--border)] shadow-2xl overflow-hidden group perspective-1000"
            >
                {/* Simulated 3D Product Image */}
                <img 
                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop" 
                    alt="Device Prototype" 
                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Floating Tech Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[var(--bg-main)]/90 backdrop-blur border border-[var(--border)] rounded flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Model No.</p>
                        <p className="font-bold font-mono">NXS-01-PROTO</p>
                    </div>
                    <Battery className="text-[var(--accent)]" size={20} />
                </div>
            </motion.div>
        </section>


        {/* --- 2. PROBLEM & SOLUTION (The "Why") --- */}
        <section className="mb-32">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <SectionBadge text="The Problem" />
                    <h2 className="text-3xl font-bold uppercase tracking-tight mb-4">Digital Fatigue.</h2>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                        We spend 11 hours a day on screens. Remote work has turned our homes into notification centers. We've lost the tactile sensation of work.
                    </p>
                </div>
                <div className="md:col-span-2 bg-[var(--bg-card)] border border-[var(--border)] p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Cpu size={120} />
                    </div>
                    <SectionBadge text="The Solution" />
                    <h3 className="text-3xl font-bold mb-6">{product.name}</h3>
                    <p className="text-xl text-[var(--text-main)] leading-relaxed mb-8">
                        {product.description}
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {["Tactile Volume Control", "E-Ink Status Display", "Haptic Notifications", "Biometric Security"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-mono text-[var(--text-muted)]">
                                <div className="w-1.5 h-1.5 bg-[var(--accent)]"></div> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>


        {/* --- 3. TECH SPECS (The "What") --- */}
        <section className="mb-32">
            <div className="flex justify-between items-end mb-12 border-b border-[var(--border)] pb-4">
                 <h2 className="text-4xl font-black uppercase tracking-tighter">Specifications</h2>
                 <p className="font-mono text-xs text-[var(--accent)]">REV 2.0</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.specs.map((spec, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-6 bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors group"
                    >
                        <div className="mb-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                            {spec.icon}
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] mb-1">{spec.label}</p>
                        <p className="font-mono font-bold text-lg">{spec.val}</p>
                    </motion.div>
                ))}
            </div>
        </section>


        {/* --- 4. MANUFACTURING ROADMAP (The "When") --- */}
        <section className="mb-32">
             <SectionBadge text="Go-To-Market" />
             <div className="grid md:grid-cols-4 gap-8">
                 {product.roadmap.map((step, i) => (
                     <div key={i} className="relative">
                         {/* Connector Line */}
                         {i !== product.roadmap.length - 1 && (
                             <div className="absolute top-4 left-4 w-full h-[1px] bg-[var(--border)] -z-10"></div>
                         )}
                         
                         <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold mb-4 bg-[var(--bg-main)] ${step.status === 'Complete' ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-[var(--border)] text-[var(--text-muted)]'}`}>
                             {i + 1}
                         </div>
                         <h4 className="font-mono font-bold text-sm mb-1">{step.phase}</h4>
                         <p className="font-bold text-lg mb-2">{step.task}</p>
                         <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${step.status === 'Complete' ? 'bg-[var(--accent)] text-[var(--bg-main)]' : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)]'}`}>
                             {step.status}
                         </span>
                     </div>
                 ))}
             </div>
        </section>


        {/* --- 5. THE ASK / FOOTER --- */}
        <section className="bg-[var(--bg-card)] border border-[var(--border)] p-12 md:p-24 text-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--accent)]"></div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                    Build the Future <br/> of Hardware.
                </h2>
                <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-12">
                    We are currently raising our Seed Round to fund tooling and initial mass production. Join us in bringing tactile computing back.
                </p>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <button className="flex items-center justify-center gap-3 px-10 py-5 bg-[var(--accent)] text-[var(--bg-main)] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[var(--accent)]/20">
                        <ShieldCheck size={18} /> Invest in Seed Round
                    </button>
                    <button className="flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-[var(--text-main)] text-[var(--text-main)] font-bold uppercase tracking-widest hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-all">
                        <Globe size={18} /> View Pitch Deck
                    </button>
                </div>
            </motion.div>

            <div className="mt-20 pt-8 border-t border-[var(--border)] flex justify-between items-center text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono">
                <span>© 2026 Hardware Inc.</span>
                <span>Confidential - Do Not Distribute</span>
            </div>
        </section>

      </div>
    </>
  );
};

export default ProductLandingPitch;