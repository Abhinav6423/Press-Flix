import React from "react";
import { Send, User, BookOpen, Hash, FileText, Sparkles, Target } from "lucide-react";

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
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-[#121212] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden relative">

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600"></div>

                <div className="p-8 space-y-8">

                    {/* HEADER */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Create Book Landing Pitch</h2>
                        <p className="text-sm text-gray-500">High-conversion pitch builder</p>
                    </div>

                    {/* TITLE + SLUG */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Book Title"
                            className="input"
                        />
                        <input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="slug"
                            className="input font-mono text-sm"
                        />
                    </div>

                    {/* IDENTITY */}
                    <Section title="Book Identity">
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

                    {/* MARKET */}
                    <Section title="Market Fit">
                        <Input value={data.audience} onChange={(v) => updateField("audience", v)} placeholder="Target Audience" />
                        <Input value={data.comps} onChange={(v) => updateField("comps", v)} placeholder="Comparable Books / Movies" />
                        <Textarea value={data.usp} onChange={(v) => updateField("usp", v)} placeholder="Unique Selling Point" />
                    </Section>

                    {/* AUTHORITY */}
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
                        className={`w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Creating..." : "Generate Landing Pitch"}
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ---------- SMALL UI HELPERS ---------- */

const Section = ({ title, children }) => (
    <div className="space-y-3 border border-[#2a2a2a] p-4 rounded-lg">
        <h3 className="text-sm text-gray-400 uppercase tracking-wider">{title}</h3>
        {children}
    </div>
);

const Input = ({ value = "", onChange, placeholder }) => (
    <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded"
    />
);

const Textarea = ({ value = "", onChange, placeholder }) => (
    <textarea
        rows={3}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded"
    />
);

export default BookForm;
