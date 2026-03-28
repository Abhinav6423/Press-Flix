import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Plus } from "lucide-react";
import { fadeUp } from "../../utils/fadeUp";
import { getRatio } from "../../utils/getRatio";
import StatCard from "./StatsCard";
import TopPitchCard from "./TopPerformingPitch";
import PerformanceChart from "./PerformanceChart";
import PitchTable from "./PitchDirectoryTable";
import { all } from "axios";

export default function Dashboard({ user, logoutUser, topPitch, allPitches, chartData }) {
    console.log('all Pitches are : ', allPitches)



    return (
        <div className="flex flex-col min-h-screen w-full bg-[#050505] text-zinc-300 font-sans selection:bg-[#00e599]/30">


            <main className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#0a0a0c] to-[#050505] rounded-t-[2rem] border-t border-white/[0.08] relative shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">

                {/* Ambient glow */}
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#00e599] opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12 relative z-10">

                    {/* Header */}
                    <motion.div {...fadeUp(0)} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg shadow-black/50">
                                <LayoutDashboard className="w-6 h-6 text-zinc-200" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight flex flex-wrap items-center gap-2">
                                    Overview
                                    <span className="text-[10px] bg-zinc-800/80 text-zinc-300 px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/10 font-medium">
                                        All Time
                                    </span>
                                </h1>
                                <p className="text-sm text-zinc-500 mt-1">Track and analyze your pitch performance</p>
                            </div>
                        </div>
                        <Link to="/create-form" className="w-full sm:w-auto">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white text-black px-5 py-3 md:py-2.5 text-sm font-semibold rounded-xl hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                                <Plus size={18} /> Create Pitch
                            </motion.button>
                        </Link>
                    </motion.div>

                    <TopPitchCard topPitch={topPitch} />

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 mb-8">
                        <StatCard label="Total Pitches" sub="Active assets in portfolio" value={allPitches?.length ?? 0} badge="Created" badgeColor="blue" delay={0.05} />

                        <StatCard label="Total Views" sub="Across all your active pitches" value={user?.totalViews ?? 0} badge="+ Top Pitch" badgeColor="green" delay={0.1} />

                        <StatCard label="Waitlist Signups" sub="Total captured leads" value={user?.totalWaitlist ?? 0} badge="Active" badgeColor="orange" glow="orange" delay={0.2} />

                        <StatCard label="Conversion Rate" sub="Avg conversion from views to leads" value={`${getRatio(topPitch?.analytics?.waitlistCount, topPitch?.analytics?.views)}`} badge="Avg Ratio" badgeColor="zinc" delay={0.3} />
                    </div>

                    <PerformanceChart chartData={chartData} />
                    <PitchTable allPitches={allPitches} />

                </div>
            </main>
        </div>
    );
}
