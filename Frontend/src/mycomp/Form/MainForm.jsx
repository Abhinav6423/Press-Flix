import React, { useEffect, useState } from "react";
import { createPitchApi } from "../../api-calls/createPitch.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const MainForm = () => {
  const [title, setTitle] = useState("");
  const [pitchLine, setPitchLine] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [audience, setAudience] = useState("");
  const [valueProp, setValueProp] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // 🔹 Safe slug generator
  const generateSlug = (value = "") => {
    const newSlug = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    setSlug(newSlug);
  };

  // 🔹 Auto generate slug from title (only if slug empty)
  useEffect(() => {
    generateSlug(title);
  }, [title]);

  // 🔹 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !pitchLine || !problem || !solution) {
      toast.error("Please fill required fields");
      return;
    }

    
    const pitchData = {
      title,
      slug,
      data: {
        pitchLine,
        problem,
        solution,
        audience,
        valueProp,
        coverImage,
      },
    };

    try {
      setIsSubmitting(true);
      const res = await createPitchApi(pitchData);
      if (res.success) {
        toast.success("Pitch created successfully 🚀");
        navigate(`/pitch-ready/${slug}`);
      } else {
        toast.error(res.message || "Failed to create pitch");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally{
      setIsSubmitting(false);
    }
  };

  // 🔹 Reusable Input Style
  const inputBaseStyle = "w-full bg-[#0A0A0A] border border-zinc-800/60 rounded-xl px-4 py-3.5 focus:bg-[#111111] focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all placeholder:text-zinc-600 text-zinc-100";
  const labelStyle = "text-sm font-medium text-zinc-300 ml-1";

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center py-12 px-6 lg:p-12 relative overflow-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-100">

      {/* 🔹 Reference Image Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Deep, wide vibrant mint sweep */}
        <div className="absolute -bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-emerald-400/20 rounded-full blur-[140px] md:blur-[180px]"></div>
        {/* Brighter cyan/mint core closer to the corner */}
        <div className="absolute -bottom-[10%] -right-[5%] w-[400px] h-[400px] bg-[#34d399]/30 rounded-full blur-[100px] md:blur-[140px]"></div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">

        {/* LEFT COLUMN: Form */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* 🔹 Back Navigate Button */}
          <button 
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors mb-8 w-fit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-medium text-emerald-50 mb-3 tracking-tight">
              Structure your pitch
            </h1>
            <p className="text-zinc-500 text-lg">
              Flesh out your concept, outline your audience, and get ready to launch.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Row 1: Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelStyle}>Idea Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Press-Flix"
                  className={inputBaseStyle}
                />
              </div>
              <div className="space-y-2">
                <label className={labelStyle}>URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => generateSlug(e.target.value)} // Manual override logic kept
                  placeholder="press-flix"
                  className={`${inputBaseStyle} font-mono text-sm text-emerald-400/90`}
                />
              </div>
            </div>

            {/* Pitch Line */}
            <div className="space-y-2">
              <label className={labelStyle}>One-line Pitch</label>
              <input
                type="text"
                value={pitchLine}
                onChange={(e) => setPitchLine(e.target.value)}
                placeholder="A brief, compelling summary of your idea..."
                className={inputBaseStyle}
              />
            </div>

            {/* Row 2: Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelStyle}>The Problem</label>
                <textarea
                  rows="4"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="What specific pain point are you solving?"
                  className={`${inputBaseStyle} resize-none`}
                />
              </div>
              <div className="space-y-2">
                <label className={labelStyle}>The Solution</label>
                <textarea
                  rows="4"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="How does your product fix this issue?"
                  className={`${inputBaseStyle} resize-none`}
                />
              </div>
            </div>

            {/* Row 3: Audience & Value Prop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelStyle}>Target Audience</label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Who is this for?"
                  className={inputBaseStyle}
                />
              </div>
              <div className="space-y-2">
                <label className={labelStyle}>Value Proposition</label>
                <textarea
                  rows="1"
                  value={valueProp}
                  onChange={(e) => setValueProp(e.target.value)}
                  placeholder="Why choose you?"
                  className={`${inputBaseStyle} resize-none`}
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <label className={labelStyle}>Cover Image URL</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={`${inputBaseStyle} font-mono text-sm`}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="cursor-pointer group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-zinc-200  w-full"
              >
                <span className="mr-2">{isSubmitting ? "Generating Your Pitch..." : "Generate Your Pitch"}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN: Info Card */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-start pt-20">
          <div className="sticky top-12 w-full bg-[#0A0A0A]/80 backdrop-blur-md border border-zinc-800/80 rounded-3xl p-10 shadow-2xl relative overflow-hidden">

            <div className="relative z-10">
              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 border border-zinc-800 shadow-inner">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>

              <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">
                Conversion focused.
              </h3>

              <p className="text-zinc-400 leading-relaxed mb-8">
                The goal of this page is not decoration, but clear communication. Keep your wording simple, grounded, and focused on the user's pain point.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Clarity over cleverness</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Focus on the "Why"</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Build trust instantly</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MainForm;