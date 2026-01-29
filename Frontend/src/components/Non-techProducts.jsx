import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Moon, Sun, Leaf, Droplet, Globe, Heart, Star, TrendingUp, ShoppingBag, ArrowUpRight } from 'lucide-react';

// --- CSS THEME: ORGANIC & LIFESTYLE ---
const themeStyles = `
  :root {
    /* LIGHT: Natural, Earthy, Clean */
    --bg-main: #fbfaf8;       /* Warm Alabaster */
    --bg-card: #ffffff;
    --text-main: #2d3436;     /* Soft Black */
    --text-muted: #636e72;
    --accent: #386641;        /* Hunter Green (Trust/Nature) */
    --accent-light: #a3b18a;
    --border: #e0e0e0;
  }

  .lifestyle-dark {
    /* DARK: Luxury, Moody, Premium */
    --bg-main: #1c1c1c;       /* Matte Charcoal */
    --bg-card: #262626;
    --text-main: #f5f5f0;     /* Off-White */
    --text-muted: #a8a8a8;
    --accent: #d4a373;        /* Clay/Bronze (Luxury) */
    --accent-light: #7f5539;
    --border: #333333;
  }

  body {
    background-color: var(--bg-main);
    color: var(--text-main);
    transition: background-color 0.6s ease, color 0.6s ease;
  }

  /* SUBTLE TEXTURE (Paper/Canvas feel) */
  .texture-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: -1; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  .font-serif { font-family: 'Playfair Display', 'Merriweather', serif; }
  .font-sans { font-family: 'Inter', sans-serif; }
`;

// --- DUMMY DATA (Example: A Sustainable Skincare Brand) ---
// *Note: This structure works equally well for Coffee, Sneakers, or Chairs.
const product = {
  name: "AURORA BOTANICS",
  category: "Sustainable Wellness",
  tagline: "The serum that bridges the gap between nature and clinical efficacy.",
  stats: [
    { label: "Units Sold", val: "15,000+" },
    { label: "Repeat Rate", val: "42%" },
    { label: "Retail Partners", val: "12" },
  ],
  // Instead of "Specs", we use "Composition" or "Materials"
  composition: [
    { name: "Squalane", desc: "Plant-derived hydration", icon: <Droplet size={20}/> },
    { name: "Packaging", desc: "100% Compostable", icon: <Leaf size={20}/> },
    { name: "Sourcing", desc: "Fair Trade Certified", icon: <Globe size={20}/> },
    { name: "Cruelty Free", desc: "Leaping Bunny Cert.", icon: <Heart size={20}/> },
  ],
  roadmap: [
    { phase: "Q1", task: "Direct-to-Consumer Launch" },
    { phase: "Q2", task: "Boutique Retail Expansion" },
    { phase: "Q3", task: "New SKU: Night Cream" },
    { phase: "Q4", task: "International Distribution" },
  ]
};

const NonTechProductsLandingPitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to Light for Lifestyle
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  useEffect(() => {
    if (isDarkMode) document.body.classList.add('lifestyle-dark');
    else document.body.classList.remove('lifestyle-dark');
  }, [isDarkMode]);

  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <style>{themeStyles}</style>
      <div className="texture-overlay"></div>

      {/* Progress Bar (Subtle) */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[100]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 md:px-12 flex justify-between items-center z-50 bg-[var(--bg-main)]/90 backdrop-blur-sm transition-colors border-b border-[var(--border)]">
        <div className="flex flex-col">
           <span className="font-serif font-black tracking-wide text-lg md:text-xl uppercase">{product.name}</span>
           <span className="text-[10px] font-sans tracking-[0.2em] text-[var(--accent)] uppercase hidden md:block">Investor Relations</span>
        </div>
        
        <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border)] transition-all text-[var(--text-main)]"
        >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <div className="font-sans selection:bg-[var(--accent)] selection:text-white pb-32">

        {/* --- 1. HERO: LIFESTYLE & EMOTION --- */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
             
             {/* Background Image with Parallax or Fade */}
             <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop" 
                  alt="Product Lifestyle" 
                  className="w-full h-full object-cover opacity-90 dark:opacity-60 transition-opacity duration-700"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-main)]/10 via-transparent to-[var(--bg-main)]"></div>
             </div>

             <div className="relative z-10 max-w-4xl text-center space-y-6">
                <motion.div 
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="inline-block px-4 py-1 bg-[var(--bg-main)]/80 backdrop-blur rounded-full text-[var(--accent)] text-xs font-bold tracking-[0.2em] uppercase mb-4"
                >
                    {product.category}
                </motion.div>
                
                <motion.h1 
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--text-main)] drop-shadow-sm"
                >
                   Nature.<br/>Refined.
                </motion.h1>

                <motion.p 
                  initial="hidden" animate="visible" variants={fadeInUp}
                  className="text-xl md:text-2xl text-[var(--text-main)] font-serif italic max-w-2xl mx-auto"
                >
                   "{product.tagline}"
                </motion.p>
             </div>

             {/* Scroll Indicator */}
             <motion.div 
               animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
               className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--text-main)] opacity-70"
             >
                <ArrowUpRight className="rotate-135" size={32} />
             </motion.div>
        </section>


        {/* --- 2. THE MARKET GAP (Problem) --- */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative aspect-[4/5] overflow-hidden rounded-sm group">
                     <img 
                        src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop" 
                        alt="Process" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                     />
                     <div className="absolute bottom-6 left-6 bg-[var(--bg-card)] p-4 shadow-lg max-w-xs">
                        <p className="font-serif text-sm italic">"The industry is filled with fillers. We stripped it back to the essentials."</p>
                     </div>
                </div>
                <div className="order-1 md:order-2 space-y-8">
                    <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[var(--accent)]">The Gap</h2>
                    <h3 className="font-serif text-4xl md:text-5xl text-[var(--text-main)] leading-tight">
                        Consumers are tired of compromising between <span className="text-[var(--text-muted)] italic">purity</span> and <span className="text-[var(--text-muted)] italic">performance</span>.
                    </h3>
                    <p className="text-lg text-[var(--text-main)] leading-relaxed">
                        Legacy brands are too clinical. Indie brands are too inconsistent. We created the middle ground: Clinical results, harvested from the earth, packaged for the future.
                    </p>
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[var(--border)]">
                        {product.stats.map((stat, i) => (
                           <div key={i}>
                              <p className="text-3xl font-serif font-bold text-[var(--text-main)]">{stat.val}</p>
                              <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">{stat.label}</p>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>


        {/* --- 3. PRODUCT & COMPOSITION (The "Ingredients") --- */}
        <section className="py-24 bg-[var(--bg-card)] border-y border-[var(--border)]">
             <div className="max-w-6xl mx-auto px-6">
                 <div className="text-center mb-20">
                     <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[var(--text-main)]">Conscious Composition</h2>
                     <p className="text-[var(--text-muted)] font-serif italic">What goes in is just as important as what stays out.</p>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {product.composition.map((item, i) => (
                         <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-8 bg-[var(--bg-main)] rounded-sm text-center group border border-transparent hover:border-[var(--border)] transition-all"
                         >
                            <div className="w-16 h-16 mx-auto bg-[var(--bg-card)] rounded-full flex items-center justify-center text-[var(--accent)] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h4 className="font-bold text-[var(--text-main)] uppercase tracking-wide text-sm mb-2">{item.name}</h4>
                            <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                         </motion.div>
                     ))}
                 </div>
             </div>
        </section>


        {/* --- 4. TRACTION & ROADMAP --- */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
             <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                 <div>
                     <h2 className="text-3xl font-serif font-bold mb-6">Growth Trajectory</h2>
                     <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                         Since our soft launch 6 months ago, organic growth has outpaced inventory. We are raising capital to stabilize supply chains and enter mass retail.
                     </p>
                     <button className="flex items-center gap-2 text-[var(--accent)] font-bold uppercase tracking-widest text-xs hover:underline">
                         View Financials <ArrowUpRight size={14}/>
                     </button>
                 </div>

                 <div className="space-y-6">
                     {product.roadmap.map((step, i) => (
                         <div key={i} className="flex items-center gap-6 group">
                             <div className="w-12 h-12 flex-shrink-0 rounded-full border border-[var(--border)] flex items-center justify-center font-serif font-italic text-[var(--text-muted)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)] transition-colors">
                                 {i + 1}
                             </div>
                             <div className="flex-1 pb-6 border-b border-[var(--border)] group-hover:border-[var(--accent)] transition-colors">
                                 <h4 className="font-bold text-[var(--text-main)] uppercase text-xs tracking-widest mb-1">{step.phase}</h4>
                                 <p className="font-serif text-lg text-[var(--text-main)]">{step.task}</p>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </section>


        {/* --- 5. VISUAL SOCIAL PROOF (Marquee) --- */}
        <div className="py-12 border-y border-[var(--border)] bg-[var(--bg-card)] overflow-hidden flex whitespace-nowrap">
             <div className="flex items-center gap-12 animate-marquee opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Dummy Retailer Logos / Press */}
                {['VOGUE', 'SEPHORA', 'Credo', 'Goop', 'ELLE', 'Whole Foods', 'VOGUE', 'SEPHORA'].map((brand, i) => (
                    <span key={i} className="text-4xl font-serif font-black text-[var(--text-main)] mx-8">{brand}</span>
                ))}
             </div>
        </div>


        {/* --- 6. CTA / FOOTER --- */}
        <footer className="py-24 text-center px-6">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="max-w-2xl mx-auto space-y-10"
            >
                <Star size={32} className="text-[var(--accent)] mx-auto" fill="currentColor" />
                
                <h2 className="font-serif text-5xl md:text-6xl text-[var(--text-main)]">Join the Movement.</h2>
                <p className="text-lg text-[var(--text-muted)]">We are looking for strategic partners to close our Seed Round.</p>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <button className="px-10 py-4 bg-[var(--accent)] text-white font-bold uppercase tracking-widest text-xs hover:bg-[var(--text-main)] transition-colors shadow-xl shadow-[var(--accent)]/20">
                        Download Pitch Deck
                    </button>
                    <button className="px-10 py-4 border border-[var(--text-main)] text-[var(--text-main)] font-bold uppercase tracking-widest text-xs hover:bg-[var(--text-main)] hover:text-white transition-colors">
                        Request Samples
                    </button>
                </div>
            </motion.div>

            <div className="mt-24 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                © {new Date().getFullYear()} {product.name} • Strictly Confidential
            </div>
        </footer>

      </div>
    </>
  );
};

export default NonTechProductsLandingPitch;