import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PerformanceChart = ({ chartData }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-[#121214]/80 md:backdrop-blur-md border border-white/[0.06] rounded-3xl p-5 sm:p-6 md:p-8 mb-6 shadow-xl shadow-black/20"
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h3 className="text-lg md:text-xl text-white font-semibold">
            Performance Metrics
          </h3>
          <p className="text-xs md:text-sm text-zinc-500 mt-1">
            Timeline of your pitch views and incoming leads
          </p>
        </div>

        <div className="text-[10px] md:text-xs font-medium text-zinc-400 bg-black/40 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 self-start sm:self-auto">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#00e599]" />
          Live Data
        </div>
      </div>

      {/* CHART */}
      <div className="w-full h-[250px] sm:h-[280px] md:h-[320px]">
        <div ref={ref} className="w-full h-full">
          {inView && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData || []}
                margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
              >
                {/* Gradients */}
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

                {/* Grid */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#222"
                  vertical={false}
                />

                {/* X Axis */}
                <XAxis
                  dataKey="name"
                  stroke="#666"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={15}
                />

                {/* Y Axis */}
                <YAxis
                  stroke="#666"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(22, 22, 24, 0.9)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                    boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
                    padding: "8px 12px",
                  }}
                  itemStyle={{ color: "#e4e4e7" }}
                  cursor={{
                    stroke: "rgba(255,255,255,0.1)",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                />

                {/* Views */}
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#00e599"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  activeDot={{
                    r: 5,
                    fill: "#00e599",
                    stroke: "#050505",
                    strokeWidth: 3,
                  }}
                  isAnimationActive={false}
                />

                {/* Waitlists */}
                <Area
                  type="monotone"
                  dataKey="waitlists"
                  stroke="#ff8a00"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorWaitlists)"
                  activeDot={{
                    r: 5,
                    fill: "#ff8a00",
                    stroke: "#050505",
                    strokeWidth: 3,
                  }}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceChart;