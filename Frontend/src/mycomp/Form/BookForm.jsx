import React from "react";
import { Send } from "lucide-react";

const BookForm = ({
    title,
    slug,
    data,
    setTitle,
    setSlug,
    setData,
    handleSubmit,
    loading,
}) => {
    const updateField = (field, value) => {
        setData({ [field]: value });
    };

    const updateCharacter = (field, value) => {
        setData({
            character: {
                ...(data.character || {}),
                [field]: value,
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#0b0b0c] text-gray-100 flex flex-col">

            {/* HEADER SECTION */}
            <div className="relative w-full z-50">

                {/* 1. Glass Background & Border */}
                <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 z-0"></div>

                {/* 2. Cinematic Top Glow (The "Netflix/Brand" Accent) */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent z-10"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent blur-[2px] z-10"></div>

                {/* 3. Main Content */}
                <div className="relative z-10 w-full px-6 py-6 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                    {/* Left: Title & Breadcrumbs */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                            <span>Press-Flix</span>
                            <span className="text-zinc-700">/</span>
                            <span className="text-red-500">Studio</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight drop-shadow-sm">
                            Pitch Deck Constructor
                        </h2>
                        <p className="text-xs text-zinc-400 font-medium tracking-wide">
                            Crafting a high-conversion landing page for publishers.
                        </p>
                    </div>

                    {/* Right: Status Indicator (Pill Badge) */}
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-1.5 rounded-full bg-zinc-900/50 border border-white/5 flex items-center gap-3 shadow-inner">

                            {/* Live Dot */}
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>

                            <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-[0.15em]">
                                Builder Mode
                            </span>
                        </div>
                    </div>

                </div>
            </div>


            {/* MAIN LANDSCAPE WORKSPACE */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto">

                {/* LEFT COLUMN */}
                <div className="space-y-6">

                    {/* BOOK IDENTITY */}
                    <Section title="Book Identity">
                        <Input value={title} onChange={(v) => setTitle(v)} placeholder="Book Title" />
                        <Input value={slug} onChange={(v) => setSlug(v)} placeholder="slug" mono />
                        <Input value={data.author} onChange={(v) => updateField("author", v)} placeholder="Author Name" />
                        <Input value={data.genre} onChange={(v) => updateField("genre", v)} placeholder="Genre" />
                        <Input value={data.hook} onChange={(v) => updateField("hook", v)} placeholder="Hook (1-line emotional pitch)" />
                        <Input value={data.status} onChange={(v) => updateField("status", v)} placeholder="Status (Draft / Published / Seeking Publisher)" />
                    </Section>

                    {/* STORY */}
                    <Section title="Story">
                        <Textarea value={data.synopsis} onChange={(v) => updateField("synopsis", v)} placeholder="Short Synopsis" />
                        <Textarea value={data.theme} onChange={(v) => updateField("theme", v)} placeholder="Core Theme" />
                        <Textarea value={data.world} onChange={(v) => updateField("world", v)} placeholder="World / Setting" />
                        <Input value={data.tone} onChange={(v) => updateField("tone", v)} placeholder="Tone (Dark, Emotional, Inspirational)" />
                    </Section>

                    {/* CHARACTER */}
                    <Section title="Main Character">
                        <Input value={data.character?.name} onChange={(v) => updateCharacter("name", v)} placeholder="Name" />
                        <Input value={data.character?.role} onChange={(v) => updateCharacter("role", v)} placeholder="Role" />
                        <Input value={data.character?.trait} onChange={(v) => updateCharacter("trait", v)} placeholder="Trait" />
                        <Input value={data.character?.goal} onChange={(v) => updateCharacter("goal", v)} placeholder="Goal" />
                        <Input value={data.character?.conflict} onChange={(v) => updateCharacter("conflict", v)} placeholder="Conflict / Fear" />
                    </Section>

                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">

                    {/* MARKET */}
                    <Section title="Market Fit">
                        <Input value={data.audience} onChange={(v) => updateField("audience", v)} placeholder="Target Audience" />
                        <Input value={data.comps} onChange={(v) => updateField("comps", v)} placeholder="Comparable Books / Movies" />
                        <Textarea value={data.usp} onChange={(v) => updateField("usp", v)} placeholder="Unique Selling Point" />
                    </Section>

                    {/* AUTHOR AUTHORITY */}
                    <Section title="Author Authority">
                        <Textarea value={data.authorBio} onChange={(v) => updateField("authorBio", v)} placeholder="Author Bio" />
                        <Input value={data.credibility} onChange={(v) => updateField("credibility", v)} placeholder="Awards / Credentials / Authority" />
                    </Section>

                    {/* CONVERSION */}
                    <Section title="Conversion">
                        <Input value={data.ctaLabel} onChange={(v) => updateField("ctaLabel", v)} placeholder="CTA Label (Buy / Request Manuscript)" />
                        <Input value={data.contactEmail} onChange={(v) => updateField("contactEmail", v)} placeholder="Contact Email" />
                        <Input value={data.coverUrl} onChange={(v) => updateField("coverUrl", v)} placeholder="Cover Image URL" />
                    </Section>

                    {/* SUBMIT */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold tracking-wide bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-red-600/30 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Creating..." : "Generate Landing Pitch"}
                    </button>

                </div>

            </div>
        </div>
    );
};

/* ---------- UI HELPERS ---------- */

const Section = ({ title, children }) => (
    <div className="space-y-3 border border-[#2a2a2a] p-4 rounded-lg bg-[#0f0f10]">
        <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium">
            {title}
        </h3>
        {children}
    </div>
);

const Input = ({ value = "", onChange, placeholder, mono = false }) => (
    <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-[#18181a] border border-[#2f2f31] px-3 py-2 rounded-md text-sm outline-none transition-all duration-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/40 ${mono ? "font-mono text-xs" : ""
            }`}
    />
);

const Textarea = ({ value = "", onChange, placeholder }) => (
    <textarea
        rows={3}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#18181a] border border-[#2f2f31] px-3 py-2 rounded-md text-sm outline-none transition-all duration-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/40 resize-none"
    />
);

export default BookForm;
