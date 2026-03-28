import React from 'react'
import { TrendingUp, Eye, ExternalLink, Activity, Users, MousePointerClick, Zap, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getRatio } from '../../utils/getRatio'
import ctaRate from '../../utils/CtaRate'
import waitlistRate from '../../utils/waitlistRate'
const TopPerformingPitch = ({ topPitch }) => {

    const getRateColor = (rate) => {
        if (rate <= 40) return "text-red-500";
        if (rate <= 70) return "text-yellow-400";
        return "text-[#00e599]";
    };

    return (
        <div className="w-full bg-[#121214]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 shadow-2xl shadow-black/40 overflow-hidden relative group">

            {/* Subtle background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00e599]/[0.02] to-transparent pointer-events-none " />

            {/* --- LEFT SECTION --- */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Top: Header Group */}
                <div className="flex flex-col min-w-0">
                    {/* Badge */}
                    <div className="flex items-center gap-1.5 bg-[#00e599]/10 text-[#00e599] px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold tracking-widest uppercase w-max mb-4 border border-[#00e599]/20 shadow-[0_0_10px_rgba(0,229,153,0.1)]">
                        <TrendingUp size={14} strokeWidth={2.5} />
                        Top Performing Pitch
                    </div>

                    {/* Title & Link */}
                    <div className="flex flex-col gap-1 min-w-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight truncate">
                            {topPitch?.title || "Your Pitch Title"}
                        </h2>
                        <a
                            href={`${window.location.origin}/#/p/${topPitch?.slug || "your-pitch-slug"}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 text-sm flex items-center gap-1.5 hover:text-[#00e599] transition-colors w-max max-w-full group/link"
                        >
                            <span className="truncate underline-offset-4 group-hover/link:underline">
                                {`${window.location.origin}/#/p/${topPitch?.slug || "your-pitch-slug"}`}
                            </span>
                            <ExternalLink size={14} className="shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                    </div>
                </div>

                {/* Middle: Stats Grid (Perfect 6-item layout: 2 cols on mobile, 3 on tablet/desktop) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 my-6 lg:my-8">
                    {/* Views */}
                    <div className="flex flex-col justify-center">
                        <p className="text-zinc-500 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
                            <Eye size={14} className="text-zinc-400" /> Views
                        </p>
                        <p className="text-2xl lg:text-3xl font-semibold text-zinc-100 tabular-nums">
                            {topPitch?.analytics?.views || 0}
                        </p>
                    </div>

                    {/* Waitlists */}
                    <div className="flex flex-col justify-center">
                        <p className="text-zinc-500 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
                            <Activity size={14} className="text-zinc-400" /> Waitlists
                        </p>
                        <p className="text-2xl lg:text-3xl font-semibold text-zinc-100 tabular-nums">
                            {topPitch?.analytics?.waitlistCount || 0}
                        </p>
                    </div>

                    {/* Unique Visitors */}
                    <div className="flex flex-col justify-center">
                        <p className="text-zinc-500 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
                            <Users size={14} className="text-zinc-400" /> Unique
                        </p>
                        <p className="text-2xl lg:text-3xl font-semibold text-zinc-100 tabular-nums">
                            {topPitch?.analytics?.uniqueVisitors || 0}
                        </p>
                    </div>

                    {/* CTA Clicks */}
                    <div className="flex flex-col justify-center">
                        <p className="text-zinc-500 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
                            <MousePointerClick size={14} className="text-[#00e599]/70" /> CTA Clicks
                        </p>
                        <p className="text-2xl lg:text-3xl font-semibold text-zinc-100 tabular-nums">
                            {topPitch?.analytics?.ctaClicks || 0}
                        </p>
                    </div>

                    {/* CTA Rate */}
                    <div className="flex flex-col justify-center">
                        <p className="text-zinc-500 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
                            <Zap size={14} className="text-[#00e599]/70" /> CTA Rate
                        </p>

                        <p
                            className={`text-2xl lg:text-3xl font-semibold tabular-nums drop-shadow-[0_0_8px_rgba(0,229,153,0.2)] ${getRateColor(ctaRate(topPitch?.analytics?.ctaClicks || 0, topPitch?.analytics?.views || 0))}`}
                        >
                            {ctaRate(topPitch?.analytics?.ctaClicks || 0, topPitch?.analytics?.views || 0)}%
                        </p>
                    </div>

                    {/* Waitlist Rate */}
                    <div className="flex flex-col justify-center">
                        <p className="text-zinc-500 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
                            <Target size={14} className="text-[#00e599]/70" /> Wait Rate
                        </p>
                        <p
                            className={`text-2xl lg:text-3xl font-semibold tabular-nums drop-shadow-[0_0_8px_rgba(0,229,153,0.2)] ${getRateColor(waitlistRate(topPitch?.analytics?.waitlistCount || 0, topPitch?.analytics?.ctaClicks || 0))}`}
                        >
                            {waitlistRate(topPitch?.analytics?.waitlistCount || 0, topPitch?.analytics?.ctaClicks || 0)}%
                        </p>
                    </div>
                </div>

                {/* Bottom: Button */}
                <div className="mt-auto">
                    <Link to={`/view-waitlist/${topPitch?.slug || ""}`} className="inline-block w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-[#00e599] hover:bg-[#00e599]/90 active:scale-[0.98] transition-all duration-200 text-[#0e1116] font-bold px-6 py-3 rounded-xl text-sm shadow-[0_0_20px_rgba(0,229,153,0.15)] hover:shadow-[0_0_25px_rgba(0,229,153,0.25)] flex items-center justify-center gap-2">
                            View Waitlist Data
                        </button>
                    </Link>
                </div>
            </div>

            {/* --- RIGHT SECTION (Conversion Rate) --- */}
            {/* border-t handles the mobile divider, lg:border-l handles the desktop divider */}
            <div className="pt-6 mt-2 lg:pt-0 lg:mt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center items-start lg:items-center min-w-[240px] shrink-0">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 w-full flex flex-col items-center justify-center text-center transition-colors hover:bg-white/[0.04]">
                    <p className="text-zinc-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
                        Conversion Rate
                    </p>
                    <div className="flex items-baseline text-[#00e599] drop-shadow-[0_0_15px_rgba(0,229,153,0.3)] mb-2">
                        <span className={` text-6xl lg:text-7xl font-bold tracking-tighter tabular-nums ${getRateColor(getRatio(topPitch?.analytics?.waitlistCount, topPitch?.analytics?.uniqueVisitors))}`}>
                            {getRatio(topPitch?.analytics?.waitlistCount, topPitch?.analytics?.uniqueVisitors) || "0.0"}
                        </span>
                        <span className={`text-3xl font-bold ml-1 ${getRateColor(getRatio(topPitch?.analytics?.waitlistCount, topPitch?.analytics?.uniqueVisitors))}  `}>%</span>
                    </div>
                    <p className="text-zinc-500 text-[11px] font-medium uppercase tracking-wider">
                        Based on unique visitors
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TopPerformingPitch