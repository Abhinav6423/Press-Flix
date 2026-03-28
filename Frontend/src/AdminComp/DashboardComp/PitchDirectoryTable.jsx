import React from 'react'
import { motion } from "framer-motion";
import { getRatio } from '../../utils/getRatio';
import { Link } from 'react-router-dom';
import ctaRate from '../../utils/CtaRate';
import waitlistRate from '../../utils/waitlistRate';
import conversionRate from '../../utils/conversionRate';
const PitchDirectoryTable = ({ allPitches }) => {
  const getRateColorClass = (rate) => {
    const numRate = parseFloat(rate);
    if (isNaN(numRate)) return "text-zinc-500";
    if (numRate < 40) return "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.2)]";
    if (numRate < 70) return "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.2)]";
    return "text-[#00e599] drop-shadow-[0_0_8px_rgba(0,229,153,0.2)]"; // 70-100 green
  };

  const getRatePillClass = (rate) => {
    const numRate = parseFloat(rate);
    if (isNaN(numRate)) return "bg-white/5 border-white/10 text-zinc-400";
    if (numRate < 40) return "bg-red-400/10 border-red-400/20 text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.1)]";
    if (numRate < 70) return "bg-yellow-400/10 border-yellow-400/20 text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.1)]";
    return "bg-[#00e599]/10 border-[#00e599]/20 text-[#00e599] shadow-[0_0_10px_rgba(0,229,153,0.1)]";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="w-full bg-[#121214]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl shadow-black/40 flex flex-col"
    >
      {/* HEADER */}
      <div className="mb-6 md:mb-8 flex flex-col">
        <h3 className="text-xl md:text-2xl text-white font-semibold tracking-tight">
          Pitch Directory
        </h3>
        <p className="text-sm text-zinc-400 mt-1.5">
          Manage and review all your published assets and performance.
        </p>
      </div>

      {/* TABLE CONTAINER - Custom Sleek Scrollbar */}
      <div className="w-full overflow-x-auto pb-4 
      [&::-webkit-scrollbar]:h-2 
      [&::-webkit-scrollbar-track]:bg-transparent 
      [&::-webkit-scrollbar-thumb]:bg-white/10 
      [&::-webkit-scrollbar-thumb]:rounded-full 
      hover:[&::-webkit-scrollbar-thumb]:bg-white/20 
      transition-all 
      [scrollbar-width:thin] 
      [scrollbar-color:rgba(255,255,255,0.1)_transparent]"
      >
        <table className="w-full min-w-[1200px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 text-xs">
              <th className="px-4 py-4 text-left font-medium uppercase tracking-widest whitespace-nowrap">
                Asset Name
              </th>
              <th className="px-4 py-4 text-left font-medium uppercase tracking-widest whitespace-nowrap">
                Pitch Link
              </th>
              <th className="px-4 py-4 text-right font-medium uppercase tracking-widest whitespace-nowrap">
                Views
              </th>
              <th className="px-4 py-4 text-right font-medium uppercase tracking-widest whitespace-nowrap">
                Unique
              </th>
              <th className="px-4 py-4 text-right font-medium uppercase tracking-widest whitespace-nowrap">
                Leads
              </th>
              <th className="px-4 py-4 text-right font-medium uppercase tracking-widest whitespace-nowrap text-[#00e599]">
                CTA Clicks
              </th>
              <th className="px-4 py-4 text-right font-medium uppercase tracking-widest whitespace-nowrap">
                CTA Rate
              </th>
              <th className="px-4 py-4 text-right font-medium uppercase tracking-widest whitespace-nowrap">
                Waitlist Rate
              </th>
              <th className="px-4 py-4 text-right font-medium uppercase tracking-widest whitespace-nowrap">
                Conversion
              </th>
              <th className="px-4 py-4 text-right font-medium uppercase tracking-widest whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allPitches.map((pitch) => {
              // DUMMY HARDCODED VALUES - Replace these with actual logic later
              const dummyCtaRate = 85;
              const dummyWaitlistRate = 55;
              const dummyConversionRate = 30;

              return (
                <tr
                  key={pitch._id}
                  className="border-b border-white/5 transition-all duration-200 hover:bg-white/[0.03] group"
                >
                  {/* ASSET NAME */}
                  <td className="px-4 py-4 md:py-5 text-zinc-200 font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex shrink-0 items-center justify-center border border-white/10 shadow-inner group-hover:border-white/20 transition-all">
                        <span className="text-sm font-bold text-zinc-200">
                          {pitch.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm md:text-base truncate max-w-[150px] sm:max-w-[200px] group-hover:text-white transition-colors">
                        {pitch.title}
                      </span>
                    </div>
                  </td>

                  {/* PITCH LINK */}
                  <td className="px-4 py-4 md:py-5 text-left whitespace-nowrap">
                    <a
                      href={`${window.location.origin}/#/p/${pitch.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      title={`${window.location.origin}/#/p/${pitch.slug}`}
                      className="text-sm text-zinc-500 hover:text-[#00e599] transition-colors truncate max-w-[150px] inline-block underline-offset-4 hover:underline"
                    >
                      /{pitch.slug}
                    </a>
                  </td>

                  {/* VIEWS */}
                  <td className="px-4 py-4 md:py-5 text-right text-zinc-300 text-sm md:text-base tabular-nums whitespace-nowrap group-hover:text-white transition-colors">
                    {pitch.analytics?.views ?? 0}
                  </td>

                  {/* UNIQUE VISITORS */}
                  <td className="px-4 py-4 md:py-5 text-right text-zinc-300 text-sm md:text-base tabular-nums whitespace-nowrap group-hover:text-white transition-colors">
                    {pitch.analytics?.uniqueVisitors ?? 0}
                  </td>

                  {/* LEADS */}
                  <td className="px-4 py-4 md:py-5 text-right text-zinc-300 text-sm md:text-base tabular-nums whitespace-nowrap group-hover:text-white transition-colors">
                    {pitch.analytics?.waitlistCount ?? 0}
                  </td>

                  {/* CTA CLICKS */}
                  <td className="px-4 py-4 md:py-5 text-right font-medium text-[#00e599] text-sm md:text-base tabular-nums whitespace-nowrap drop-shadow-[0_0_8px_rgba(0,229,153,0.2)]">
                    {pitch.analytics?.ctaClicks ?? 0}
                  </td>

                  {/* CTA RATE */}
                  <td className={`px-4 py-4 md:py-5 text-right font-medium text-sm md:text-base tabular-nums whitespace-nowrap ${getRateColorClass(ctaRate(pitch.analytics?.ctaClicks ?? 0, pitch.analytics?.views ?? 0))}`}>
                    {ctaRate(pitch.analytics?.ctaClicks ?? 0, pitch.analytics?.views ?? 0)}%
                  </td>

                  {/* WAITLIST RATE */}
                  <td className={`px-4 py-4 md:py-5 text-right font-medium text-sm md:text-base tabular-nums whitespace-nowrap ${getRateColorClass(waitlistRate(pitch.analytics?.waitlistCount ?? 0, pitch.analytics?.ctaClicks ?? 0))}`}>
                    {waitlistRate(pitch.analytics?.waitlistCount ?? 0, pitch.analytics?.ctaClicks ?? 0)}%
                  </td>

                  {/* CONVERSION RATE */}
                  <td className="px-4 py-4 md:py-5 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border font-medium text-sm tabular-nums ${getRatePillClass(conversionRate(pitch.analytics?.waitlistCount ?? 0, pitch.analytics?.uniqueVisitors ?? 0))}`}>
                      {conversionRate(pitch.analytics?.waitlistCount ?? 0, pitch.analytics?.uniqueVisitors ?? 0)}%
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-4 py-4 md:py-5 text-right whitespace-nowrap">
                    <Link to={`/view-waitlist/${pitch.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#00e599]/10 text-zinc-300 hover:text-[#00e599] border border-white/5 hover:border-[#00e599]/30 transition-all duration-200 backdrop-blur-sm text-sm font-medium"
                      >
                        View
                      </motion.button>
                    </Link>
                  </td>
                </tr>
              );
            })}

            {/* EMPTY STATE */}
            {allPitches.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="py-16 md:py-24 text-center text-zinc-500"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-2 shadow-inner">
                      <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-zinc-300 font-medium text-base">
                      No active pitches found
                    </p>
                    <p className="text-sm text-zinc-500">
                      Create your first pitch to see analytics here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default PitchDirectoryTable