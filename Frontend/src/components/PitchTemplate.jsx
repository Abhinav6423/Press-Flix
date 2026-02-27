import React, { useEffect, useState } from "react";
import {
    Target,
    Lightbulb,
    Users,
    TrendingUp,
    CheckCircle2,
    Shield,
    ArrowRight,
} from "lucide-react";
import { getPitchBySlugApi } from "../api-calls/pitchUrlOpen.js";
import { useParams } from "react-router-dom";
import { trackCtaClick } from "../api-calls/trackCtaClick.js";
import { submitWaitListForm } from "../api-calls/waitListSubmitForm.js";
import { toast } from "react-hot-toast";
import Loader from "../mycomp/Loader.jsx";
import { trackUniqueVisitors } from "../api-calls/trackUniqueVisitors.js";
const PitchTemplate = () => {
    const { slug } = useParams();

    const [pitch, setPitch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hasTracked = React.useRef(false);


    const [formData, setFormData] = useState({
        email: "",
        name: "",
        feedback: "",
    });

    const [submitting, setSubmitting] = useState(false);

    // ================= FETCH PITCH =================
    useEffect(() => {
        let isMounted = true;

        const fetchPitch = async (retry = 0) => {
            try {
                setLoading(true);
                setError(null);

                const res = await getPitchBySlugApi(slug);

                if (!isMounted) return;

                if (res?.success) {
                    setPitch(res.data);
                } else {
                    throw new Error("Pitch not found");
                }
            } catch (err) {
                // Retry once (handles cold DB / slow wake)
                if (retry < 1) return fetchPitch(retry + 1);

                if (isMounted) {
                    setError("Unable to load this page. Please try again.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (slug) fetchPitch();

        return () => {
            isMounted = false;
        };
    }, [slug]);


    // ================= TRACK VISITOR =================
    useEffect(() => {
        if (pitch?._id && !hasTracked.current) {
            trackUniqueVisitors(pitch._id);
            hasTracked.current = true;
        }
    }, [pitch?._id]);

    // ================= CTA TRACK =================


    // ================= FORM =================
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pitch?._id) return;

        try {
            setSubmitting(true);

            const res = await submitWaitListForm(formData, pitch._id);

            if (res?.success) {
                toast.success("You're on the waitlist 🎉");
                setFormData({ email: "", name: "", feedback: "" });
            } else {
                throw new Error(res?.message || "Submission failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Submission failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const scrollToValidation = () => {
        handleCtaClick();
        const el = document.getElementById("validation-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const data = pitch?.data || {};

    // ================= UI STATES =================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-red-400">
                {error}
            </div>
        );
    }

    // ================= UI =================
    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 font-sans">
            {/* HERO */}
            <header className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-8">
                    <Shield size={14} />
                    Early Access Validation
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 mb-6">
                    {pitch?.title}
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10">
                    {data.pitchLine}
                </p>

                <button
                    onClick={scrollToValidation}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition"
                >
                    Join the Waitlist
                </button>

                {data.coverImage && (
                    <div className="max-w-4xl mx-auto mt-12 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                        <img
                            src={data.coverImage}
                            alt="Concept"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </header>

            {/* MAIN */}
            <main className="max-w-4xl mx-auto px-6 space-y-16 pb-24">
                {/* Problem & Solution */}
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                        <Target className="text-rose-400 mb-4" />
                        <h2 className="text-2xl font-bold text-slate-100 mb-3">
                            The Problem
                        </h2>
                        <p>{data.problem}</p>
                    </section>

                    <section className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                        <Lightbulb className="text-indigo-400 mb-4" />
                        <h2 className="text-2xl font-bold text-slate-100 mb-3">
                            The Solution
                        </h2>
                        <p>{data.solution}</p>
                    </section>
                </div>

                {/* Audience & Value */}
                <div className="grid md:grid-cols-2 gap-8">
                    <section>
                        <Users className="text-indigo-400 mb-3" />
                        <h3 className="text-lg font-bold text-slate-100 mb-2">
                            Who This Is For
                        </h3>
                        <p>{data.audience}</p>
                    </section>

                    <section>
                        <TrendingUp className="text-indigo-400 mb-3" />
                        <h3 className="text-lg font-bold text-slate-100 mb-2">
                            Why This Matters
                        </h3>
                        <p>{data.valueProp}</p>
                    </section>
                </div>

                {/* FORM */}
                <section id="validation-section">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">
                            Join the Early Access List
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3"
                            />

                            <input
                                type="text"
                                name="name"
                                placeholder="Name (optional)"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3"
                            />

                            <textarea
                                name="feedback"
                                placeholder="Suggestion (optional)"
                                value={formData.feedback}
                                onChange={handleInputChange}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3"
                            />

                            <button
                                disabled={submitting}
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-60"
                            >
                                <CheckCircle2 size={18} />
                                {submitting ? "Submitting..." : "Join Waitlist"}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
                Idea validation page — not a finished product.
            </footer>
        </div>
    );
};

export default PitchTemplate;