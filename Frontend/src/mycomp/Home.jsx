import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Layers, LogOut, Plus,
  LayoutDashboard, Database, FolderOpen,
  Settings, User, ChevronRight, Activity, TrendingUp, Eye, ExternalLink
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useAuth } from "../context/Auth.context";
import { getTopPerformingPitch } from "../api-calls/topPerformingPitch";
import { getAllUsersPitchCreated } from "../api-calls/allUsersPitchCreated";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
const Home = () => {
  const { userData: user, loading, logoutUser } = useAuth();

  /* ================= TANSTACK QUERIES ================= */

  const {
    data: topPitch,
    isLoading: topPitchLoading,
  } = useQuery({
    queryKey: ["topPitch"],
    queryFn: async () => {
      const res = await getTopPerformingPitch();
      console.log('top pitch data' , res.data)
      return res?.success ? res.data : null;
    },
    enabled: !!user && !loading,
    staleTime: 1000 * 60 * 2, // 2 min fresh
    refetchOnWindowFocus: false,
  });

  const {
    data: allPitches = [],
    isLoading: allPitchesLoading,
  } = useQuery({
    queryKey: ["allPitches"],
    queryFn: async () => {
      const res = await getAllUsersPitchCreated();
      return res?.success ? res?.data?.data || [] : [];
    },
    enabled: !!user && !loading,
    staleTime: 1000 * 30, // 30 sec
    refetchOnWindowFocus: false,
  });

  //  chart data transformation for recharts - only top 5 pitches by views to keep it clean

  const chartData = allPitches.map((pitch) => ({
    name: pitch.title.length > 15
      ? pitch.title.slice(0, 15) + "..."
      : pitch.title,
    views: pitch.analytics?.views ?? 0,
    waitlists: pitch.analytics?.waitlistCount ?? 0,
  }));

  /* ================= HELPERS ================= */

  const getRatio = (clicks = 0, views = 0) => {
    if (!views) return "0.0";
    return ((clicks / views) * 100).toFixed(1);
  };

  /* ================= AUTH CHECK ================= */

  if (loading || topPitchLoading || allPitchesLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  /* ================= UI ================= */
  return (
    // Outer shell
    <div className="flex flex-col h-screen w-full bg-[#050505] text-zinc-300 font-sans overflow-hidden selection:bg-[#00e599]/30">

      {/* NAVIGATION (Top Navbar) */}
      <Navbar user={user} logoutUser={logoutUser} />

      {/* MAIN CONTENT AREA - Upgraded with a premium dark gradient */}
      <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#0a0a0c] to-[#050505] rounded-t-[2rem] border-t border-white/[0.08] overflow-y-auto relative shadow-[0_-20px_50px_rgba(0,0,0,0.5)] scroll-smooth">

        {/* Subtle, static top-left ambient glow */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#00e599] opacity-[0.02] blur-[100px] md:blur-[120px] pointer-events-none rounded-full" />

        {/* Adjusted paddings for mobile responsiveness */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12 relative z-10">

          {/* HEADER - Stack on small screens, row on larger */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 md:mb-10"
          >
            <div className="flex items-center gap-4 md:gap-5">
              <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/50">
                <LayoutDashboard className="w-6 h-6 md:w-[26px] md:h-[26px] text-zinc-200" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight flex flex-wrap items-center gap-2 md:gap-3">
                  Overview
                  <span className="text-[10px] md:text-[11px] bg-zinc-800/80 text-zinc-300 px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/10 font-medium whitespace-nowrap">
                    All Time
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-zinc-500 mt-1">Track and analyze your pitch performance</p>
              </div>
            </div>

            <Link to="/create-form" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white text-black px-5 py-3 md:py-2.5 text-sm font-semibold rounded-xl transition-colors hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <Plus size={18} />
                Create Pitch
              </motion.button>
            </Link>
          </motion.div>

          {/* TOP PERFORMING PITCH - Moved inside layout container */}
          <div className="bg-[#0e1116] border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between w-full font-sans text-white mb-8 shadow-xl shadow-black/20">
            {/* Left Section */}
            <div className="flex-1">
              {/* Badge */}
              <div className="flex items-center gap-1.5 bg-[#0a2718] text-[#00e676] px-3 py-1 rounded-full text-xs font-bold tracking-wide w-max mb-4">
                <TrendingUp size={14} strokeWidth={2.5} />
                TOP PERFORMING PITCH
              </div>

              {/* Title & Link */}
              <h2 className="text-2xl font-bold mb-1">Lord of the Mysteries</h2>
              <a
                href={`${window.location.origin}/#/p/${topPitch?.slug || "your-pitch-slug"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 text-sm flex items-center gap-1.5 hover:text-gray-300 transition-colors mb-8 w-max"
              >
                {`${window.location.origin}/#/p/${topPitch?.slug || "your-pitch-slug"}`}
                <ExternalLink size={14} />
              </a>

              {/* Stats */}
              <div className="flex gap-16 mb-8">
                <div>
                  <p className="text-gray-500 text-[11px] font-bold tracking-wider flex items-center gap-1.5 mb-2">
                    <Eye size={14} /> VIEWS
                  </p>
                  <p className="text-2xl font-semibold">{topPitch?.views || 0}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[11px] font-bold tracking-wider flex items-center gap-1.5 mb-2">
                    <Activity size={14} /> % TOTAL WAITLISTS
                  </p>
                  <p className="text-2xl font-semibold">{topPitch?.analytics.waitlistCount || 0}</p>
                </div>
              </div>

              {/* Button */}
              <Link to={`/view-waitlist/${topPitch?.slug || ""}`} className="w-max">
                <button className="bg-[#00c853] hover:bg-[#00e676] transition-colors text-white font-semibold px-4 py-2 rounded-lg text-sm">
                View Waitlist Data
              </button>
              </Link>
            </div>

            {/* Right Section (Conversion Rate) */}
            <div className="mt-8 md:mt-0 md:pl-10 md:border-l border-gray-800 flex flex-col justify-center min-w-[200px]">
              <p className="text-gray-400 text-sm font-medium mb-1">Conversion Rate</p>
              <div className="flex items-baseline text-[#00e676]">
                <span className="text-5xl font-bold">2.3</span>
                <span className="text-2xl font-bold ml-1">%</span>
              </div>
              <p className="text-gray-500 text-xs mt-2">Based on total views</p>
            </div>
          </div>

          {/* STATS CARDS - Now a 4-column grid on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">

            {/* Card 1: Total Pitches (NEW) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-gradient-to-b from-[#161618] to-[#121214] border border-white/[0.06] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-lg shadow-black/20"
            >
              <p className="text-xs md:text-sm text-zinc-400 font-medium mb-1">Total Pitches</p>
              <p className="text-[10px] md:text-xs text-zinc-600 mb-6 md:mb-8">Active assets in portfolio</p>

              <div className="flex items-end justify-between">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {allPitches?.length || 0}
                </h2>
                <span className="text-[10px] md:text-xs text-[#3b82f6] font-semibold bg-[#3b82f6]/10 px-2.5 py-1.5 rounded-lg border border-[#3b82f6]/20">
                  Created
                </span>
              </div>
            </motion.div>

            {/* Card 2: Views */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-gradient-to-b from-[#161618] to-[#121214] border border-white/[0.06] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-lg shadow-black/20"
            >
              <p className="text-xs md:text-sm text-zinc-400 font-medium mb-1">Total Views</p>
              <p className="text-[10px] md:text-xs text-zinc-600 mb-6 md:mb-8">Across all your active pitches</p>

              <div className="flex items-end justify-between">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {topPitch?.analytics?.views ?? 0}
                </h2>
                <span className="text-[10px] md:text-xs text-[#00e599] font-semibold bg-[#00e599]/10 px-2.5 py-1.5 rounded-lg border border-[#00e599]/20">
                  + Top Pitch
                </span>
              </div>
            </motion.div>

            {/* Card 3: Waitlists */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative bg-gradient-to-b from-[#161618] to-[#121214] border border-white/[0.06] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-lg shadow-black/20 overflow-hidden"
            >
              <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-[#ff8a00] opacity-10 blur-[30px] md:blur-[40px] rounded-full pointer-events-none" />
              <p className="text-xs md:text-sm text-zinc-400 font-medium mb-1">Waitlist Signups</p>
              <p className="text-[10px] md:text-xs text-zinc-600 mb-6 md:mb-8">Total captured leads</p>

              <div className="flex items-end justify-between relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {topPitch?.analytics?.waitlistCount ?? 0}
                </h2>
                <span className="text-[10px] md:text-xs text-[#ff8a00] font-semibold bg-[#ff8a00]/10 px-2.5 py-1.5 rounded-lg border border-[#ff8a00]/20">
                  Active
                </span>
              </div>
            </motion.div>

            {/* Card 4: Conversion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-gradient-to-b from-[#161618] to-[#121214] border border-white/[0.06] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-lg shadow-black/20"
            >
              <p className="text-xs md:text-sm text-zinc-400 font-medium mb-1">Conversion Rate</p>
              <p className="text-[10px] md:text-xs text-zinc-600 mb-6 md:mb-8">Avg conversion from views to leads</p>

              <div className="flex items-end justify-between">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {getRatio(topPitch?.analytics?.waitlistCount, topPitch?.analytics?.views)}%
                </h2>
                <span className="text-[10px] md:text-xs text-zinc-400 font-semibold bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-white/10">
                  Avg Ratio
                </span>
              </div>
            </motion.div>
          </div>

          {/* MAIN CHART */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-[#121214]/80 backdrop-blur-md border border-white/[0.06] rounded-3xl p-5 sm:p-6 md:p-8 mb-6 shadow-xl shadow-black/20"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
              <div>
                <h3 className="text-lg md:text-xl text-white font-semibold">Performance Metrics</h3>
                <p className="text-xs md:text-sm text-zinc-500 mt-1">Timeline of your pitch views and incoming leads</p>
              </div>
              <div className="text-[10px] md:text-xs font-medium text-zinc-400 bg-black/40 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 self-start sm:self-auto">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#00e599]" />
                Live Data
              </div>
            </div>

            <div className="w-full h-[250px] sm:h-[280px] md:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e599" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00e599" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWaitlists" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff8a00" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ff8a00" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" fontSize={10} md:fontSize={12} tickLine={false} axisLine={false} dy={15} />
                  <YAxis stroke="#666" fontSize={10} md:fontSize={12} tickLine={false} axisLine={false} dx={-10} />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(22, 22, 24, 0.9)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
                      padding: "8px 12px"
                    }}
                    itemStyle={{ color: "#e4e4e7" }}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />

                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#00e599"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                    activeDot={{ r: 5, fill: "#00e599", stroke: "#050505", strokeWidth: 3 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="waitlists"
                    stroke="#ff8a00"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorWaitlists)"
                    activeDot={{ r: 5, fill: "#ff8a00", stroke: "#050505", strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* TABLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-[#121214]/80 backdrop-blur-md border border-white/[0.06] rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl shadow-black/20"
          >
            <div className="mb-6 md:mb-8">
              <h3 className="text-lg md:text-xl text-white font-semibold">Pitch Directory</h3>
              <p className="text-xs md:text-sm text-zinc-500 mt-1">Manage and review all your published assets</p>
            </div>

            <div className="overflow-x-auto pb-2">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/[0.08] text-zinc-400 text-[10px] md:text-xs">
                    <th className="pb-4 text-left font-semibold uppercase tracking-wider">Asset Name</th>
                    <th className="pb-4 text-left font-semibold uppercase tracking-wider pl-4">Pitch Link</th>
                    <th className="pb-4 text-right font-semibold uppercase tracking-wider">Views</th>
                    <th className="pb-4 text-right font-semibold uppercase tracking-wider">Leads</th>
                    <th className="pb-4 text-right font-semibold uppercase tracking-wider">Ratio</th>
                    <th className="pb-4 text-right font-semibold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allPitches.map((pitch) => (
                    <motion.tr
                      initial="initial"
                      whileHover="hover"
                      key={pitch._id}
                      className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]"
                    >
                      {/* ASSET NAME */}
                      <td className="py-4 md:py-5 text-zinc-200 font-medium flex items-center gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-zinc-800/80 flex shrink-0 items-center justify-center border border-white/5 shadow-inner">
                          <span className="text-xs md:text-sm font-bold text-zinc-300">{pitch.title.charAt(0)}</span>
                        </div>
                        <span className="text-sm md:text-base truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">{pitch.title}</span>
                      </td>

                      {/* PITCH LINK (NEW) */}
                      <td className="py-4 md:py-5 text-left pl-4">
                        <a
                          href={`${window.location.origin}/#/p/${pitch.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title={`${window.location.origin}/#/p/${pitch.slug}`}
                          className="text-xs md:text-sm text-zinc-500 hover:text-[#00e599] transition-colors truncate max-w-[100px] sm:max-w-[150px] inline-block underline-offset-4 hover:underline"
                        >
                          /{pitch.slug}
                        </a>
                      </td>

                      {/* VIEWS */}
                      <td className="py-4 md:py-5 text-right text-zinc-400 text-sm md:text-base">{pitch.analytics?.views ?? 0}</td>

                      {/* LEADS */}
                      <td className="py-4 md:py-5 text-right text-zinc-400 text-sm md:text-base">{pitch.analytics?.waitlistCount ?? 0}</td>

                      {/* RATIO */}
                      <td className="py-4 md:py-5 text-right">
                        <span className="text-[#00e599] font-semibold text-sm md:text-base">
                          {getRatio(pitch.analytics?.waitlistCount, pitch.analytics?.views)}%
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="py-4 md:py-5 text-right">
                        <Link to={`/view-waitlist/${pitch.slug}`}>
                          <motion.button
                            variants={{
                              initial: { backgroundColor: "rgba(255,255,255,0.03)", color: "#a1a1aa" },
                              hover: { backgroundColor: "rgba(0,229,153,0.1)", color: "#00e599", x: -2 }
                            }}
                            transition={{ duration: 0.2 }}
                            className="p-2 md:p-2.5 rounded-xl border border-white/5 backdrop-blur-sm"
                          >
                            <span className="text-xs md:text-sm font-medium px-1">View</span>
                          </motion.button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                  {allPitches.length === 0 && (
                    <tr>
                      {/* Updated colSpan from 5 to 6 to account for the new Link column */}
                      <td colSpan={6} className="py-8 md:py-10 text-center text-zinc-500 text-sm md:text-base">
                        No active pitches found. Start by creating one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );


};

export default Home;