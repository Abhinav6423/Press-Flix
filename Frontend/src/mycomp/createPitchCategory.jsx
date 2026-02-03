import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Briefcase,
    Laptop,
    Package,
    ArrowRight,
    Layers,
    ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreatePitchCategory = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const categories = [
        {
            id: 'book',
            title: 'Book / Info Product',
            description: 'E-books, courses, or newsletters.',
            icon: BookOpen,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/50',
            shadow: 'shadow-amber-500/20'
        },
        {
            id: 'service',
            title: 'Service / Agency',
            description: 'Consulting, freelancing, or agencies.',
            icon: Briefcase,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/50',
            shadow: 'shadow-emerald-500/20'
        },
        {
            id: 'tech',
            title: 'Tech Product / SaaS',
            description: 'Software, apps, or digital tools.',
            icon: Laptop,
            color: 'text-indigo-400',
            bg: 'bg-indigo-500/10',
            border: 'border-indigo-500/50',
            shadow: 'shadow-indigo-500/20'
        },
        {
            id: 'physical',
            title: 'Physical Product',
            description: 'Merch, hardware, or crafts.',
            icon: Package,
            color: 'text-rose-400',
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/50',
            shadow: 'shadow-rose-500/20'
        },
    ];

    const handleContinue = () => {
        if (selected) {
            console.log("Selected Category:", selected);
            navigate(`/creationForm/${selected}`);

        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-indigo-500/30 flex flex-col">

            {/* Background Ambience */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Simple Header */}
            <header className="px-6 h-20 flex items-center justify-between border-b border-white/5 relative z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                    <Layers size={18} className="text-indigo-500" />
                    <span className="font-semibold text-white">PressFlix</span>
                </div>

                <div className="w-10" /> {/* Spacer for centering */}
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-5xl mx-auto w-full">

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
                        What are you pitching?
                    </h1>
                    <p className="text-zinc-500 text-lg">
                        Select the category that best describes your offering.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-12">
                    {categories.map((cat, index) => {
                        const isSelected = selected === cat.id;
                        const Icon = cat.icon;

                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelected(cat.id)}
                                className={`
                  relative group cursor-pointer rounded-2xl p-6 border transition-all duration-300
                  ${isSelected
                                        ? `bg-[#0c0c0e] ${cat.border} ring-1 ring-${cat.color.split('-')[1]}-500/20`
                                        : 'bg-[#0c0c0e]/50 border-white/5 hover:border-white/10 hover:bg-[#0c0c0e]'
                                    }
                `}
                            >
                                <div className="flex items-start gap-5">
                                    {/* Icon Box */}
                                    <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isSelected ? `${cat.bg} ${cat.color} ${cat.shadow} shadow-lg` : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-300'}
                  `}>
                                        <Icon size={24} />
                                    </div>

                                    <div>
                                        <h3 className={`text-lg font-medium mb-1 transition-colors ${isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                                            {cat.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed">
                                            {cat.description}
                                        </p>
                                    </div>

                                    {/* Radio Check Circle */}
                                    <div className={`
                    absolute top-6 right-6 w-5 h-5 rounded-full border flex items-center justify-center transition-all
                    ${isSelected ? `${cat.border} ${cat.bg}` : 'border-zinc-800'}
                  `}>
                                        {isSelected && <div className={`w-2 h-2 rounded-full ${cat.color.replace('text', 'bg')}`} />}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-3xl flex justify-end"
                >
                    <button
                        onClick={handleContinue}
                        disabled={!selected}
                        className={`
              flex items-center gap-2 px-8 py-3.5 rounded-full font-medium transition-all duration-300
              ${selected
                                ? 'bg-white text-black hover:bg-zinc-200 hover:gap-3 shadow-xl shadow-white/5'
                                : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                            }
            `}
                    >
                        <span>Continue</span>
                        <ArrowRight size={18} />
                    </button>
                </motion.div>

            </main>
        </div>
    );
};

export default CreatePitchCategory;