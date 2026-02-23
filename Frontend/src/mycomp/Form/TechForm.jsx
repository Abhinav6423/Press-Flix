import React from "react";
import { Plus, X, Send } from "lucide-react";

const TechForm = ({
    title,
    slug,
    data,
    setTitle,
    setSlug,
    setData,
    handleSubmit,
    loading,
}) => {
    const specs = data.specs || [];
    const roadmap = data.roadmap || [];
    const features = data.features || [];

    const updateField = (field, value) => {
        setData({ [field]: value });
    };

    /* ---------------- SPECIFICATIONS ---------------- */

    const addSpec = () => {
        setData({ specs: [...specs, { label: "", value: "" }] });
    };

    const updateSpec = (index, field, value) => {
        const updated = [...specs];
        updated[index][field] = value;
        setData({ specs: updated });
    };

    const removeSpec = (index) => {
        setData({ specs: specs.filter((_, i) => i !== index) });
    };

    /* ---------------- ROADMAP ---------------- */

    const addRoadmap = () => {
        setData({
            roadmap: [...roadmap, { phase: "", task: "", status: "" }],
        });
    };

    const updateRoadmap = (index, field, value) => {
        const updated = [...roadmap];
        updated[index][field] = value;
        setData({ roadmap: updated });
    };

    const removeRoadmap = (index) => {
        setData({ roadmap: roadmap.filter((_, i) => i !== index) });
    };

    /* ---------------- FEATURES ---------------- */

    const addFeature = () => {
        setData({ features: [...features, ""] });
    };

    const updateFeature = (index, value) => {
        const updated = [...features];
        updated[index] = value;
        setData({ features: updated });
    };

    const removeFeature = (index) => {
        setData({ features: features.filter((_, i) => i !== index) });
    };

    return (
        <div className="min-h-screen max-w-screen bg-[#0b0b0c] text-gray-100 flex flex-col">

            {/* HEADER */}
            <div className="px-6 py-6 border-b border-white/5 bg-[#050505]/80 backdrop-blur">
                <h2 className="text-2xl font-semibold">Tech Pitch Builder</h2>
                <p className="text-xs text-zinc-400">Create structured product landing pitch</p>
            </div>

            {/* WORKSPACE */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto">

                {/* LEFT COLUMN */}
                <div className="space-y-6">

                    {/* PRODUCT IDENTITY */}
                    <Section title="Product Identity">
                        <Input value={title} onChange={setTitle} placeholder="Product Name" />
                        <Input value={slug} onChange={setSlug} placeholder="Slug" mono />
                        <Input value={data.tagline} onChange={(v) => updateField("tagline", v)} placeholder="Tagline" />
                        <Textarea value={data.description} onChange={(v) => updateField("description", v)} placeholder="Description" />
                        <Input value={data.stage} onChange={(v) => updateField("stage", v)} placeholder="Current Stage" />
                        <Input value={data.productImage} onChange={(v) => updateField("productImage", v)} placeholder="Product Image URL" />
                    </Section>

                    {/* PROBLEM */}
                    <Section title="Problem">
                        <Input value={data.problemTitle} onChange={(v) => updateField("problemTitle", v)} placeholder="Problem Title" />
                        <Textarea value={data.problemDesc} onChange={(v) => updateField("problemDesc", v)} placeholder="Problem Description" />
                    </Section>

                    {/* FEATURES */}
                    <Section title="Key Features">
                        {features.map((f, i) => (
                            <div key={i} className="flex gap-2">
                                <Input
                                    value={f}
                                    onChange={(v) => updateFeature(i, v)}
                                    placeholder="Feature"
                                />
                                <button onClick={() => removeFeature(i)} className="text-red-500">
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                        <AddButton onClick={addFeature} label="Add Feature" />
                    </Section>

                    {/* SPECIFICATIONS */}
                    <Section title="Technical Specifications">
                        {specs.map((spec, i) => (
                            <div key={i} className="flex gap-2">
                                <Input
                                    value={spec.label}
                                    onChange={(v) => updateSpec(i, "label", v)}
                                    placeholder="Label"
                                />
                                <Input
                                    value={spec.value}
                                    onChange={(v) => updateSpec(i, "value", v)}
                                    placeholder="Value"
                                />
                                <button onClick={() => removeSpec(i)} className="text-red-500">
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                        <AddButton onClick={addSpec} label="Add Spec" />
                    </Section>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">

                    {/* ROADMAP */}
                    <Section title="Roadmap">
                        {roadmap.map((item, i) => (
                            <div key={i} className="flex gap-2">
                                <Input value={item.phase} onChange={(v) => updateRoadmap(i, "phase", v)} placeholder="Phase" />
                                <Input value={item.task} onChange={(v) => updateRoadmap(i, "task", v)} placeholder="Task" />
                                <Input value={item.status} onChange={(v) => updateRoadmap(i, "status", v)} placeholder="Status" />
                                <button onClick={() => removeRoadmap(i)} className="text-red-500">
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                        <AddButton onClick={addRoadmap} label="Add Roadmap" />
                    </Section>

                    {/* LINKS */}
                    <Section title="Links">
                        <Input value={data.demoLink} onChange={(v) => updateField("demoLink", v)} placeholder="Demo / Prototype Link" />
                        <Input value={data.pitchDeck} onChange={(v) => updateField("pitchDeck", v)} placeholder="Pitch Deck Link" />
                    </Section>

                    {/* SUBMIT */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Creating..." : "Generate Pitch"}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ---------- REUSABLE UI ---------- */

const Section = ({ title, children }) => (
    <div className="space-y-3 border border-[#2a2a2a] p-4 rounded-lg bg-[#0f0f10]">
        <h3 className="text-xs text-gray-400 uppercase tracking-wider">{title}</h3>
        {children}
    </div>
);

const Input = ({ value = "", onChange, placeholder, mono = false }) => (
    <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-[#18181a] border border-[#2f2f31] px-3 py-2 rounded-md text-sm outline-none focus:border-red-500 ${mono ? "font-mono text-xs" : ""}`}
    />
);

const Textarea = ({ value = "", onChange, placeholder }) => (
    <textarea
        rows={3}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#18181a] border border-[#2f2f31] px-3 py-2 rounded-md text-sm outline-none focus:border-red-500 resize-none"
    />
);

const AddButton = ({ onClick, label }) => (
    <button onClick={onClick} className="text-sm text-blue-500 flex items-center gap-1">
        <Plus size={14} /> {label}
    </button>
);

export default TechForm;
