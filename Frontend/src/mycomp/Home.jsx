import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Layers, LogOut, Plus, ExternalLink, TrendingUp, Eye, MousePointerClick, LayoutDashboard, BarChart3
} from "lucide-react";

import { useAuth } from "../context/Auth.context";
import { getTopPerformingPitch } from "../api-calls/topPerformingPitch";
import { getAllUsersPitchCreated } from "../api-calls/allUsersPitchCreated";

const Home = () => {
  const { userData: user, loading, logoutUser } = useAuth();

  const [allPitches, setAllPitches] = useState([]);
  const [topPitch, setTopPitch] = useState(null);

  const fetchedRef = useRef(false); // prevents double fetch (StrictMode)

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    if (!user || loading || fetchedRef.current) return;

    fetchedRef.current = true;
    fetchTopPitch();
    fetchAllPitches();
  }, [user, loading]);

  const fetchTopPitch = async () => {
    const result = await getTopPerformingPitch();

    if (result?.success) {
      setTopPitch(result.data);
      console.log("Top Pitch:", result.data);
    } else {
      console.error("Top pitch fetch failed:", result?.message);
    }
  };

  const fetchAllPitches = async () => {
    const result = await getAllUsersPitchCreated();

    if (result?.success) {
      setAllPitches(result?.data?.data || []);
      console.log("All Pitches:", result.data.data);
    } else {
      console.error("All pitches fetch failed:", result?.message);
    }
  };

  /* ================= HELPERS ================= */

  const getRatio = (clicks = 0, views = 0) => {
    if (!views) return "0.0";
    return ((clicks / views) * 100).toFixed(1);
  };

  /* ================= AUTH CHECK ================= */

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 selection:bg-indigo-500/30">

      {/* Background Decorator (Subtle Glow) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Layers size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">PressFlix</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-zinc-200">{user?.name}</p>
              <p className="text-xs text-zinc-500">{user?.email}</p>
            </div>

            <div className="h-8 w-px bg-zinc-800 hidden md:block" />

            <button
              onClick={logoutUser}
              className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl text-white font-bold tracking-tight flex items-center gap-3">
              Overview
            </h1>
            <p className="text-zinc-500 mt-1">Welcome back, {user?.name}. Here's what's happening today.</p>
          </div>

          <Link to="/category">
            <button className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-zinc-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
              <Plus size={18} className="transition-transform group-hover:rotate-90" />
              Create Pitch
            </button>
          </Link>
        </div>

        {/* ================= TOP PITCH HERO CARD ================= */}

        <div className="relative overflow-hidden bg-zinc-900/40 border border-white/10 rounded-3xl p-8 mb-12 backdrop-blur-sm">
          {/* Card Glow Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <TrendingUp size={12} />
                Top Performing Pitch
              </div>

              <h2 className="text-3xl text-white font-bold mb-2">
                {topPitch?.title || "No top pitch yet"}
              </h2>

              {topPitch?.slug && (
                <a
                  href={`${window.location.origin}/p/${topPitch.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-indigo-400 transition-colors mt-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="truncate max-w-md">{window.location.origin}/p/{topPitch.slug}</span>
                  <ExternalLink size={14} />
                </a>
              )}

              <div className="grid grid-cols-2 gap-8 mt-8 max-w-md">
                <div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider mb-1">
                    <Eye size={14} /> Views
                  </div>
                  <p className="text-white text-2xl font-mono tabular-nums">
                    {(topPitch?.analytics?.views ?? 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider mb-1">
                    <MousePointerClick size={14} /> CTA Clicks
                  </div>
                  <p className="text-white text-2xl font-mono tabular-nums">
                    {(topPitch?.analytics?.ctaClicks ?? 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-center md:border-l border-white/10 md:pl-8 min-w-[200px]">
              <p className="text-sm text-zinc-400 font-medium mb-1">Conversion Rate</p>
              <div className="flex items-baseline gap-1 text-emerald-400">
                <span className="text-6xl font-bold tracking-tighter tabular-nums">
                  {getRatio(
                    topPitch?.analytics?.ctaClicks,
                    topPitch?.analytics?.views
                  )}
                </span>
                <span className="text-2xl font-medium">%</span>
              </div>
              <p className="text-xs text-zinc-600 mt-2">Based on total views</p>
            </div>
          </div>
        </div>

        {/* ================= SUMMARY GRID ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                <LayoutDashboard size={20} />
              </div>
              <span className="text-xs font-medium text-zinc-600 bg-zinc-800/50 px-2 py-1 rounded">All Time</span>
            </div>
            <p className="text-zinc-500 text-sm font-medium">Total Pitches</p>
            <p className="text-3xl text-white font-bold mt-1 tabular-nums">
              {user?.totalPitches ?? 0}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                <Eye size={20} />
              </div>
            </div>
            <p className="text-zinc-500 text-sm font-medium">Total Views</p>
            <p className="text-3xl text-white font-bold mt-1 tabular-nums">
              {(user?.totalViews ?? 0).toLocaleString()}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                <MousePointerClick size={20} />
              </div>
            </div>
            <p className="text-zinc-500 text-sm font-medium">Total Clicks</p>
            <p className="text-3xl text-white font-bold mt-1 tabular-nums">
              {(user?.totalCtaClicks ?? 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* ================= ALL PITCHES TABLE ================= */}

        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={20} className="text-indigo-500" />
          <h3 className="text-xl font-semibold text-white">Performance Data</h3>
        </div>

        <div className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-5 text-xs font-medium uppercase tracking-wider text-zinc-500">Title</th>
                  <th className="p-5 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">Views</th>
                  <th className="p-5 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">Clicks</th>
                  <th className="p-5 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">Ratio</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {allPitches.map((pitch) => (
                  <tr key={pitch._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="p-5">
                      <p className="text-sm font-medium text-zinc-200 group-hover:text-white">{pitch.title}</p>
                    </td>

                    <td className="p-5 text-right">
                      <span className="text-sm font-mono text-zinc-400 tabular-nums">
                        {(pitch.analytics?.views ?? 0).toLocaleString()}
                      </span>
                    </td>

                    <td className="p-5 text-right">
                      <span className="text-sm font-mono text-zinc-400 tabular-nums">
                        {(pitch.analytics?.ctaClicks ?? 0).toLocaleString()}
                      </span>
                    </td>

                    <td className="p-5 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${Number(getRatio(pitch.analytics?.ctaClicks, pitch.analytics?.views)) > 0
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-zinc-800 text-zinc-500'
                        }`}>
                        {getRatio(
                          pitch.analytics?.ctaClicks,
                          pitch.analytics?.views
                        )}%
                      </span>
                    </td>
                  </tr>
                ))}

                {allPitches.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-zinc-500">
                      No pitches found. Create one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;
