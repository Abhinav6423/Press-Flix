import React from "react";
import { CheckCircle, Copy, ExternalLink, Home } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const PitchReady = () => {
    const navigate = useNavigate();
    const { slug } = useParams();

   const publicUrl = `${window.location.origin}/#/p/${slug}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(publicUrl);
            toast.success("Link copied!");
        } catch {
            toast.error("Failed to copy");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-white">
            <div className="max-w-xl w-full bg-[#121212] border border-[#2a2a2a] rounded-2xl p-10 text-center shadow-2xl">

                {/* ICON */}
                <CheckCircle size={60} className="mx-auto text-green-500 mb-6" />

                {/* TITLE */}
                <h1 className="text-2xl font-bold mb-3">
                    Your Landing Pitch is Ready 🎉
                </h1>

                <p className="text-gray-400 mb-8">
                    Your page is live and accessible via the link below.
                </p>

                {/* URL BOX */}
                <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 flex items-center justify-between gap-3 mb-6">
                    <span className="text-sm text-gray-300 truncate">{publicUrl}</span>

                    <button
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-[#1f1f1f] rounded"
                    >
                        <Copy size={16} />
                    </button>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">

                    <a
                        href={publicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
                    >
                        <ExternalLink size={16} />
                        Open Page
                    </a>

                    <button
                        onClick={() => navigate("/home")}
                        className="flex items-center justify-center gap-2 px-5 py-3 border border-[#333] hover:bg-[#1a1a1a] rounded-lg"
                    >
                        <Home size={16} />
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PitchReady;
