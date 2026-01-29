import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Sparkles,
    BookOpen,
    Briefcase,
    Laptop,
    Package,
    Plus,
    X,
    Upload,
    Image as ImageIcon,
    Wand2,
    Link as LinkIcon
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// --- UTILS & ANIMATION ---

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

// --- REUSABLE UI COMPONENTS ---

const Label = ({ children, color = "text-zinc-400" }) => (
    <label className={`block text-[11px] font-bold uppercase tracking-widest mb-2 ${color}`}>
        {children}
    </label>
);

const Input = ({ label, placeholder, accentColor = "focus:ring-indigo-500/50", ...props }) => (
    <motion.div variants={itemVariants} className="w-full">
        {label && <Label>{label}</Label>}
        <input
            className={`w-full bg-[#12141a] border border-[#27272a] rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:border-transparent transition-all font-medium ${accentColor}`}
            placeholder={placeholder}
            {...props}
        />
    </motion.div>
);

const SlugInput = ({ label, placeholder, accentColor = "focus:ring-indigo-500/50", ...props }) => (
    <motion.div variants={itemVariants} className="w-full">
        {label && <Label>{label}</Label>}
        <div className={`flex items-center w-full bg-[#12141a] border border-[#27272a] rounded-lg overflow-hidden focus-within:ring-1 focus-within:border-transparent transition-all ${accentColor.replace('focus:', 'focus-within:')}`}>
            <div className="bg-[#1e2029] px-3 py-3 text-zinc-500 text-sm font-mono border-r border-[#27272a] select-none flex items-center gap-1">
                <LinkIcon size={12} />
                pressflix.com/
            </div>
            <input
                className="w-full bg-transparent border-none px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none font-medium"
                placeholder={placeholder}
                {...props}
            />
        </div>
    </motion.div>
);

const TextArea = ({ label, placeholder, accentColor = "focus:ring-indigo-500/50", rows = 3, ...props }) => (
    <motion.div variants={itemVariants} className="w-full">
        {label && <Label>{label}</Label>}
        <textarea
            className={`w-full bg-[#12141a] border border-[#27272a] rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:border-transparent transition-all font-medium resize-none leading-relaxed ${accentColor}`}
            placeholder={placeholder}
            rows={rows}
            {...props}
        />
    </motion.div>
);

const ImageUpload = ({ label, accentColor }) => {
    const [fileName, setFileName] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
    };

    return (
        <motion.div variants={itemVariants} className="w-full">
            {label && <Label>{label}</Label>}
            <div className={`relative group border-2 border-dashed border-[#27272a] hover:border-zinc-500 bg-[#12141a] rounded-xl p-6 transition-all cursor-pointer text-center ${accentColor.replace('focus:ring-', 'group-hover:border-').replace('/50', '')}`}>
                <input
                    type="file"
                    onChange={handleFile}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                    {fileName ? (
                        <>
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
                                <ImageIcon size={20} />
                            </div>
                            <span className="text-zinc-200 text-sm font-medium truncate max-w-[200px]">{fileName}</span>
                            <span className="text-xs text-zinc-500">Click to replace</span>
                        </>
                    ) : (
                        <>
                            <div className="w-10 h-10 rounded-full bg-[#1e2029] text-zinc-400 group-hover:bg-[#27272a] group-hover:text-white transition-colors flex items-center justify-center mb-1">
                                <Upload size={18} />
                            </div>
                            <span className="text-zinc-300 text-sm font-medium">Click to upload image</span>
                            <span className="text-xs text-zinc-500">SVG, PNG, JPG or GIF (max. 3MB)</span>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const ListInput = ({ label, items, onChange, fields, buttonText, accentColor }) => {
    const handleAdd = () => {
        onChange([...items, fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {})]);
    };

    const handleChange = (index, key, value) => {
        const newItems = [...items];
        newItems[index][key] = value;
        onChange(newItems);
    };

    const handleRemove = (index) => {
        onChange(items.filter((_, i) => i !== index));
    };

    return (
        <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex justify-between items-end">
                <Label>{label}</Label>
            </div>
            {items.map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                    {fields.map((field) => (
                        <input
                            key={field.key}
                            placeholder={field.placeholder}
                            value={item[field.key] || ''}
                            onChange={(e) => handleChange(index, field.key, e.target.value)}
                            className={`bg-[#12141a] border border-[#27272a] rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 ${accentColor} flex-1 min-w-0`}
                        />
                    ))}
                    <button onClick={() => handleRemove(index)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors">
                        <X size={16} />
                    </button>
                </div>
            ))}
            <button
                onClick={handleAdd}
                className="text-xs flex items-center gap-1 text-zinc-500 hover:text-white transition-colors px-1"
            >
                <Plus size={14} /> {buttonText}
            </button>
        </motion.div>
    );
};


// --- 1. BOOK / CREATIVE WORK FORM ---
const BookForm = () => {
    const [characters, setCharacters] = useState([{ name: '', role: '', trait: '' }]);

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Title" placeholder="ECHOES OF SILICA" accentColor="focus:ring-amber-500/50" />
                <Input label="Author" placeholder="J.D. Kincaid" accentColor="focus:ring-amber-500/50" />
            </div>

            <SlugInput label="Project URL Slug" placeholder="echoes-of-silica" accentColor="focus:ring-amber-500/50" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Genre" placeholder="Dystopian Sci-Fi / Noir" accentColor="focus:ring-amber-500/50" />
                <Input label="Target Audience" placeholder="Adult Sci-Fi (25-45)" accentColor="focus:ring-amber-500/50" />
            </div>

            <TextArea label="The Hook" placeholder="A disgraced terraformer hunts a saboteur..." accentColor="focus:ring-amber-500/50" />
            <TextArea label="Synopsis" placeholder="In the glass city of Aero..." accentColor="focus:ring-amber-500/50" rows={4} />

            <ListInput
                label="Key Characters"
                buttonText="Add Character"
                items={characters}
                onChange={setCharacters}
                accentColor="focus:ring-amber-500/50"
                fields={[
                    { key: 'name', placeholder: 'Name (e.g. Kael)' },
                    { key: 'role', placeholder: 'Role (e.g. Protagonist)' },
                    { key: 'trait', placeholder: 'Trait (e.g. Obsessive)' }
                ]}
            />

            <ImageUpload label="Cover Art / Poster" accentColor="focus:ring-amber-500/50" />
        </motion.div>
    );
};

// --- 2. TECH / SAAS FORM ---
const TechForm = () => {
    const [stats, setStats] = useState([{ label: '', val: '' }]);

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Project Name" placeholder="PROJECT: AETHER" accentColor="focus:ring-indigo-500/50" />
                <Input label="Type" placeholder="SaaS / Mobile App / Service" accentColor="focus:ring-indigo-500/50" />
            </div>

            <SlugInput label="Project URL Slug" placeholder="project-aether" accentColor="focus:ring-indigo-500/50" />

            <Input label="Headline" placeholder="The One-Line Pitch That Explains Value Instantly." accentColor="focus:ring-indigo-500/50" />
            <TextArea label="Subhead / Value Prop" placeholder="Don't build a complex backend yet..." accentColor="focus:ring-indigo-500/50" />

            <div className="bg-[#18181b]/50 p-5 rounded-xl border border-white/5 space-y-4">
                <Label color="text-indigo-400">Founder Contact</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="founder@example.com" accentColor="focus:ring-indigo-500/50" />
                    <Input placeholder="Calendly Link" accentColor="focus:ring-indigo-500/50" />
                    <Input placeholder="Twitter / X Link" accentColor="focus:ring-indigo-500/50" />
                </div>
            </div>

            <ListInput
                label="Key Metrics"
                buttonText="Add Metric"
                items={stats}
                onChange={setStats}
                accentColor="focus:ring-indigo-500/50"
                fields={[
                    { key: 'label', placeholder: 'Label (e.g. Market Size)' },
                    { key: 'val', placeholder: 'Value (e.g. $10B)' }
                ]}
            />

            <ImageUpload label="App Screenshot / Logo" accentColor="focus:ring-indigo-500/50" />
        </motion.div>
    );
};

// --- 3. PHYSICAL PRODUCT FORM ---
const PhysicalForm = () => {
    const [specs, setSpecs] = useState([{ label: '', val: '' }]);
    const [roadmap, setRoadmap] = useState([{ phase: '', task: '' }]);

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Product Name" placeholder="NEXUS-1" accentColor="focus:ring-teal-500/50" />
                <Input label="Category" placeholder="Sustainable Wellness / Hardware" accentColor="focus:ring-teal-500/50" />
            </div>

            <SlugInput label="Product URL Slug" placeholder="nexus-one" accentColor="focus:ring-teal-500/50" />

            <Input label="Tagline" placeholder="The serum that bridges nature and science." accentColor="focus:ring-teal-500/50" />
            <TextArea label="Description" placeholder="A physical desktop portal..." accentColor="focus:ring-teal-500/50" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ListInput
                    label="Specs / Composition"
                    buttonText="Add Spec"
                    items={specs}
                    onChange={setSpecs}
                    accentColor="focus:ring-teal-500/50"
                    fields={[
                        { key: 'label', placeholder: 'Material (e.g. Aluminum)' },
                        { key: 'val', placeholder: 'Value (e.g. 6061)' }
                    ]}
                />
                <ListInput
                    label="Roadmap"
                    buttonText="Add Phase"
                    items={roadmap}
                    onChange={setRoadmap}
                    accentColor="focus:ring-teal-500/50"
                    fields={[
                        { key: 'phase', placeholder: 'Phase (e.g. Q1)' },
                        { key: 'task', placeholder: 'Milestone' }
                    ]}
                />
            </div>

            <ImageUpload label="Product Render / Photo" accentColor="focus:ring-teal-500/50" />
        </motion.div>
    );
};

// --- 4. SERVICE FORM ---
const ServiceForm = () => {
    const [features, setFeatures] = useState([{ name: '', desc: '' }]);

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Agency Name" placeholder="PixelPerfect Studios" accentColor="focus:ring-slate-500/50" />
                <Input label="Headline" placeholder="We design high-converting pages." accentColor="focus:ring-slate-500/50" />
            </div>

            <SlugInput label="Service URL Slug" placeholder="pixel-perfect" accentColor="focus:ring-slate-500/50" />

            <TextArea label="Core Offer" placeholder="Detailed explanation of the service..." accentColor="focus:ring-slate-500/50" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input label="Price Start" placeholder="$5,000 / mo" accentColor="focus:ring-slate-500/50" />
                <Input label="Timeline" placeholder="2 Weeks Avg" accentColor="focus:ring-slate-500/50" />
                <Input label="Deliverable" placeholder="Figma & Code" accentColor="focus:ring-slate-500/50" />
            </div>

            <ListInput
                label="Process / Features"
                buttonText="Add Step"
                items={features}
                onChange={setFeatures}
                accentColor="focus:ring-slate-500/50"
                fields={[
                    { key: 'name', placeholder: 'Step (e.g. Audit)' },
                    { key: 'desc', placeholder: 'Description' }
                ]}
            />

            <ImageUpload label="Portfolio / Hero Image" accentColor="focus:ring-slate-500/50" />
        </motion.div>
    );
};


// --- MAIN PAGE ---

const PitchDetailsForm = () => {
    const navigate = useNavigate();
    const { category: paramCategory } = useParams();
    const [category, setCategory] = useState(paramCategory || 'tech');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (paramCategory) setCategory(paramCategory);
    }, [paramCategory]);

    const getCategoryMeta = () => {
        switch (category) {
            case 'book': return {
                icon: BookOpen, label: 'Story Details', color: 'text-[#d4b483]', accent: 'border-[#d4b483]/20', bg: 'bg-[#d4b483]/10'
            };
            case 'service': return {
                icon: Briefcase, label: 'Service Offer', color: 'text-slate-400', accent: 'border-slate-500/20', bg: 'bg-slate-500/10'
            };
            case 'physical': return {
                icon: Package, label: 'Product Specs', color: 'text-teal-400', accent: 'border-teal-500/20', bg: 'bg-teal-500/10'
            };
            default: return {
                icon: Laptop, label: 'Project Config', color: 'text-indigo-400', accent: 'border-indigo-500/20', bg: 'bg-indigo-500/10'
            };
        }
    };

    const meta = getCategoryMeta();
    const Icon = meta.icon;

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#020408] text-zinc-300 font-sans selection:bg-white/20 overflow-x-hidden">

            <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-[#020408]/90 backdrop-blur-md border-b border-white/5">
                <button onClick={() => navigate(-1)} className="p-2 text-zinc-500 hover:text-white transition-all">
                    <ChevronLeft size={20} />
                </button>
                <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                    Step 2: {meta.label}
                </div>
                <div className="w-8" />
            </nav>

            <main className="max-w-3xl mx-auto px-6 pt-28 pb-20 relative z-10">

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${meta.bg} ${meta.color} border border-white/5`}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">{meta.label}</h1>
                        <p className="text-zinc-500 text-sm mt-1">Fill in the core data points for your pitch.</p>
                    </div>
                </motion.div>

                <div className={`relative bg-[#0a0a0c] border ${meta.accent} rounded-2xl p-8 shadow-2xl`}>
                    <AnimatePresence mode="wait">
                        {category === 'book' && <BookForm key="book" />}
                        {category === 'service' && <ServiceForm key="service" />}
                        {category === 'tech' && <TechForm key="tech" />}
                        {category === 'physical' && <PhysicalForm key="physical" />}
                    </AnimatePresence>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className={`
                            flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-sm tracking-wide text-white transition-all shadow-lg
                            ${isGenerating ? 'opacity-70 cursor-wait' : 'hover:scale-105'}
                            ${category === 'book' ? 'bg-[#d4b483] text-black' :
                                category === 'physical' ? 'bg-teal-600' :
                                    category === 'service' ? 'bg-slate-600' : 'bg-indigo-600'}
                        `}
                    >
                        {isGenerating ? <Sparkles className="animate-spin" size={16} /> : <Wand2 size={16} />}
                        <span>{isGenerating ? "Generating..." : "Generate Pitch"}</span>
                    </button>
                </div>

                {/* Dev Switcher */}
                <div className="mt-16 flex justify-center gap-4 opacity-20 hover:opacity-100 transition-opacity">
                    {['book', 'service', 'tech', 'physical'].map(c => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-3 py-1 text-[10px] uppercase font-bold rounded border border-white/10 ${category === c ? 'bg-white text-black' : 'text-zinc-500'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

            </main>
        </div>
    );
};

export default PitchDetailsForm;