import React from "react";
import { Plus, X } from "lucide-react";

const TechForm = () => {
    return (
        <div className="space-y-6">

            {/* BASIC INFO */}
            <div>
                <label className="block text-sm mb-1">Product Name</label>
                <input
                    type="text"
                    placeholder="NEXUS-1"
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Tagline</label>
                <input
                    type="text"
                    placeholder="The First Ambient Computing Node for Remote Teams"
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Product Description</label>
                <textarea
                    rows={4}
                    placeholder="Describe what the product does and why it exists..."
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Current Stage</label>
                <input
                    type="text"
                    placeholder="Prototyping Phase (TRL 6)"
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            {/* SPECIFICATIONS */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Technical Specifications</label>

                <div className="flex gap-2">
                    <input
                        placeholder="Label (e.g. Processor)"
                        className="border px-2 py-1 rounded w-1/2"
                    />
                    <input
                        placeholder="Value (e.g. Quad-Core ARM)"
                        className="border px-2 py-1 rounded w-1/2"
                    />
                    <button className="text-red-500">
                        <X size={16} />
                    </button>
                </div>

                <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-blue-600"
                >
                    <Plus size={14} /> Add Specification
                </button>
            </div>

            {/* ROADMAP */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Product Roadmap</label>

                <div className="flex gap-2">
                    <input
                        placeholder="Phase (e.g. Q2 2026)"
                        className="border px-2 py-1 rounded w-1/3"
                    />
                    <input
                        placeholder="Task (e.g. Functional Prototype)"
                        className="border px-2 py-1 rounded w-1/3"
                    />
                    <input
                        placeholder="Status (Complete / In Progress)"
                        className="border px-2 py-1 rounded w-1/3"
                    />
                    <button className="text-red-500">
                        <X size={16} />
                    </button>
                </div>

                <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-blue-600"
                >
                    <Plus size={14} /> Add Roadmap Item
                </button>
            </div>

            {/* CTA LINKS */}
            <div>
                <label className="block text-sm mb-1">Prototype / Demo Link</label>
                <input
                    type="url"
                    placeholder="https://..."
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Pitch Deck Link</label>
                <input
                    type="url"
                    placeholder="https://..."
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

        </div>
    );
};

export default TechForm;
