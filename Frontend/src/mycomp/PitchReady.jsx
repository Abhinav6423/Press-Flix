import React from "react";
import { CheckCircle, Copy, ExternalLink, Home } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
const PitchReady = () => {
    const navigate = useNavigate();
    const { slug } = useParams();

    const publicUrl = `${window.location.origin}/#/p/${slug}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(publicUrl);
            toast.success("Link copied!");
        } catch {
            toast.error("Failed to copy");
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050505] flex items-center justify-center p-6 text-zinc-300 font-sans overflow-hidden selection:bg-[#00e599]/30">

            {/* Subtle Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#00e599] opacity-[0.05] blur-[100px] md:blur-[120px] pointer-events-none rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 max-w-lg w-full bg-gradient-to-b from-[#161618] to-[#121214] border border-white/[0.08] rounded-3xl p-8 md:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
                {/* SUCCESS ICON */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto w-20 h-20 bg-[#00e599]/10 rounded-full flex items-center justify-center mb-8 border border-[#00e599]/20 shadow-[0_0_30px_rgba(0,229,153,0.15)]"
                >
                    <CheckCircle size={36} strokeWidth={2.5} className="text-[#00e599]" />
                </motion.div>

                {/* TITLE & COPY */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                        Your Pitch is Live 🎉
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400">
                        Your landing page has been successfully generated and is ready to be shared with the world.
                    </p>
                </motion.div>

                {/* URL BOX */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="mt-8 bg-black/40 border border-white/10 hover:border-white/20 transition-colors rounded-xl p-2.5 flex items-center justify-between gap-3 group"
                >
                    <div className="overflow-hidden flex-1 px-2 text-left">
                        <span className="text-xs md:text-sm text-zinc-300 font-mono truncate block w-full select-all selection:bg-[#00e599]/30">
                            {publicUrl}
                        </span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyToClipboard}
                        className="shrink-0 p-2.5 bg-white/5 hover:bg-white/10 hover:text-[#00e599] text-zinc-400 rounded-lg transition-colors border border-transparent hover:border-white/5"
                        title="Copy to clipboard"
                    >
                        <Copy size={16} />
                    </motion.button>
                </motion.div>

                {/* ACTIONS */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={publicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black hover:bg-zinc-200 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] text-sm md:text-base"
                    >
                        <ExternalLink size={18} />
                        Open Page
                    </motion.a>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/home")}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-colors text-sm md:text-base"
                    >
                        <Home size={18} className="text-zinc-400" />
                        Dashboard
                    </motion.button>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default PitchReady;
