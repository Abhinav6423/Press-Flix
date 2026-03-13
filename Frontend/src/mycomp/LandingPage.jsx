import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
   ArrowRight, Check, X, Globe,
   BarChart3, Users, LineChart, Target,
   ShieldCheck, ChevronRight, Activity, ClipboardList
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- ANIMATION VARIANTS ---
const fadeInUp = {
   hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
   visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
   visible: { transition: { staggerChildren: 0.1 } }
};

// --- COMPONENT: SPOTLIGHT CARD (Premium Hover Glow) ---
function SpotlightCard({ children, className = "" }) {
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);

   function handleMouseMove({ currentTarget, clientX, clientY }) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
   }

   return (
      <div
         className={`group relative border border-white/10 bg-[#0A0A0A] overflow-hidden ${className}`}
         onMouseMove={handleMouseMove}
      >
         <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
               background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
            }}
         />
         <div className="relative h-full">{children}</div>
      </div>
   );
}

// --- COMPONENT: VALIDATION DASHBOARD DEMO ---
const ValidationDemo = () => {
   const [step, setStep] = useState(0);

   useEffect(() => {
      const cycle = setInterval(() => {
         setStep((prev) => (prev + 1) % 3);
      }, 4000);
      return () => clearInterval(cycle);
   }, []);

   return (
      <div className="relative w-full max-w-[420px] mx-auto">
         {/* Subtle Ambient Glow */}
         <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-2xl blur-2xl opacity-50" />

         <div className="relative aspect-[4/5] bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Mock Browser Header */}
            <div className="h-10 border-b border-white/5 bg-[#0A0A0A] flex items-center px-4 gap-2">
               <div className="flex gap-1.5 opacity-40">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
               </div>
               <div className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-gray-500 bg-black/50 px-3 py-1 rounded-md border border-white/5">
                  <Globe size={10} /> pressflix.app/v/project-x
               </div>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1 p-6 flex flex-col relative bg-[#050505]">
               <AnimatePresence mode="wait">
                  {/* STEP 1: Idea Pitch Formulation */}
                  {step === 0 && (
                     <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, filter: "blur(4px)" }}
                        className="space-y-4 h-full flex flex-col justify-center"
                     >
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
                           <ClipboardList size={14} /> Step 1: Draft Idea
                        </div>
                        <div className="space-y-3">
                           <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">The Problem</div>
                              <div className="text-sm text-gray-300">Founders waste months building products nobody wants to buy.</div>
                           </div>
                           <div className="p-3 border border-emerald-500/20 rounded-lg bg-emerald-500/5">
                              <div className="text-[10px] text-emerald-500 uppercase tracking-wider mb-1">The Solution</div>
                              <div className="text-sm text-gray-200">A platform to generate validation pages and measure real demand instantly.</div>
                           </div>
                           <div className="h-8 w-full bg-white/10 animate-pulse rounded-md mt-4 flex items-center justify-center text-xs text-gray-400">
                              Generating Public Pitch...
                           </div>
                        </div>
                     </motion.div>
                  )}

                  {/* STEP 2: Live Public Validation Page */}
                  {step === 1 && (
                     <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: "blur(4px)" }}
                        className="space-y-5 h-full flex flex-col justify-center"
                     >
                        <div className="text-center space-y-2">
                           <h3 className="text-xl font-bold text-white">PressFlix MVP</h3>
                           <p className="text-xs text-gray-400">Validate before you build.</p>
                        </div>
                        <div className="p-4 border border-white/10 rounded-xl bg-white/[0.02] space-y-4">
                           <div className="space-y-2">
                              <label className="text-xs font-medium text-gray-300">Join the Waitlist</label>
                              <div className="h-9 w-full bg-black border border-white/10 rounded flex items-center px-3 text-xs text-gray-500">
                                 founder@startup.com
                              </div>
                           </div>
                           <div className="pt-2 border-t border-white/5 space-y-3">
                              <label className="text-xs font-medium text-gray-300">Would you pay for this?</label>
                              <div className="flex gap-2">
                                 <div className="flex-1 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-center text-xs font-medium">Yes</div>
                                 <div className="flex-1 py-1.5 bg-white/5 text-gray-400 border border-white/10 rounded text-center text-xs">No</div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  )}

                  {/* STEP 3: Analytics & Validation Score */}
                  {step === 2 && (
                     <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, filter: "blur(4px)" }}
                        className="h-full flex flex-col justify-center"
                     >
                        <div className="flex items-center justify-between mb-6">
                           <div className="text-sm font-bold text-white">Validation Signal</div>
                           <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold uppercase tracking-widest">Strong Demand</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                           <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                              <div className="text-[10px] text-gray-500 uppercase mb-1">Conversion</div>
                              <div className="text-2xl font-mono text-white">24.8%</div>
                           </div>
                           <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                              <div className="text-[10px] text-gray-500 uppercase mb-1">Waitlist</div>
                              <div className="text-2xl font-mono text-white">142</div>
                           </div>
                        </div>

                        <div className="p-4 border border-blue-500/20 rounded-lg bg-blue-500/5">
                           <div className="flex justify-between items-end mb-2">
                              <div className="text-xs text-blue-400 font-medium">Validation Score</div>
                              <div className="text-xl font-mono text-blue-300">88/100</div>
                           </div>
                           <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 0.88 }} transition={{ duration: 1, ease: "easeOut" }} className="h-1.5 bg-blue-500 rounded-full origin-left" />
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </div>
   );
};

// --- MAIN PAGE COMPONENT ---
const LandingPage = () => {
   const { scrollY } = useScroll();
   const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
   const headerY = useTransform(scrollY, [0, 100], [-20, 0]);

   return (
      <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden">

         {/* Professional Background Ambience */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-emerald-900/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[150px] rounded-full" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
         </div>

         {/* --- STICKY NAV --- */}
         <motion.nav
            style={{ opacity: headerOpacity, y: headerY }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
         >
            <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-[#0A0A0A]/80 border border-white/10 backdrop-blur-xl shadow-2xl">
               <div className="font-bold tracking-tight flex items-center gap-2 text-sm text-white">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" /> PressFlix
               </div>
               <div className="h-4 w-[1px] bg-white/10" />
               <button className="text-xs font-semibold text-gray-300 hover:text-white transition-colors">Features</button>
               <button className="text-xs font-semibold text-gray-300 hover:text-white transition-colors">Analytics</button>
               <Link to={'/login'}>
                  <button className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
                     Sign In
                  </button>
               </Link>
            </div>
         </motion.nav>

         {/* --- HERO SECTION --- */}
         <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 z-10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

               {/* Hero Copy */}
               <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10">
                  <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold uppercase tracking-widest mb-8">
                     <Target size={12} /> Built for indie hackers & early-stage founders
                  </motion.div>

                  <motion.h1
                     variants={fadeInUp}
                     className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-6"
                  >
                     Know if your startup idea <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                        will work — before you build it.
                     </span>
                  </motion.h1>

                  <motion.p
                     variants={fadeInUp}
                     className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mb-8 font-light"
                  >
                     PressFlix helps founders validate ideas with real users.
                     Launch a validation page, collect waitlists, measure demand,
                     and see if people actually want your product.
                  </motion.p>

                  <motion.div
                     variants={fadeInUp}
                     className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-sm text-gray-300"
                  >
                     <div className="flex items-center gap-2">
                        <Check className="text-emerald-400" size={16} />
                        Launch idea pages instantly
                     </div>
                     <div className="flex items-center gap-2">
                        <Check className="text-emerald-400" size={16} />
                        Collect user demand signals
                     </div>
                     <div className="flex items-center gap-2 sm:col-span-2">
                        <Check className="text-emerald-400" size={16} />
                        Build only what people actually want
                     </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                     <Link to="/login">
                        <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-[1.02]">
                           <span className="relative flex items-center gap-2">
                              Validate Your Idea <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                           </span>
                        </button>
                     </Link>
                     <button className="px-8 py-4 bg-[#111] border border-white/10 text-white font-medium rounded-lg hover:bg-[#1A1A1A] transition-colors">
                        View Live Demo
                     </button>
                  </motion.div>
               </motion.div>

               {/* Hero Visual */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative z-10 perspective-1000"
               >
                  <ValidationDemo />
               </motion.div>
            </div>
         </section>

         {/* --- HOW IT WORKS SECTION --- */}
         <section className="py-24 relative z-10 bg-[#050505] border-y border-white/5">
            <div className="max-w-6xl mx-auto px-6">
               <h2 className="text-3xl md:text-5xl font-bold text-center tracking-tighter mb-16">
                  How PressFlix Works
               </h2>

               <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
                  <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="w-12 h-12 mx-auto bg-emerald-500/10 text-emerald-400 text-xl font-bold flex items-center justify-center rounded-full mb-6 border border-emerald-500/20">1</div>
                     <h3 className="font-semibold text-xl text-white mb-3">Create your idea page</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Describe the problem, solution, and audience. PressFlix generates a highly-converting validation page instantly.
                     </p>
                  </div>

                  <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="w-12 h-12 mx-auto bg-blue-500/10 text-blue-400 text-xl font-bold flex items-center justify-center rounded-full mb-6 border border-blue-500/20">2</div>
                     <h3 className="font-semibold text-xl text-white mb-3">Share with real users</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Post your page on communities like Twitter, Reddit, and Indie Hackers to see if people click and care.
                     </p>
                  </div>

                  <div className="p-8 border border-white/5 bg-[#0A0A0A] rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="w-12 h-12 mx-auto bg-purple-500/10 text-purple-400 text-xl font-bold flex items-center justify-center rounded-full mb-6 border border-purple-500/20">3</div>
                     <h3 className="font-semibold text-xl text-white mb-3">Measure demand</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Track waitlists, conversions, and your overall validation score before writing any production code.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* --- FEATURES BENTO GRID --- */}
         <section className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
               <div className="mb-16 text-center">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                     Everything you need to validate an idea
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                     PressFlix replaces guessing with data. Turn your startup idea into a structured validation experiment.
                  </p>
               </div>

               <div className="grid md:grid-cols-3 gap-4">
                  {/* Large Card: Deep Analytics */}
                  <SpotlightCard className="md:col-span-2 md:row-span-2 rounded-2xl p-8 lg:p-10 flex flex-col justify-between">
                     <div>
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                           <BarChart3 size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Multi-Idea Dashboard & Analytics</h3>
                        <p className="text-gray-400 leading-relaxed max-w-md text-sm">
                           Don't guess which idea is best. Track total visitors, unique views, waitlist conversions, and compare multiple pitches side-by-side to find your winner.
                        </p>
                     </div>
                     <div className="mt-10 flex gap-4 opacity-70">
                        <div className="h-32 w-1/3 bg-[#111] rounded-xl border border-white/5 flex flex-col p-4 justify-end gap-2">
                           <div className="h-2 w-1/2 bg-white/10 rounded" />
                           <div className="text-2xl font-mono text-white">14.2%</div>
                        </div>
                        <div className="h-32 w-2/3 bg-[#111] rounded-xl border border-white/5 p-4 flex items-end gap-2">
                           {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                              <div key={i} className="flex-1 bg-blue-500/50 rounded-t-sm" style={{ height: `${h}%` }} />
                           ))}
                        </div>
                     </div>
                  </SpotlightCard>

                  {/* Tall Card: Instant Pitch Pages */}
                  <SpotlightCard className="md:row-span-2 rounded-2xl p-8 lg:p-10">
                     <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                        <ShieldCheck size={24} />
                     </div>
                     <h3 className="text-xl font-bold mb-3 text-white">Instant Pitch Pages</h3>
                     <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Input your problem, solution, and audience. We generate a high-converting, minimal validation page instantly.
                     </p>
                     <div className="relative mx-auto w-full bg-[#111] border border-white/5 rounded-xl overflow-hidden p-4 space-y-4">
                        <div className="h-3 w-1/3 bg-white/20 rounded" />
                        <div className="h-2 w-full bg-white/10 rounded" />
                        <div className="h-2 w-4/5 bg-white/10 rounded" />
                        <div className="h-10 w-full bg-emerald-500/20 rounded border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-4">
                           Join Waitlist
                        </div>
                     </div>
                  </SpotlightCard>

                  {/* Small Card 1: Demand Polls */}
                  <SpotlightCard className="rounded-2xl p-6 lg:p-8">
                     <Users size={24} className="text-purple-400 mb-4" />
                     <h3 className="text-lg font-bold text-white">Demand Polling</h3>
                     <p className="text-sm text-gray-400 mt-2 leading-relaxed">Go beyond simple signups. Ask visitors "Would you use this?" and "Would you pay?" to gauge real intent.</p>
                  </SpotlightCard>

                  {/* Small Card 2: Validation Score */}
                  <SpotlightCard className="rounded-2xl p-6 lg:p-8">
                     <Activity size={24} className="text-yellow-400 mb-4" />
                     <h3 className="text-lg font-bold text-white">Validation Score</h3>
                     <p className="text-sm text-gray-400 mt-2 leading-relaxed">Our engine calculates a definitive score based on conversion rates, poll strength, and waitlist growth.</p>
                  </SpotlightCard>
               </div>
            </div>
         </section>

         {/* --- COMPARISON SECTION --- */}
         <section className="py-24 border-y border-white/5 bg-[#050505] z-10 relative">
            <div className="max-w-5xl mx-auto px-6">
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6 opacity-60 hover:opacity-100 transition-opacity p-6 rounded-2xl border border-transparent hover:border-red-500/20 hover:bg-red-500/5">
                     <h3 className="text-xl font-bold text-red-400 flex items-center gap-2"><X size={20} /> The Old Way</h3>
                     <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex gap-3 items-start"><span className="mt-0.5">❌</span> Spend 3 months building a product in stealth.</li>
                        <li className="flex gap-3 items-start"><span className="mt-0.5">❌</span> Rely on polite feedback from friends and family.</li>
                        <li className="flex gap-3 items-start"><span className="mt-0.5">❌</span> Guess which features people actually want.</li>
                        <li className="flex gap-3 items-start"><span className="mt-0.5">❌</span> Launch on ProductHunt to crickets.</li>
                     </ul>
                  </div>
                  <div className="space-y-6 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                     <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2"><Check size={20} /> The PressFlix Way</h3>
                     <ul className="space-y-4 text-gray-200 text-sm">
                        <li className="flex gap-3 items-start"><span className="text-emerald-500 mt-0.5">✔</span> Draft a structured pitch in 5 minutes.</li>
                        <li className="flex gap-3 items-start"><span className="text-emerald-500 mt-0.5">✔</span> Share your validation page to communities.</li>
                        <li className="flex gap-3 items-start"><span className="text-emerald-500 mt-0.5">✔</span> Collect emails and hard data on willingness-to-pay.</li>
                        <li className="flex gap-3 items-start"><span className="text-emerald-500 mt-0.5">✔</span> Start writing code with guaranteed, waiting users.</li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>

         {/* --- FINAL CTA --- */}
         <section className="py-32 px-6 text-center relative z-10">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="relative z-10 max-w-3xl mx-auto"
            >
               <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
                  Don’t build the wrong product.<br />
                  Validate your idea first.
               </h2>
               <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto font-light">
                  Join the platform built for founders who value data over assumptions. Export your waitlist anytime. Always own your data.
               </p>
               <div className="flex flex-col items-center gap-4">
                  <Link to="/login">
                     <button className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-2">
                        Create Your First Pitch <ChevronRight size={18} />
                     </button>
                  </Link>
                  <p className="text-sm text-gray-500 mt-2">
                     No credit card • Launch your first validation page in under 2 minutes
                  </p>
               </div>
            </motion.div>
         </section>

         {/* --- FOOTER --- */}
         <footer className="border-t border-white/5 py-10 bg-[#020202] z-10 relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-2 font-bold tracking-tight text-white text-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-sm" /> PressFlix
               </div>
               <div className="flex gap-8 text-sm text-gray-500">
                  <a href="#" className="hover:text-white transition-colors">Philosophy</a>
                  <a href="#" className="hover:text-white transition-colors">Demo</a>
                  <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
               </div>
               <div className="text-xs text-gray-600 font-mono">
                  © {new Date().getFullYear()} PressFlix
               </div>
            </div>
         </footer>

      </div>
   );
};

export default LandingPage;