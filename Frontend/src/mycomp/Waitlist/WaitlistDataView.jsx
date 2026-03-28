import React from "react";
import {
  ArrowLeft, ExternalLink, Mail, MessageSquare,
  User, Quote, Sparkles
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { viewWaitlistData } from "../../api-calls/viewWaitlistData";
import { getPublicPitch } from "../../api-calls/pitchUrlOpen.js";
import Loader from "../Loader.jsx";
const WaitlistDataView = () => {
  const { slug } = useParams();

  /* ================= TANSTACK QUERIES ================= */

  const { data: pitchDetails, isLoading: pitchLoading } = useQuery({
    queryKey: ["pitchDetails", slug],
    queryFn: async () => {
      const res = await getPublicPitch(slug);
      return res?.success ? res.data : null;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 min cache
    refetchOnWindowFocus: false,
  });

  const {
    data: waitlistData = [],
    isLoading: waitlistLoading,
  } = useQuery({
    queryKey: ["waitlistData", slug],
    queryFn: async () => {
      const res = await viewWaitlistData(slug);
      return res?.success ? res.data : [];
    },
    enabled: !!slug,
    staleTime: 1000 * 30, // 30 sec
    refetchOnWindowFocus: false,
  });

  /* ================= HELPERS ================= */

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  /* ================= LOADING ================= */

  if (pitchLoading || waitlistLoading) return <Loader />;

  const title = pitchDetails?.title || "Project Not Found";
  const count = waitlistData.length;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">

          <button
            onClick={() => window.history.back()}
            className="mb-8 px-4 py-2 rounded-full bg-white/5 text-sm text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={16} className="inline mr-2" />
            Back to Dashboard
          </button>

          <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-8 flex justify-between items-end">

            <div>
              <div className="text-xs text-indigo-400 uppercase mb-3">
                Waitlist Data
              </div>

              <h1 className="text-4xl font-bold text-white mb-2">
                {title}
              </h1>

              <a
                href={`${window.location.origin}/#/p/${slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-zinc-400 hover:text-indigo-400"
              >
                {window.location.origin}/#/p/{slug}
                <ExternalLink size={14} className="inline ml-1" />
              </a>
            </div>

            <div className="text-right">
              <p className="text-xs text-zinc-500 uppercase mb-1">
                Total Waitlisted
              </p>
              <p className="text-5xl font-bold text-indigo-400">
                {count}
              </p>
            </div>

          </div>
        </div>

        {/* WAITLIST CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {waitlistData.map((user) => (
            <div
              key={user._id}
              className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 flex flex-col"
            >

              {/* USER HEADER */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                  {getInitials(user.name)}
                </div>

                <div>
                  <p className="font-semibold text-white">
                    {user.name || "Not Provided"}
                  </p>

                  <p className="text-sm text-zinc-400 flex items-center gap-1">
                    <Mail size={12} />
                    {user.email}
                  </p>
                </div>
              </div>

              {/* FEEDBACK */}
              <div className="flex-1 mb-5">
                <p className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                  <MessageSquare size={12} />
                  Feedback
                </p>

                <div className="bg-zinc-800/40 p-4 rounded-xl border border-white/5 text-sm text-zinc-300">
                  <Quote size={14} className="inline mr-2 text-zinc-600" />
                  {user.feedback || "No feedback provided"}
                </div>
              </div>

              {/* DATE */}
              <div className="text-xs text-zinc-500 flex justify-between border-t border-white/5 pt-3">
                <span>Joined</span>
                <span className="text-zinc-400">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

            </div>
          ))}

        </div>

        {/* EMPTY STATE */}
        {waitlistData.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No waitlist data yet
          </div>
        )}

      </div>
    </div>
  );
};

export default WaitlistDataView;