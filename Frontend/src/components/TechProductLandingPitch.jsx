import React, { useState } from 'react';
import {
    ArrowRight, CheckCircle, XCircle, Terminal,
    Activity, Shield, ChevronRight, BarChart3,
    Play, Download, Menu, Moon, Sun
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- MOCK DATA (Mapped from your Image) ---
const pitch = {
    identity: {
        productName: "Sentinal AI",
        tagline: "Automated Compliance for Fintech.",
        description: "Sentinal replaces manual audit teams with a continuous monitoring engine. We help fintechs achieve SOC2 and ISO 27001 compliance in weeks, not months.",
        stage: "Seed Stage",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    problem: {
        title: "The Compliance Bottleneck",
        description: "Fintech startups currently spend 30% of engineering time on compliance trails. Manual audits are slow, error-prone, and block product velocity.",
    },
    features: [
        { title: "Continuous Monitoring", desc: "Real-time scanning of AWS/GCP infrastructure for policy violations." },
        { title: "Auto-Remediation", desc: "Automatically fix simple security group misconfigurations." },
        { title: "Audit-Ready Logs", desc: "Immutable logs generated instantly for auditors." }
    ],
    specs: [
        { label: "Integration", value: "Terraform / K8s" },
        { label: "Coverage", value: "140+ Controls" },
        { label: "Setup Time", value: "< 15 Minutes" },
        { label: "Export", value: "PDF / JSON / CSV" }
    ],
    roadmap: [
        { time: "Q2 2026", task: "Automated Pen-Testing Module" },
        { time: "Q3 2026", task: "AI Policy Generator" },
        { time: "Q4 2026", task: "Enterprise SSO & RBAC" }
    ]
};

// --- COMPONENTS ---

const FadeIn = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
    >
        {children}
    </motion.div>
);

const Button = ({ children, primary, className = "" }) => (
    <button className={`
    px-6 py-3 rounded-md text-sm font-semibold transition-all duration-200 flex items-center gap-2
    ${primary
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
            : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"}
    ${className}
  `}>
        {children}
    </button>
);

export default function ProfessionalPitch() {
    const [isDark, setIsDark] = useState(false);

    return (
        <div className={`min-h-screen font-sans ${isDark ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`}>

            {/* --- HEADER --- */}
            <header className="sticky top-0 z-50 border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
                        <Shield className="w-5 h-5 text-blue-600" />
                        {pitch.identity.productName}
                    </div>

                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-500">
                            <a href="#problem" className="hover:text-blue-600 transition-colors">Problem</a>
                            <a href="#solution" className="hover:text-blue-600 transition-colors">Solution</a>
                            <a href="#specs" className="hover:text-blue-600 transition-colors">Specs</a>
                        </nav>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsDark(!isDark)} className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                            <Button primary className="h-9 px-4 text-xs">Book Demo</Button>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {/* --- HERO SECTION --- */}
                <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
                    <FadeIn>
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wide text-blue-700 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800">
                                    {pitch.identity.stage}
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-zinc-900 dark:text-white">
                                    {pitch.identity.tagline}
                                </h1>
                                <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-lg">
                                    {pitch.identity.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button primary>
                                        Start Free Trial <ArrowRight className="w-4 h-4" />
                                    </Button>
                                    <Button>
                                        <Play className="w-4 h-4" /> Watch 2 min demo
                                    </Button>
                                </div>

                                {/* Social Proof (Static Mock) */}
                                <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Trusted by engineering teams at</p>
                                    <div className="flex gap-6 opacity-40 grayscale">
                                        {/* Placeholders for logos */}
                                        <div className="h-6 w-20 bg-zinc-800 rounded"></div>
                                        <div className="h-6 w-20 bg-zinc-800 rounded"></div>
                                        <div className="h-6 w-20 bg-zinc-800 rounded"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Image / Dashboard View */}
                            <div className="relative rounded-lg bg-zinc-100 dark:bg-zinc-900 p-2 ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-2xl">
                                <img
                                    src={pitch.identity.image}
                                    alt="App Dashboard"
                                    className="rounded border border-zinc-200 dark:border-zinc-800 w-full h-auto"
                                />
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* --- PROBLEM & METRICS --- */}
                <section id="problem" className="bg-zinc-50 dark:bg-zinc-900 py-24 border-y border-zinc-200 dark:border-zinc-800">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-16">
                            <FadeIn>
                                <h3 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2">The Problem</h3>
                                <h2 className="text-3xl font-bold mb-6">{pitch.problem.title}</h2>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                                    {pitch.problem.description}
                                </p>

                                <ul className="space-y-4">
                                    {[
                                        "Audits delay roadmap by 3+ months",
                                        "Engineering resources drained by manual checks",
                                        "Risk of fines for non-compliance"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </FadeIn>

                            {/* Quantitative Data visualization */}
                            <FadeIn delay={0.2}>
                                <div className="bg-white dark:bg-zinc-950 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h4 className="font-semibold">Industry Impact</h4>
                                        <BarChart3 className="w-5 h-5 text-zinc-400" />
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span>Time Spent on Manual Audits</span>
                                                <span className="font-bold text-red-500">30%</span>
                                            </div>
                                            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                                                <div className="bg-red-500 h-full w-[30%]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span>Cost of Compliance Tools</span>
                                                <span className="font-bold text-zinc-500">$50k+</span>
                                            </div>
                                            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                                                <div className="bg-zinc-400 h-full w-[60%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* --- SOLUTION GRID --- */}
                <section id="solution" className="py-24 max-w-6xl mx-auto px-6">
                    <FadeIn>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to ship secure</h2>
                            <p className="text-zinc-500 text-lg">Platform-agnostic compliance that scales with your infrastructure.</p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {pitch.features.map((feat, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-colors bg-white dark:bg-zinc-950">
                                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                        <CheckCircle className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{feat.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </section>

                {/* --- TECHNICAL DEEP DIVE (Specs & Roadmap) --- */}
                <section id="specs" className="py-24 bg-zinc-900 text-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-20">

                            {/* Left: Specs */}
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <Terminal className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-bold">Technical Specifications</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {pitch.specs.map((spec, i) => (
                                        <div key={i} className="p-4 rounded border border-zinc-700 bg-zinc-800/50">
                                            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{spec.label}</div>
                                            <div className="font-mono text-sm font-semibold text-blue-300">{spec.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 w-full justify-center">
                                        <Download className="w-4 h-4" /> Download Architecture Diagram
                                    </Button>
                                </div>
                            </div>

                            {/* Right: Roadmap */}
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <Activity className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-bold">Product Roadmap</h2>
                                </div>
                                <div className="space-y-0 border-l border-zinc-700 ml-3">
                                    {pitch.roadmap.map((item, i) => (
                                        <div key={i} className="relative pl-8 pb-10 last:pb-0">
                                            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-zinc-900" />
                                            <span className="text-xs font-bold text-zinc-500 mb-1 block">{item.time}</span>
                                            <h4 className="text-lg font-medium">{item.task}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- FINAL CTA --- */}
                <section className="py-24 text-center px-6">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to automate your compliance?</h2>
                        <p className="text-zinc-500 mb-8 text-lg max-w-xl mx-auto">Join 500+ engineering teams shipping secure code faster than ever before.</p>
                        <div className="flex justify-center gap-4">
                            <Button primary className="h-12 px-8 text-base">Get Started Now</Button>
                            <Button className="h-12 px-8 text-base">Contact Sales</Button>
                        </div>
                        <p className="mt-6 text-xs text-zinc-400">No credit card required. Cancel anytime.</p>
                    </FadeIn>
                </section>

                {/* --- FOOTER --- */}
                <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-zinc-50 dark:bg-zinc-950 text-sm">
                    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-zinc-500">
                            © 2026 {pitch.identity.productName}. All rights reserved.
                        </div>
                        <div className="flex gap-8 font-medium text-zinc-600 dark:text-zinc-400">
                            <a href="#" className="hover:text-black dark:hover:text-white">Privacy</a>
                            <a href="#" className="hover:text-black dark:hover:text-white">Terms</a>
                            <a href="#" className="hover:text-black dark:hover:text-white">Security</a>
                            <a href="#" className="hover:text-black dark:hover:text-white">Twitter</a>
                        </div>
                    </div>
                </footer>

            </main>
        </div>
    );
}