import React from "react";
import { Plus, X, Send, Hash, Cpu } from "lucide-react";

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

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-[#121212] border border-[#2a2a2a] rounded-2xl shadow-2xl p-8 space-y-6">

                <h2 className="text-xl font-semibold text-center">Tech Pitch</h2>

                {/* TITLE + SLUG */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Product Name"
                        className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded"
                    />

                    <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="slug"
                        className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded font-mono text-sm"
                    />
                </div>

                {/* TAGLINE */}
                <input
                    value={data.tagline || ""}
                    onChange={(e) => updateField("tagline", e.target.value)}
                    placeholder="Tagline"
                    className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded"
                />

                {/* DESCRIPTION */}
                <textarea
                    rows={4}
                    value={data.description || ""}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Product Description"
                    className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded"
                />

                {/* STAGE */}
                <input
                    value={data.stage || ""}
                    onChange={(e) => updateField("stage", e.target.value)}
                    placeholder="Current Stage"
                    className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded"
                />

                {/* SPECIFICATIONS */}
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Technical Specs</label>

                    {specs.map((spec, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                value={spec.label}
                                onChange={(e) => updateSpec(i, "label", e.target.value)}
                                placeholder="Label"
                                className="bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded w-1/2"
                            />
                            <input
                                value={spec.value}
                                onChange={(e) => updateSpec(i, "value", e.target.value)}
                                placeholder="Value"
                                className="bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded w-1/2"
                            />
                            <button onClick={() => removeSpec(i)} className="text-red-500">
                                <X size={16} />
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSpec}
                        className="flex items-center gap-1 text-sm text-blue-500"
                    >
                        <Plus size={14} /> Add Spec
                    </button>
                </div>

                {/* ROADMAP */}
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Roadmap</label>

                    {roadmap.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                value={item.phase}
                                onChange={(e) => updateRoadmap(i, "phase", e.target.value)}
                                placeholder="Phase"
                                className="bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded w-1/3"
                            />
                            <input
                                value={item.task}
                                onChange={(e) => updateRoadmap(i, "task", e.target.value)}
                                placeholder="Task"
                                className="bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded w-1/3"
                            />
                            <input
                                value={item.status}
                                onChange={(e) => updateRoadmap(i, "status", e.target.value)}
                                placeholder="Status"
                                className="bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded w-1/3"
                            />
                            <button onClick={() => removeRoadmap(i)} className="text-red-500">
                                <X size={16} />
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addRoadmap}
                        className="flex items-center gap-1 text-sm text-blue-500"
                    >
                        <Plus size={14} /> Add Roadmap
                    </button>
                </div>

                {/* LINKS */}
                <input
                    value={data.demoLink || ""}
                    onChange={(e) => updateField("demoLink", e.target.value)}
                    placeholder="Demo / Prototype Link"
                    className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded"
                />

                <input
                    value={data.pitchDeck || ""}
                    onChange={(e) => updateField("pitchDeck", e.target.value)}
                    placeholder="Pitch Deck Link"
                    className="bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded"
                />

                {/* SUBMIT */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {loading ? "Creating..." : "Generate Pitch"}
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default TechForm;
