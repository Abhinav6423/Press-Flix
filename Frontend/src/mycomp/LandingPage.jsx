import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
   ArrowRight, Check, Zap, X, FileText, Globe,
   Box, Loader2, Sparkles, Layout, Smartphone,
   MousePointer2, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
// --- ANIMATION VARIANTS ---
const fadeInUp = {
   hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
   visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
   visible: { transition: { staggerChildren: 0.1 } }
};

// --- COMPONENT: SPOTLIGHT CARD (Hover Glow Effect) ---
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
         className={`group relative border border-white/10 bg-white/[0.02] overflow-hidden ${className}`}
         onMouseMove={handleMouseMove}
      >
         <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
               background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
            }}
         />
         <div className="relative h-full">{children}</div>
      </div>
   );
}

// --- COMPONENT: THE "MAGIC" GENERATOR DEMO ---
const AutoGeneratorDemo = () => {
   const [step, setStep] = useState(0);

   useEffect(() => {
      const cycle = setInterval(() => {
         setStep((prev) => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(cycle);
   }, []);

   return (
      <div className="relative w-full max-w-[400px] mx-auto">
         {/* Decorative Glow Behind */}
         <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-2xl opacity-30 animate-pulse" />

         <div className="relative aspect-[4/5] bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Mock Browser Header */}
            <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-2">
               <div className="flex gap-1.5 opacity-50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
               </div>
               <div className="ml-auto flex items-center gap-1.5 text-[9px] font-mono text-gray-500 bg-black/50 px-2 py-1 rounded border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> press-flix.app/new
               </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-center relative">
               <AnimatePresence mode="wait">
                  {step === 0 && (
                     <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: "blur(4px)" }}
                        className="space-y-4"
                     >
                        <div className="text-center space-y-2 mb-6">
                           <div className="inline-block p-2 bg-blue-500/10 rounded-lg text-blue-400 mb-2"><Box size={20} /></div>
                           <h3 className="text-white font-medium">Select Goal</h3>
                        </div>
                        {["Digital Product", "Service / Agency", "Newsletter"].map((opt, i) => (
                           <motion.div
                              key={opt}
                              initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                              className={`p-3 rounded-lg border text-sm flex items-center justify-between cursor-pointer ${i === 0 ? 'bg-blue-600 text-white border-blue-500' : 'border-white/10 text-gray-400 bg-white/5'}`}
                           >
                              {opt} {i === 0 && <Check size={14} />}
                           </motion.div>
                        ))}
                     </motion.div>
                  )}

                  {step === 1 && (
                     <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                     >
                        <h3 className="text-white font-medium text-center mb-4">Content</h3>
                        <div className="space-y-3">
                           <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500">Headline</label>
                              <div className="h-9 bg-white/5 border border-white/10 rounded px-3 flex items-center text-sm text-blue-200">
                                 <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                                    The Ultimate SaaS Kit
                                 </motion.span>
                                 <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 h-4 bg-blue-400 ml-1" />
                              </div>
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500">Price</label>
                              <div className="h-9 bg-white/5 border border-white/10 rounded px-3 flex items-center text-sm text-white">
                                 $49.00
                              </div>
                           </div>
                           <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="h-1 bg-blue-600 mt-4 rounded-full origin-left" />
                           <div className="flex justify-between text-[10px] text-gray-500">
                              <span>Generating Layout...</span>
                              <span>80%</span>
                           </div>
                        </div>
                     </motion.div>
                  )}

                  {step === 2 && (
                     <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="text-center h-full flex flex-col items-center justify-center"
                     >
                        <motion.div
                           initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                           className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                        >
                           <Check size={40} className="text-black" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white mb-2">It's Live.</h2>
                        <p className="text-gray-400 text-sm mb-6">Your pitch page is hosted and ready.</p>
                        <div className="w-full p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2 text-xs text-blue-300 font-mono">
                           <Globe size={12} /> press-flix.app/p/saas-kit
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
      <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">

         {/* Background Ambience */}
         <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-900/10 blur-[120px] rounded-full" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
         </div>

         {/* --- STICKY NAV --- */}
         <motion.nav
            style={{ opacity: headerOpacity, y: headerY }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
         >
            <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
               <div className="font-bold tracking-tight flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" /> Press-Flix
               </div>
               <div className="h-4 w-[1px] bg-white/10" />
               <button className="text-xs font-semibold hover:text-blue-400 transition-colors">Features</button>
               <button className="text-xs font-semibold hover:text-blue-400 transition-colors">Pricing</button>
               <Link to={'/login'}>
                  <button className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors">
                     Get Started
                  </button>
               </Link>
            </div>
         </motion.nav>

         {/* --- HERO SECTION --- */}
         <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

               {/* Hero Copy */}
               <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10">
                  <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-8">
                     <Sparkles size={12} /> The Anti-Builder
                  </motion.div>

                  <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-8">
                     Don't design. <br />
                     Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">pitch.</span>
                  </motion.h1>

                  <motion.p variants={fadeInUp} className="text-xl text-gray-400 leading-relaxed max-w-lg mb-10 font-light">
                     Stop fighting with drag-and-drop tools. Enter your details and generate a high-converting pitch page in seconds.
                  </motion.p>

                  <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                     <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-[1.02]">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative flex items-center gap-2">
                           Create Page Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                     </button>
                     <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                        View Examples
                     </button>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-4 text-xs text-gray-500 font-mono">
                     <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-800 border border-black" />)}
                     </div>
                     <p>Joined by 1,200+ creators this week</p>
                  </motion.div>
               </motion.div>

               {/* Hero Visual */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative z-10"
               >
                  <AutoGeneratorDemo />
               </motion.div>
            </div>
         </section>

         {/* --- FEATURES BENTO GRID --- */}
         <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
               <div className="mb-20">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Why builders fail you.</h2>
                  <p className="text-gray-400 text-lg max-w-xl">You spend 4 hours designing a button and 0 hours writing your offer. Press-Flix flips the script.</p>
               </div>

               <div className="grid md:grid-cols-3 gap-6">
                  {/* Large Card */}
                  <SpotlightCard className="md:col-span-2 md:row-span-2 rounded-3xl bg-neutral-900/50 p-10 flex flex-col justify-between">
                     <div>
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                           <Layout size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Zero Layout Decisions</h3>
                        <p className="text-gray-400 leading-relaxed max-w-md">
                           Our engine analyzes your content and automatically selects the highest-converting layout. No padding adjustments, no color picking.
                        </p>
                     </div>
                     <div className="mt-10 flex gap-4 opacity-50">
                        <div className="h-24 w-1/3 bg-white/5 rounded-lg border border-white/5" />
                        <div className="h-24 w-2/3 bg-white/5 rounded-lg border border-white/5" />
                     </div>
                  </SpotlightCard>

                  {/* Tall Card */}
                  <SpotlightCard className="md:row-span-2 rounded-3xl bg-neutral-900/50 p-10">
                     <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 mb-6">
                        <Smartphone size={24} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4">Mobile Perfection</h3>
                     <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Every page is optimized for vertical scrolling, thumb-reach, and instant loading on 4G networks.
                     </p>
                     <div className="relative mx-auto w-[80%] aspect-[9/16] bg-black border-4 border-gray-800 rounded-2xl overflow-hidden">
                        <div className="p-2 space-y-2">
                           <div className="h-2 w-full bg-gray-800 rounded" />
                           <div className="h-2 w-2/3 bg-gray-800 rounded" />
                           <div className="h-10 w-full bg-blue-900/20 rounded mt-4" />
                        </div>
                     </div>
                  </SpotlightCard>

                  {/* Small Card 1 */}
                  <SpotlightCard className="rounded-3xl bg-neutral-900/50 p-8">
                     <Zap size={24} className="text-yellow-400 mb-4" />
                     <h3 className="text-lg font-bold">SEO Included</h3>
                     <p className="text-sm text-gray-500 mt-2">Meta tags auto-generated from your pitch.</p>
                  </SpotlightCard>

                  {/* Small Card 2 */}
                  <SpotlightCard className="rounded-3xl bg-neutral-900/50 p-8">
                     <MousePointer2 size={24} className="text-green-400 mb-4" />
                     <h3 className="text-lg font-bold">One-Click Buy</h3>
                     <p className="text-sm text-gray-500 mt-2">Integrates seamlessly with Stripe & Gumroad.</p>
                  </SpotlightCard>
               </div>
            </div>
         </section>

         {/* --- COMPARISON SECTION --- */}
         <section className="py-24 border-y border-white/5 bg-white/[0.01]">
            <div className="max-w-5xl mx-auto px-6">
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6 opacity-50 hover:opacity-100 transition-opacity">
                     <h3 className="text-xl font-bold text-red-400 flex items-center gap-2"><X size={20} /> The Old Way</h3>
                     <ul className="space-y-4 text-gray-400">
                        <li className="flex gap-3"><span>❌</span> Spending $20/mo on a builder</li>
                        <li className="flex gap-3"><span>❌</span> 3 hours adjusting margins</li>
                        <li className="flex gap-3"><span>❌</span> "Mobile version looks broken"</li>
                        <li className="flex gap-3"><span>❌</span> Never actually launching</li>
                     </ul>
                  </div>
                  <div className="space-y-6">
                     <h3 className="text-xl font-bold text-green-400 flex items-center gap-2"><Check size={20} /> The Press-Flix Way</h3>
                     <ul className="space-y-4 text-white font-medium">
                        <li className="flex gap-3"><span className="text-green-500">✔</span> Free to start</li>
                        <li className="flex gap-3"><span className="text-green-500">✔</span> 60 seconds to live URL</li>
                        <li className="flex gap-3"><span className="text-green-500">✔</span> Perfect code, every time</li>
                        <li className="flex gap-3"><span className="text-green-500">✔</span> Focus on the money, not the pixels</li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>

         {/* --- FINAL CTA --- */}
         <section className="py-40 px-6 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -z-10" />

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="relative z-10 max-w-3xl mx-auto"
            >
               <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                  Ready to ship?
               </h2>
               <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
                  Join the new wave of creators who stopped designing and started selling.
               </p>
               <div className="flex flex-col items-center gap-6">
                  <button className="px-12 py-5 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                     Launch Your Pitch Now
                  </button>
                  <p className="text-xs text-gray-600 uppercase tracking-widest">No Credit Card • Cancel Anytime</p>
               </div>
            </motion.div>
         </section>

         {/* --- FOOTER --- */}
         <footer className="border-t border-white/5 py-12 bg-black">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-2 font-bold tracking-tight">
                  <div className="w-4 h-4 bg-blue-600 rounded-sm" /> Press-Flix
               </div>
               <div className="flex gap-8 text-sm text-gray-500">
                  <a href="#" className="hover:text-white transition-colors">Templates</a>
                  <a href="#" className="hover:text-white transition-colors">Pricing</a>
                  <a href="#" className="hover:text-white transition-colors">Login</a>
               </div>
               <div className="text-xs text-gray-600">
                  © 2026 Press-Flix Inc.
               </div>
            </div>
         </footer>

      </div>
   );
};

export default LandingPage;