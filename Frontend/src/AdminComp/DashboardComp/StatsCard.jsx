import React from 'react'
import { motion } from 'framer-motion'

const StatsCard = ({ label, sub, value, badge, badgeColor, delay }) => {

  const badgeStyles = {
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    green: "text-green-400 bg-green-400/10 border-green-400/20",
    orange: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    zinc: "text-zinc-400 bg-zinc-800/80 border-white/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-gradient-to-b from-[#161618] to-[#121214] border border-white/[0.06] rounded-3xl p-6 md:p-8 md:backdrop-blur-xl shadow-lg shadow-black/20"
    >
      <p className="text-xs md:text-sm text-zinc-400 font-medium mb-1">{label}</p>
      <p className="text-[10px] md:text-xs text-zinc-600 mb-6 md:mb-8">{sub}</p>

      <div className="flex items-end justify-between">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          {value}
        </h2>
        <span
          className={`text-[10px] md:text-xs font-semibold px-2.5 py-1.5 rounded-lg border ${badgeStyles[badgeColor]}`}
        >
          {badge}
        </span>
      </div>
    </motion.div>
  )
}

export default StatsCard