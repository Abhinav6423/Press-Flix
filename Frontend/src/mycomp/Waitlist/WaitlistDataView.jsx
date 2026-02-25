import React, { useState } from "react";
import { ArrowLeft, ExternalLink, Mail, MessageSquare, User, Quote, Sparkles } from "lucide-react";
import { viewWaitlistData } from "../../api-calls/viewWaitlistData";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const WaitlistDataView = () => {
  const { slug } = useParams();
  const [wailistData, setWailistData] = useState([])
  const [count, setCount] = useState(0)
  // --- DUMMY DATA ---
  const pitchDetails = {
    title: "The Next-Gen AI Workflow Tool",
    slug: "next-gen-ai-workflow",
    url: "https://pressflix.com/p/next-gen-ai-workflow",
    totalWaitlist: 5,
  };

  const waitlistUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.j@example.com",
      feedback: "Absolutely love the idea! Can't wait for early access to see how it integrates with our current stack.",
      date: "Oct 24, 2023",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@techcorp.com",
      feedback: "How does this integrate with existing tools like Jira? Looks very promising.",
      date: "Oct 25, 2023",
    },
    {
      id: 3,
      name: "Clara Davis",
      email: "clara.d@startup.io",
      feedback: "Sign me up! The UI from the pitch looks incredibly clean and intuitive.",
      date: "Oct 25, 2023",
    },
    {
      id: 4,
      name: "David Kim",
      email: "dkim@freelance.net",
      feedback: "Would love to see a pricing page soon. Wishing you the best of luck with the launch!",
      date: "Oct 26, 2023",
    },
    {
      id: 5,
      name: "Emma Wilson",
      email: "emma.w@designco.com",
      feedback: "No specific feedback yet, just wanted to secure my spot on the waitlist.",
      date: "Oct 27, 2023",
    },
  ];

  // Helper to get initials for the avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };


  const getWaitlistDataForPitch = async (slug) => {
    try {
      const res = await viewWaitlistData(slug);
      if (res.success) {
        console.log("Waitlist data waiting :", res.data);
        setWailistData(res.data);
        setCount(res.data.length);
        // Here you would typically set this data to state to render it
      }
      else {
        console.error("Failed to retrieve waitlist data:", res.message);
      }
    } catch (error) {
      console.error("Error fetching waitlist data:", error.message);

    }
  }

  useEffect(() => {
    getWaitlistDataForPitch(slug);
  }, [slug])


  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 p-6 md:p-10 font-sans selection:bg-indigo-500/30 relative overflow-hidden">

      {/* --- PREMIUM AMBIENT GLOWS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-violet-600/10 rounded-full blur-[140px]" />
        {/* Subtle noise overlay (optional, creates a matte texture) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* --- HEADER SECTION --- */}
        <div className="mb-14">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-sm font-medium text-zinc-400 hover:text-white transition-all mb-8 group backdrop-blur-md shadow-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          {/* Premium Glassmorphic Header Card */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-gradient-to-br from-zinc-900/80 to-[#0A0A0A]/90 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/5 relative overflow-hidden">

            {/* Soft inner card glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-5 shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]">
                <Sparkles size={12} className="text-indigo-400" />
                Waitlist Data
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 drop-shadow-sm">
                {wailistData[0]?.pitch?.title || "Project Not Found"}
              </h1>

              <a
                href={`${window.location.origin}/#/p/${wailistData[0]?.pitch?.slug || "not-found"}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors group/link"
              >
                {`${window.location.origin}/#/p/${wailistData[0]?.pitch?.slug || "not-found"}`}
                <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="relative z-10 flex flex-col items-start md:items-end md:border-l border-white/10 md:pl-10">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.15em] mb-2">Total Waitlisted</p>
              <p className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-violet-500 tabular-nums drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                {count}
              </p>
            </div>
          </div>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {wailistData.map((user) => (
            <div
              key={user._id}
              className="group relative bg-[#0C0C0E]/80 border border-white/[0.06] hover:border-indigo-500/40 rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_15px_40px_-15px_rgba(99,102,241,0.2)] hover:-translate-y-1.5 flex flex-col h-full backdrop-blur-md overflow-hidden"
            >
              {/* Subtle hover gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* User Identity Header */}
              <div className="relative z-10 flex items-start gap-4 mb-6">
                {/* Premium Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(99,102,241,0.4)] shrink-0 ring-2 ring-indigo-500/20 ring-offset-2 ring-offset-[#0C0C0E] transition-all group-hover:ring-indigo-500/50">
                  {getInitials ? getInitials(user.name) : <User size={16} />}
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="text-base font-bold text-zinc-100 truncate group-hover:text-white transition-colors">
                    {user.name || "Not Provided"}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-zinc-500 mt-1 truncate">
                    <Mail size={12} className="shrink-0 text-indigo-400/70" />
                    <a href={`mailto:${user.email}`} className="truncate hover:text-indigo-300 transition-colors">
                      {user.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Feedback Section (Quote Style) */}
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  <MessageSquare size={12} className="text-zinc-600" />
                  Feedback
                </div>

                <div className="relative flex-1 bg-gradient-to-r from-zinc-800/30 to-zinc-900/10 p-5 rounded-2xl border border-white/5 border-l-2 border-l-indigo-500/50 group-hover:border-l-indigo-400 transition-colors">
                  <Quote size={16} className="absolute top-4 left-4 text-white/5 group-hover:text-indigo-500/10 transition-colors" />
                  <p className="relative text-sm text-zinc-300 leading-relaxed font-medium">
                    {user.feedback || "No feedback provided by the user."}
                  </p>
                </div>
              </div>

              {/* Timestamp Footer */}
              <div className="relative z-10 mt-6 flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-xs font-medium text-zinc-600 uppercase tracking-wider">
                  Joined
                </span>
                <span className="text-xs font-mono font-medium text-zinc-400 bg-white/5 px-2 py-1 rounded-md">
                  {user.createdAt ? user.createdAt.slice(0, 10) : "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {wailistData.length === 0 && (
          <div className="text-center py-24 bg-gradient-to-b from-zinc-900/30 to-zinc-900/10 border border-white/5 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay"></div>
            <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-white/10 shadow-2xl">
              <User size={32} className="text-zinc-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">No waitlist data yet</h3>
            <p className="text-zinc-500 max-w-sm mx-auto text-sm leading-relaxed">
              When users discover your pitch and sign up, their information and feedback will appear right here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistDataView;