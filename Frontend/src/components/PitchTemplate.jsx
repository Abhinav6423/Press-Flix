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
        <div className="min-h-screen bg-[#F4EDE7] text-[#1A1A1A] font-sans">

            {/* ---------- NAV / HERO WRAPPER ---------- */}
            <div className="max-w-6xl mx-auto px-6 pt-16 pb-20">

                {/* ---------- HERO ---------- */}
                <header className="bg-white rounded-3xl shadow-xl border border-[#E8E3DD] p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div>

                        <div className="inline-flex items-center px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold mb-6">
                            Early Access
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            {pitch?.title}
                        </h1>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            {data.pitchLine}
                        </p>

                        <div className="flex gap-4 flex-wrap">
                            <button
                                onClick={scrollToValidation}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition"
                            >
                                Get Early Access
                            </button>

                            <button
                                className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
                            >
                                Learn More
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 mt-5">
                            Join early testers helping shape this product
                        </p>

                    </div>


                    {/* RIGHT IMAGE */}
                    {data.coverImage && (
                        <div className="rounded-2xl overflow-hidden border border-gray-200">
                            <img
                                src={data.coverImage}
                                alt="product preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </header>


                {/* ---------- SOCIAL PROOF STYLE BLOCK ---------- */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-[#2B2118] text-white rounded-2xl p-6">
                        <p className="text-3xl font-bold">Early</p>
                        <p className="text-sm opacity-70 mt-1">
                            Builders joining the waitlist
                        </p>
                    </div>

                    <div className="bg-white border border-[#E8E3DD] rounded-2xl p-6">
                        <p className="text-3xl font-bold text-orange-500">User</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Feedback shapes roadmap
                        </p>
                    </div>

                    <div className="bg-orange-500 text-white rounded-2xl p-6">
                        <p className="text-3xl font-bold">First</p>
                        <p className="text-sm opacity-80 mt-1">
                            Access for early adopters
                        </p>
                    </div>

                </div>

            </div>



            {/* ---------- MAIN CONTENT ---------- */}
            <main className="max-w-6xl mx-auto px-6 space-y-8 pb-24">

                {/* Problem / Solution */}
                <div className="grid md:grid-cols-2 gap-8">

                    <section className="bg-white border border-[#E8E3DD] rounded-3xl p-10 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">
                            The Problem
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            {data.problem}
                        </p>
                    </section>

                    <section className="bg-white border border-[#E8E3DD] rounded-3xl p-10 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">
                            The Solution
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            {data.solution}
                        </p>
                    </section>

                </div>


                {/* Audience / Value */}
                <div className="grid md:grid-cols-2 gap-8">

                    <section className="bg-white border border-[#E8E3DD] rounded-3xl p-8">
                        <h3 className="text-lg font-semibold mb-2">
                            Who This Is For
                        </h3>

                        <p className="text-gray-600 text-sm">
                            {data.audience}
                        </p>
                    </section>

                    <section className="bg-white border border-[#E8E3DD] rounded-3xl p-8">
                        <h3 className="text-lg font-semibold mb-2">
                            Why This Matters
                        </h3>

                        <p className="text-gray-600 text-sm">
                            {data.valueProp}
                        </p>
                    </section>

                </div>



                {/* HOW IT WORKS */}
                <section className="bg-white border border-[#E8E3DD] rounded-3xl p-12">

                    <h2 className="text-2xl font-bold text-center mb-10">
                        How it works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10 text-center">

                        <div>
                            <div className="w-10 h-10 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold mb-4">
                                1
                            </div>

                            <p className="text-gray-600 text-sm">
                                Join the early waitlist and share your feedback.
                            </p>
                        </div>

                        <div>
                            <div className="w-10 h-10 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold mb-4">
                                2
                            </div>

                            <p className="text-gray-600 text-sm">
                                We build the MVP based on real user demand.
                            </p>
                        </div>

                        <div>
                            <div className="w-10 h-10 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold mb-4">
                                3
                            </div>

                            <p className="text-gray-600 text-sm">
                                Early users get first access and perks.
                            </p>
                        </div>

                    </div>

                </section>



                {/* ---------- CONVERSION FORM ---------- */}
                <section id="validation-section">

                    <div className="bg-white border border-[#E8E3DD] rounded-3xl p-10 max-w-2xl mx-auto shadow-sm">

                        <div className="text-center mb-8">

                            <h2 className="text-3xl font-bold mb-3">
                                Get early access
                            </h2>

                            <p className="text-gray-500 text-sm">
                                Limited early testers are being onboarded
                            </p>

                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                            />

                            <input
                                type="text"
                                name="name"
                                placeholder="Your name (optional)"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                            />

                            <textarea
                                name="feedback"
                                placeholder="What feature would make this a no-brainer?"
                                value={formData.feedback}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                            />

                            <button
                                disabled={submitting}
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition"
                            >
                                {submitting ? "Submitting..." : "Get Early Access"}
                            </button>

                            <p className="text-center text-xs text-gray-500">
                                No spam. Just early access updates.
                            </p>

                        </form>

                    </div>

                </section>

            </main>


            {/* ---------- FOOTER ---------- */}
            <footer className="border-t border-[#E8E3DD] py-8 text-center text-xs text-gray-500">
                This is an idea validation page, not a finished product.
            </footer>

        </div>
    )
};

export default PitchTemplate;