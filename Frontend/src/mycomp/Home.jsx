import React from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import CreatePitchCategory from "./createPitchCategory";
import {
  Plus,
  ExternalLink,
  BarChart2,
  MousePointer,
  TrendingUp,
  Zap,
  Globe,
  LogOut,
  ArrowUpRight,
  Layers,
  MoreHorizontal,
  LayoutTemplate
} from "lucide-react";
import { useAuth } from "../context/Auth.context";

const Home = () => {
  const { userData : user , loading, logoutUser } = useAuth();

  // ⏳ Wait for auth resolution
  if (loading) return null;

  // 🔒 Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* ================= MOCK DATA & LOGIC ================= */
  const pages = [
    { id: 1, title: "SaaS Launch Alpha", url: "pressflix.com/alpha", views: 1250, ctaClicks: 320, created: "2 days ago", status: "Active" },
    { id: 2, title: "E-book Lead Magnet", url: "pressflix.com/ebook", views: 4500, ctaClicks: 210, created: "1 week ago", status: "Active" },
    { id: 3, title: "Consulting Booking", url: "pressflix.com/book-me", views: 800, ctaClicks: 45, created: "3 weeks ago", status: "Paused" },
    { id: 4, title: "Newsletter Waitlist", url: "pressflix.com/waitlist", views: 120, ctaClicks: 12, created: "Yesterday", status: "Draft" },
  ];

  const getRatio = (clicks, views) =>
    views > 0 ? ((clicks / views) * 100).toFixed(1) : 0;

  const topPerformer = [...pages].sort(
    (a, b) => b.ctaClicks / b.views - a.ctaClicks / a.views
  )[0];

  const totalViews = pages.reduce((acc, curr) => acc + curr.views, 0);
  const totalClicks = pages.reduce((acc, curr) => acc + curr.ctaClicks, 0);
  const totalPitches = pages.length;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden">

      {/* Subtle Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* NAVBAR */}
      <nav className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 transition-all">
              <Layers size={18} />
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">PressFlix</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 text-right">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-200">{user.name}</span>
                {user.email && <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">{user.email}</span>}
              </div>

            </div>

            <div className="h-6 w-px bg-white/10 hidden md:block" />

            <button
              onClick={logoutUser}
              className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Overview</h1>
            <p className="text-zinc-500">Welcome back, {user.name}. Here is your performance.</p>
          </motion.div>

          <Link to={'/category'}>
            <motion.button

              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-6 py-2.5 rounded-full font-medium shadow-xl shadow-white/5 transition-all"
            >
              <Plus size={18} />
              <span>Create Pitch</span>
            </motion.button>
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

          {/* Card 1: Top Performer (Hero Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative h-full bg-[#0c0c0e] border border-white/10 p-8 rounded-2xl flex flex-col justify-between overflow-hidden">

              {/* Decorative Icon Background */}
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Zap size={140} />
              </div>

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">Top Performing Pitch</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{topPerformer.title}</h3>
                  <a href={`https://${topPerformer.url}`} className="text-sm text-zinc-500 hover:text-indigo-400 flex items-center gap-1 transition-colors">
                    {topPerformer.url} <ExternalLink size={12} />
                  </a>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-emerald-400 mb-1">
                    <TrendingUp size={16} />
                    <span className="text-xs font-bold uppercase tracking-wide">Efficiency</span>
                  </div>
                  <div className="text-4xl font-bold text-white tracking-tighter">
                    {getRatio(topPerformer.ctaClicks, topPerformer.views)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5 relative z-10">
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-1">Total Views</p>
                  <p className="text-xl font-medium text-zinc-200 flex items-center gap-2">
                    <Globe size={16} className="text-zinc-600" />
                    {topPerformer.views.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-1">CTA Clicks</p>
                  <p className="text-xl font-medium text-zinc-200 flex items-center gap-2">
                    <MousePointer size={16} className="text-zinc-600" />
                    {topPerformer.ctaClicks.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Summary Stats (Updated with Pitch Count) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0c0c0e] border border-white/10 p-8 rounded-2xl flex flex-col justify-between gap-6"
          >
            {/* New Metric: Total Pitches */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 font-medium">Total Pitches</span>
                <LayoutTemplate size={18} className="text-violet-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{totalPitches}</div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 w-[80%] rounded-full"></div>
              </div>
            </div>

            {/* Metric: Views */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 font-medium">Total Page Views</span>
                <BarChart2 size={18} className="text-indigo-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{totalViews.toLocaleString()}</div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[65%] rounded-full"></div>
              </div>
            </div>

            {/* Metric: Actions */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 font-medium">Total Actions</span>
                <MousePointer size={18} className="text-emerald-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{totalClicks.toLocaleString()}</div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[40%] rounded-full"></div>
              </div>
            </div>

            <button className="mt-2 w-full py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-white border border-white/5 hover:border-white/20 rounded-lg transition-all">
              View Analytics Report
            </button>
          </motion.div>
        </div>

        {/* List Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Your Pitches</h2>
            <button className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
              See all <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Project Name</th>
                  <th className="px-6 py-4 font-semibold hidden md:table-cell text-right">Date Created</th>
                  <th className="px-6 py-4 font-semibold text-right">Views</th>
                  <th className="px-6 py-4 font-semibold hidden sm:table-cell text-right">Clicks</th>
                  <th className="px-6 py-4 font-semibold text-right">Ratio</th>
                  <th className="px-6 py-4 font-semibold text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pages.map((page) => (
                  <tr key={page.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-zinc-200">{page.title}</div>
                        <div className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${page.status === 'Active' ? 'bg-emerald-500' : page.status === 'Paused' ? 'bg-yellow-500' : 'bg-zinc-600'}`}></span>
                          {page.url}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-right text-sm text-zinc-500">
                      {page.created || "Recently"}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-zinc-300 font-mono">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell text-right text-sm text-zinc-300 font-mono">
                      {page.ctaClicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-block py-1 px-2 rounded font-mono text-xs font-medium ${parseFloat(getRatio(page.ctaClicks, page.views)) > 10
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-zinc-800 text-zinc-400'
                        }`}>
                        {getRatio(page.ctaClicks, page.views)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-zinc-600 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;