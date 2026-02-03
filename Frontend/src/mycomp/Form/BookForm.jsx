import React from "react"
import { X } from "lucide-react"
import { Send, User, BookOpen, Hash, FileText, Sparkles } from 'lucide-react';
const BookForm = ({ title, slug, data, setTitle, setSlug, setData, handleSubmit }) => {

    const updateField = (field, value) => {
        setData({ [field]: value })
    }

    const updateCharacter = (field, value) => {
        setData({
            character: {
                ...(data.character || {}),
                [field]: value
            }
        })
    }



    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center p-4">

            {/* CARD CONTAINER */}
            <div className="w-full max-w-2xl bg-[#121212] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden relative">

                {/* DECORATIVE TOP GRADIENT */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600"></div>

                <div className="p-8 space-y-8">

                    {/* HEADER */}
                    <div className="text-center space-y-2 mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Project Details</h2>
                        <p className="text-sm text-gray-500">Configure the metadata for your Press-Flix page.</p>
                    </div>

                    <div className="space-y-6">

                        {/* ROW 1: TITLE & SLUG */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* TITLE */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-red-500 transition-colors">
                                    <BookOpen size={14} /> Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Echoes of Silica"
                                    className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600"
                                />
                            </div>

                            {/* SLUG */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">
                                    <Hash size={14} /> Slug
                                </label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="echoes-of-silica"
                                    className="w-full bg-[#1a1a1a] border border-[#333] text-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 font-mono text-sm"
                                />
                            </div>
                        </div>

                        {/* AUTHOR */}
                        <div className="group">
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-purple-500 transition-colors">
                                <User size={14} /> Author
                            </label>
                            <input
                                type="text"
                                value={data.author || ""}
                                onChange={(e) => updateField("author", e.target.value)}
                                placeholder="J.D. Kincaid"
                                className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-600"
                            />
                        </div>

                        {/* SYNOPSIS */}
                        <div className="group">
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-green-500 transition-colors">
                                <FileText size={14} /> Synopsis
                            </label>
                            <textarea
                                rows={4}
                                value={data.synopsis || ""}
                                onChange={(e) => updateField("synopsis", e.target.value)}
                                placeholder="In the glass city of Aero, shadows have a mind of their own..."
                                className="w-full bg-[#1a1a1a] border border-[#333] text-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-600 resize-none"
                            />
                        </div>

                        {/* CHARACTER SECTION */}
                        <div className="bg-[#1a1a1a]/50 border border-[#333] p-5 rounded-xl space-y-4">
                            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <Sparkles size={16} className="text-yellow-500" />
                                <span>Key Character</span>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <input
                                    placeholder="Name"
                                    value={data.character?.name || ""}
                                    onChange={(e) => updateCharacter("name", e.target.value)}
                                    className="bg-[#121212] border border-[#333] text-sm px-3 py-2 rounded focus:border-yellow-500 focus:outline-none text-white placeholder:text-gray-600"
                                />
                                <input
                                    placeholder="Role (e.g. Hero)"
                                    value={data.character?.role || ""}
                                    onChange={(e) => updateCharacter("role", e.target.value)}
                                    className="bg-[#121212] border border-[#333] text-sm px-3 py-2 rounded focus:border-yellow-500 focus:outline-none text-white placeholder:text-gray-600"
                                />
                                <input
                                    placeholder="Trait (e.g. Stoic)"
                                    value={data.character?.trait || ""}
                                    onChange={(e) => updateCharacter("trait", e.target.value)}
                                    className="bg-[#121212] border border-[#333] text-sm px-3 py-2 rounded focus:border-yellow-500 focus:outline-none text-white placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-4">
                        <button
                            onClick={handleSubmit}
                            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-red-900/20"
                        >
                            <span>Generate Page</span>
                            <Send size={18} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BookForm
