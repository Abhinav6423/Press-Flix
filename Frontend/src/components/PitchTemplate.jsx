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

    const scrollToProblemSolution = () => {
        const el = document.getElementById("problem-solution");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }

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
        <div className="relative min-h-screen bg-[#F4EDE7] text-[#1A1A1A] font-sans pb-24 md:pb-0">

            {/* ---------- NAV / HERO WRAPPER ---------- */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-16 pb-12">

                {/* ---------- HERO ---------- */}
                <header className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-[#E8E3DD] p-6 sm:p-10 md:p-14 grid md:grid-cols-2 gap-8 md:gap-10 items-center relative z-10">

                    {/* LEFT CONTENT */}
                    <div>
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] md:text-xs font-semibold mb-5 md:mb-6 uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
                            Early Access Phase
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 md:mb-6">
                            {pitch?.title}
                        </h1>

                        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                            {data.pitchLine}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 flex-wrap mb-6 md:mb-4">
                            <button
                                onClick={scrollToValidation}
                                className="w-full sm:w-auto px-6 py-3.5 md:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition"
                            >
                                Get Early Access
                            </button>

                            <button
                                onClick={scrollToProblemSolution}
                                className="w-full sm:w-auto px-6 py-3.5 md:py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition text-center"
                            >
                                Learn More
                            </button>
                        </div>

                        {/* UX Layout: Social Proof Count Near CTA */}
                        <div className="flex items-center justify-center sm:justify-start gap-3 mt-4 md:mt-2 bg-gray-50 sm:bg-transparent py-3 sm:py-0 rounded-xl sm:rounded-none">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                                <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                                <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">
                                <span className="text-gray-800 font-bold">37 builders</span> joined
                            </p>
                        </div>

                        {/* UX Layout: Scroll Indicator */}
                        <div className="hidden md:flex items-center gap-2 mt-8 text-gray-400 text-sm animate-bounce cursor-pointer w-fit" onClick={scrollToProblemSolution}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                            See how it works
                        </div>
                    </div>


                    {/* RIGHT IMAGE */}
                    {data.coverImage && (
                        <div className="rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 h-48 sm:h-64 md:h-full md:min-h-[300px]">
                            <img
                                src={data.coverImage}
                                alt="product preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </header>

                {/* ---------- SOCIAL PROOF STYLE BLOCK ---------- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                    <div className="bg-[#2B2118] text-white rounded-2xl p-5 md:p-6 text-center sm:text-left">
                        <p className="text-2xl md:text-3xl font-bold">Early</p>
                        <p className="text-xs md:text-sm opacity-70 mt-1">Builders joining the waitlist</p>
                    </div>

                    <div className="bg-white border border-[#E8E3DD] rounded-2xl p-5 md:p-6 text-center sm:text-left">
                        <p className="text-2xl md:text-3xl font-bold text-orange-500">User</p>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">Feedback shapes roadmap</p>
                    </div>

                    <div className="bg-orange-500 text-white rounded-2xl p-5 md:p-6 text-center sm:text-left">
                        <p className="text-2xl md:text-3xl font-bold">First</p>
                        <p className="text-xs md:text-sm opacity-80 mt-1">Access for early adopters</p>
                    </div>
                </div>

            </div>

            {/* ---------- MAIN CONTENT ---------- */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 md:space-y-12 pb-20 md:pb-24">

                {/* WAITLIST FORM */}
                <section id="validation-section" className="scroll-mt-24">
                    <div className="bg-white border border-[#E8E3DD] rounded-2xl md:rounded-3xl p-6 md:p-10 max-w-2xl mx-auto shadow-sm relative">

                        <div className="text-center mb-6 md:mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">Claim your early access</h2>
                            <p className="text-gray-500 text-xs md:text-sm">Limited early testers are being onboarded</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="relative">
                                <label className="text-[10px] md:text-xs font-bold text-gray-500 mb-1 block uppercase tracking-wider">Email (Required)</label>
                                <input
                                    id="email-input"
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="founder@startup.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                                />
                            </div>

                            <div className="relative">
                                <label className="text-[10px] md:text-xs font-bold text-gray-400 mb-1 block uppercase tracking-wider">Name (Optional)</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                                />
                            </div>

                            <div className="relative">
                                <label className="text-[10px] md:text-xs font-bold text-gray-400 mb-1 block uppercase tracking-wider">Feature Request (Optional)</label>
                                <textarea
                                    name="feedback"
                                    placeholder="What feature would make this a no-brainer?"
                                    value={formData.feedback}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:border-orange-500 focus:bg-white transition-colors resize-none"
                                />
                            </div>

                            <button
                                disabled={submitting}
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base md:text-lg py-3.5 md:py-4 rounded-xl transition shadow-md shadow-orange-500/20 mt-2"
                            >
                                {submitting ? "Submitting..." : "Get Early Access"}
                            </button>

                            <p className="text-center text-[10px] md:text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                No spam. Takes 5 seconds.
                            </p>
                        </form>
                    </div>
                </section>

                <div className="py-4 md:py-8 space-y-8 md:space-y-12">

                    {/* Problem / Solution */}
                    <section id="problem-solution" className="scroll-mt-24">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            <section className="bg-white border border-[#E8E3DD] rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm">
                                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">The Problem</h2>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {data.problem}
                                </p>
                            </section>

                            <section className="bg-white border border-[#E8E3DD] rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm">
                                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">The Solution</h2>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {data.solution}
                                </p>
                            </section>
                        </div>
                    </section>

                    {/* Audience / Value */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <section className="bg-white border border-[#E8E3DD] rounded-2xl md:rounded-3xl p-6 md:p-8">
                            <h3 className="text-base md:text-lg font-semibold mb-2">Who This Is For</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{data.audience}</p>
                        </section>

                        <section className="bg-[#1A1A1A] border border-[#2B2118] text-white rounded-2xl md:rounded-3xl p-6 md:p-8">
                            <h3 className="text-base md:text-lg font-semibold mb-2 text-orange-400">Why This Matters</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{data.valueProp}</p>
                        </section>
                    </div>

                    {/* HOW IT WORKS */}
                    <section className="bg-white border border-[#E8E3DD] rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-sm">
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-8 md:mb-10">How it works</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 text-center">
                            <div>
                                <div className="w-10 h-10 mx-auto bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-bold mb-3 md:mb-4">1</div>
                                <p className="text-gray-600 text-sm">Join the early waitlist and share your feedback.</p>
                            </div>
                            <div>
                                <div className="w-10 h-10 mx-auto bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-bold mb-3 md:mb-4">2</div>
                                <p className="text-gray-600 text-sm">We build the MVP based on real user demand.</p>
                            </div>
                            <div>
                                <div className="w-10 h-10 mx-auto bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-bold mb-3 md:mb-4">3</div>
                                <p className="text-gray-600 text-sm">Early users get first access and perks.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            {/* ---------- FOOTER ---------- */}
            <footer className="border-t border-[#E8E3DD] py-8 md:py-10 text-center text-xs text-gray-500 pb-24 md:pb-10">
                <p>This is an early validation page. Your feedback helps shape the product.</p>
            </footer>

            {/* ---------- UX Layout: STICKY MOBILE CTA ---------- */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-[#E8E3DD] p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <button
                    onClick={scrollToValidation}
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-md"
                >
                    Get Early Access
                </button>
            </div>

        </div>
    );
};

export default PitchTemplate;