import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Moon, Sun, Monitor, Layers, 
  Database, Zap, Check, ArrowUpRight, Code2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA (Preserving your original content structure) ---
const content = {
  hero: {
    headline: "Build High-Converting Websites.",
    subhead: "We design and develop fast, scalable, and conversion-focused digital experiences for startups and creators.",
    cta: "Start a Project"
  },
  problem: {
    title: "The Reality",
    desc: "Most websites are slow, outdated, and fail to convert visitors into customers. Businesses lose trust and revenue every second."
  },
  solution: {
    title: "Our Approach",
    desc: "We build modern, fast, and conversion-optimized websites using scalable architecture and clean UI/UX principles."
  },
  services: [
    {
      title: "Website Development",
      desc: "Custom fast and scalable websites built with modern tech.",
      icon: Monitor,
      tags: ["React", "Next.js", "Tailwind"]
    },
    {
      title: "Landing Page Optimization",
      desc: "High-converting landing pages for products & startups.",
      icon: Layers,
      tags: ["CRO", "Design", "Copy"]
    },
    {
      title: "Full-Stack Applications",
      desc: "End-to-end web apps with backend, database, and deployment.",
      icon: Database,
      tags: ["Node", "Postgres", "AWS"]
    }
  ],
  process: [
    { step: "01", title: "Discovery", desc: "We map out your goals and user needs." },
    { step: "02", title: "Design", desc: "High-fidelity prototypes and systems." },
    { step: "03", title: "Development", desc: "Clean, scalable code implementation." },
    { step: "04", title: "Launch", desc: "Deployment, testing, and hand-off." }
  ],
  results: {
    stat: "3x",
    desc: "Average increase in conversion rates for our startup clients."
  }
};

// --- ANIMATION UTILS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function ServicePitch() {
  const [isDark, setIsDark] = useState(false);

  // Smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-stone-950 text-stone-100' : 'bg-[#FDFCF8] text-stone-900'}`}>
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-stone-200/50 dark:border-stone-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white">
              <Code2 size={18} />
            </div>
            <span>Studio.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hidden sm:block px-6 py-2.5 text-sm font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 rounded-full hover:opacity-90 transition-opacity">
              Book Call
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        
        {/* --- HERO SECTION --- */}
        <section className="relative py-32 px-6 overflow-hidden">
          {/* Abstract Background Element */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium uppercase tracking-wide text-stone-500">Accepting new projects for Q2</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-serif tracking-tight leading-[0.95] text-stone-900 dark:text-stone-50">
                {content.hero.headline}
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed font-light">
                {content.hero.subhead}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <button className="px-8 py-4 text-lg font-medium bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all hover:scale-105 flex items-center justify-center gap-2 group">
                  {content.hero.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 text-lg font-medium border border-stone-200 dark:border-stone-800 rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors">
                  View Our Work
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- PROBLEM / SOLUTION (Split View) --- */}
        <section className="py-24 px-6 bg-stone-100 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-2">The Problem</h3>
              <h2 className="text-4xl font-serif text-stone-900 dark:text-stone-100">{content.problem.title}</h2>
              <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                {content.problem.desc}
              </p>
              <div className="p-6 bg-white dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm mt-8 opacity-75 grayscale hover:grayscale-0 transition-all">
                {/* Visual Representation of 'Bad' */}
                <div className="flex items-center gap-4 text-stone-400">
                  <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-2 w-3/4 bg-stone-200 dark:bg-stone-800 rounded" />
                    <div className="h-2 w-1/2 bg-stone-200 dark:bg-stone-800 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-green-500 mb-2">Our Solution</h3>
              <h2 className="text-4xl font-serif text-stone-900 dark:text-stone-100">{content.solution.title}</h2>
              <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                {content.solution.desc}
              </p>
              <div className="p-6 bg-white dark:bg-stone-950 rounded-xl border border-green-500/30 shadow-lg mt-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                      <Zap size={20} />
                    </div>
                    <span className="font-semibold">Performance Score</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">99/100</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* --- SERVICES (Cards) --- */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Expertise.</h2>
            <div className="h-1 w-20 bg-orange-500" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors duration-300 rounded-2xl"
              >
                <div className="mb-8 p-3 w-fit rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <service.icon size={28} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-stone-500 dark:text-stone-400 mb-8 leading-relaxed min-h-[3rem]">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-mono px-2 py-1 rounded border border-stone-200 dark:border-stone-700 text-stone-500">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="text-orange-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- PROCESS (Timeline) --- */}
        <section className="py-32 px-6 bg-stone-900 dark:bg-stone-950 text-stone-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              <div className="sticky top-32">
                <h2 className="text-5xl font-serif mb-6">How we work.</h2>
                <p className="text-xl text-stone-400 max-w-md leading-relaxed mb-12">
                  A transparent, iterative process designed to reduce risk and maximize speed to market.
                </p>
                <button className="hidden lg:flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium transition-colors">
                  Read full documentation <ArrowRight size={18} />
                </button>
              </div>

              <div className="space-y-12">
                {content.process.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 pt-1">
                      <span className="font-mono text-sm text-orange-500 border border-orange-500/30 px-2 py-1 rounded">
                        {step.step}
                      </span>
                    </div>
                    <div className="pb-12 border-b border-stone-800 group-last:border-0 w-full">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-stone-400 text-lg leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* --- RESULTS --- */}
        <section className="py-32 px-6 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-orange-600 text-white rounded-[2.5rem] p-12 md:p-24 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                "We help startups increase conversion by {content.results.stat} and launch faster."
              </h2>
              <p className="text-orange-100 text-lg mb-12">
                Stop wasting time on bad code. Let's build something scalable.
              </p>
              <button className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-100 transition-colors shadow-xl">
                Start Your Project
              </button>
            </div>
            
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          </motion.div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-12 px-6 border-t border-stone-200 dark:border-stone-800 text-stone-500 text-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2024 Studio Agency. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Twitter</a>
              <a href="#" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Instagram</a>
              <a href="#" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}