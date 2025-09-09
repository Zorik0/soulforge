"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- SEO Configuration ---
// IMPORTANT: Change these values to match your brand and improve search engine ranking.
const SEO_CONFIG = {
    title: "ScriptForge | Secure Roblox Key System & Verified Hubs",
    description: "Get your secure, 24-hour key for top-tier Roblox scripts. Complete simple checkpoints to gain instant access. Browse our list of verified script hubs and executors.",
    keywords: "roblox scripts, roblox key system, script executor, roblox hacks, roblox cheats, script hub, linkvertise key system",
    author: "ScriptForge"
};


// --- KeyGen Configuration ---
// IMPORTANT: This secret key MUST be the same as the one in your Lua script.
const SECRET_KEY = "your-super-secret-key-that-no-one-should-guess";

// IMPORTANT: Update these with your actual Linkvertise URLs.
const LINKVERTISE_LINKS = {
    1: "https://link-hub.net/347027/xXzaF1UbMrwG",
    2: "https://link-target.net/347027/M9IzMDdKQGdT",
    3: "https://link-hub.net/347027/YzeOo25vTzBK",
};

const TOTAL_STEPS = 3;


// --- Icon Components ---
const IconHome = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> <polyline points="9 22 9 12 15 12 15 22" /> </svg>
);
const IconBox = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /> <polyline points="3.27 6.96 12 12.01 20.73 6.96" /> <line x1="12" y1="22.08" x2="12" y2="12" /> </svg>
);
const IconTerminal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <polyline points="4 17 10 11 4 5" /> <line x1="12" y1="19" x2="20" y2="19" /> </svg>
);
const IconCopy = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /> </svg>
);
const IconCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" > <polyline points="20 6 9 17 4 12" /> </svg>
);
const IconKey = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <circle cx="7.5" cy="15.5" r="5.5" /> <path d="m21 2-9.6 9.6" /> <path d="m15.5 7.5 3 3L22 7l-3-3" /> </svg>
);
const IconMenu = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /> <line x1="4" x2="20" y1="18" y2="18" /> </svg>
);
const IconX = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <line x1="18" x2="6" y1="6" y2="18" /> <line x1="6" x2="18" y1="6" y2="18" /> </svg>
);
const IconDiscord = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" > <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.1 12.1 0 0 0-3.658 0 8.2 8.2 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.05.05 0 0 0-.048-.027c-.538-.22-1.048-.516-1.508-.855a.05.05 0 0 1 .012-.084c.121-.058.242-.117.359-.174.117-.058.234-.117.351-.174a.05.05 0 0 1 .059.009c1.958 1.156 4.167 1.156 6.125 0a.05.05 0 0 1 .059-.009c.117.058.234-.117.351-.174.117.058.238.116.359.174a.05.05 0 0 1 .012.084c-.46.34-1.028.685-1.556.855a.05.05 0 0 0-.048.027.05.05 0 0 0-.01.059c.236.466.51.909.818 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 3.995-2.02.05.05 0 0 0 .021-.037c.276-2.985-.063-6.008-.663-9.125a.04.04 0 0 0-.021-.018zm-2.48.087c.175.333.337.678.492 1.037a.05.05 0 0 1-.058.063c-.148-.081-.301-.161-.453-.244a.05.05 0 0 1 .022-.09c.154-.078.309-.155.463-.233a.05.05 0 0 1 .035.001zm-.71-.244c.158.085.316.17.47.258a.05.05 0 0 1-.06.058c-.147-.084-.298-.168-.452-.255a.05.05 0 0 1 .016-.09c.159-.087.318-.17.476-.253a.05.05 0 0 1 .046.011zm-5.188-.011c.158.085.316.17.47.258a.05.05 0 0 1-.06.058c-.147-.084-.298-.168-.452-.255a.05.05 0 0 1 .016-.09c.159-.087.318-.17.476-.253a.05.05 0 0 1 .046.011z" /> </svg>
);
const IconTwitter = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" > <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" /> </svg>
);
const LoadingSpinner = () => (
    <div className="w-12 h-12 rounded-full border-4 border-neutral-700 border-t-purple-500 animate-spin"></div>
);


// --- Helper & Utility Components ---

const GridBackground = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
            document.documentElement.style.setProperty("--mouse-y", `${e.clientY + window.scrollY}px`);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-neutral-950" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(128, 128, 128, 0.5) 1px, transparent 0)", backgroundSize: "25px 25px" }}>
            <div className="absolute inset-0 z-10" style={{ background: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(180, 180, 180, 0.07), transparent 25%)" }} />
        </div>
    );
};

const MobileMenu = ({ setPage, closeMenu }) => {
    const handleNav = (page) => {
        setPage(page);
        closeMenu();
    };
    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40 p-4">
            <div className="flex justify-end mb-8">
                <button onClick={closeMenu} className="text-neutral-300 hover:text-white">
                    <IconX />
                </button>
            </div>
            <ul className="flex flex-col items-center gap-8">
                <li><button onClick={() => handleNav("home")} className="flex items-center gap-2 text-xl font-medium text-neutral-300 hover:text-white transition-colors"><IconHome />Home</button></li>
                <li><button onClick={() => handleNav("hubs")} className="flex items-center gap-2 text-xl font-medium text-neutral-300 hover:text-white transition-colors"><IconBox />Verified Hubs</button></li>
                <li><button onClick={() => handleNav("executors")} className="flex items-center gap-2 text-xl font-medium text-neutral-300 hover:text-white transition-colors"><IconTerminal />Executors</button></li>
            </ul>
        </motion.div>
    );
};

const Navbar = ({ setPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
                <div className="navbar-glow flex items-center justify-between gap-4 md:gap-8 border border-white/10 bg-black/40 backdrop-blur-xl py-3 px-4 md:px-6 rounded-full">
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-start leading-none">
                            <h1 className="font-bold text-lg text-white">ScriptForge</h1>
                        </div>
                    </div>
                    <div className="hidden md:flex">
                        <ul className="flex items-center gap-6">
                            <li><button onClick={() => setPage("home")} className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"><IconHome />Home</button></li>
                            <li><button onClick={() => setPage("hubs")} className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"><IconBox />Verified Hubs</button></li>
                            <li><button onClick={() => setPage("executors")} className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"><IconTerminal />Executors</button></li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setPage("get-listed")} className="text-sm bg-orange-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-px">Get Listed</button>
                        <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-neutral-300 hover:text-white"><IconMenu /></button>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {isMenuOpen && <MobileMenu setPage={setPage} closeMenu={() => setIsMenuOpen(false)} />}
            </AnimatePresence>
        </>
    );
};


// --- Cryptography and Key Generation Logic ---
const bufferToHex = (buffer) => {
    return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, '0')).join('');
};

const createSignature = async (data, secret) => {
    try {
        if (!window.crypto || !window.crypto.subtle) {
             throw new Error("Web Crypto API not supported in this browser.");
        }
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const dataToSign = encoder.encode(data);
        const importedKey = await window.crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const signatureBuffer = await window.crypto.subtle.sign('HMAC', importedKey, dataToSign);
        return bufferToHex(signatureBuffer);
    } catch (error) {
        console.error("Signature creation failed:", error);
        return null;
    }
};


// --- Page Components ---

const hubsData = [
    {
        name: "Nexus Executor",
        author: "bytex",
        thumbnail: "https://placehold.co/600x400/1a1a1a/orange?text=Nexus",
        thumbnailType: "image",
        features: ["Bypass Byfron", "Instant Injection", "Secure Lua Environment", "24/7 Support"],
    },
    {
        name: "OrionHub Scripts",
        author: "syn",
        thumbnail: "https://placehold.co/600x400/1a1a1a/white?text=OrionHub",
        thumbnailType: "image",
        features: ["Universal Game Support", "Aimbot & ESP Included", "Frequent Updates", "Community Driven"],
    },
    {
        name: "Eclipse Hub",
        author: "vex",
        thumbnail: "https://placehold.co/600x400/1a1a1a/purple?text=Eclipse",
        thumbnailType: "image",
        features: ["Lightweight & Fast", "Custom Function Library", "Undetected Profile", "Script Encryption"],
    },
];

const HubCard = ({ name, author, features, delay, thumbnail, thumbnailType }) => {
    const [copyStatus, setCopyStatus] = useState("idle");
    const handleCopy = () => {
        navigator.clipboard.writeText(`loadstring(game:HttpGet("https://example.com/scripts/${name.replace(/\s+/g, "")}"))()`);
        setCopyStatus("copied");
        setTimeout(() => setCopyStatus("idle"), 2000);
    };
    const isCopied = copyStatus === "copied";

    return (
        <div className="shimmer-card group relative overflow-hidden border border-white/10 bg-black/20 backdrop-blur-md rounded-xl flex flex-col transition-all duration-300 hover:border-orange-500/50 hover:scale-[1.02] hover:-translate-y-1" style={{ animation: `fadeInUp 0.5s ${delay}s ease-out forwards`, opacity: 0 }}>
            <div className="aspect-video w-full overflow-hidden">
                {thumbnailType === 'image' ? (
                    <img src={thumbnail} alt={`${name} thumbnail`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                ) : (
                    <video src={thumbnail} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"></video>
                )}
            </div>
            <div className="p-6 flex flex-col gap-4 flex-grow">
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <ul className="space-y-2">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M20 6 9 17l-5-5" /></svg>
                            {feature}
                        </li>
                    ))}
                </ul>
                <p className="text-xs text-neutral-500 mt-2">Creator: {author}</p>
                <button onClick={handleCopy} className={`w-full mt-auto py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${isCopied ? "bg-green-500 text-white cursor-not-allowed" : "bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/40"}`} disabled={isCopied}>
                    {isCopied ? (<><IconCheck />Copied!</>) : (<><IconCopy />Copy Loadstring</>)}
                </button>
            </div>
        </div>
    );
};

const HubsGrid = ({ title, description }) => (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">{title}</h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hubsData.map((hub, i) => (<HubCard key={hub.name} {...hub} delay={i * 0.1} />))}
        </div>
    </div>
);

const executorsData = [
    { name: "Synapse X", logo: "https://placehold.co/80x80/1a1a1a/orange?text=SX", description: "A powerful and reliable script executor known for its stability and extensive feature set.", url: "#" },
    { name: "KRNL", logo: "https://placehold.co/80x80/1a1a1a/white?text=K", description: "A popular free executor offering robust performance and compatibility with a wide range of scripts.", url: "#" },
    { name: "Fluxus", logo: "https://placehold.co/80x80/1a1a1a/purple?text=F", description: "A lightweight and fast executor, designed for quick injection and smooth script execution.", url: "#" },
];

const ExecutorCard = ({ name, logo, description, url, delay }) => (
    <div className="shimmer-card relative overflow-hidden border border-white/10 bg-black/20 backdrop-blur-md p-6 rounded-xl flex flex-col items-center text-center gap-4 transition-all duration-300 hover:border-purple-500/50 hover:scale-[1.02] hover:-translate-y-1" style={{ animation: `fadeInUp 0.5s ${delay}s ease-out forwards`, opacity: 0 }}>
        <img src={logo} alt={`${name} logo`} className="w-20 h-20 rounded-full border-2 border-white/10" />
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-sm text-neutral-400 flex-grow">{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="w-full mt-auto py-2 px-4 rounded-lg font-semibold text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/40 transition-colors duration-200">Know More</a>
    </div>
);

const ExecutorsGrid = ({ title, description }) => (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">{title}</h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executorsData.map((executor, i) => (<ExecutorCard key={executor.name} {...executor} delay={i * 0.1} />))}
        </div>
    </div>
);

const GetListedPage = () => {
    const [formData, setFormData] = useState({ projectName: "", email: "", projectType: "hub", projectUrl: "", description: "" });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value })); };
    const handleSubmit = (e) => { e.preventDefault(); console.log("Form Submitted:", formData); setSubmitted(true); };

    if (submitted) {
        return (
            <div className="relative z-10 text-center flex flex-col items-center justify-center min-h-screen px-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pb-4">Submission Received!</h1>
                <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">Thank you for your application. We'll review it and get back to you shortly.</p>
            </div>
        );
    }

    return (
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-24 sm:py-32">
            <h2 className="text-3xl font-bold text-center text-white mb-4">Get Your Project Listed</h2>
            <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">Fill out the form below to apply for a spot on our verified list.</p>
            <form onSubmit={handleSubmit} className="space-y-6 border border-white/10 bg-black/20 backdrop-blur-md p-8 rounded-xl">
                <div><label htmlFor="projectName" className="block text-sm font-medium text-neutral-300 mb-2">Project Name</label><input type="text" name="projectName" id="projectName" value={formData.projectName} onChange={handleChange} required className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50" /></div>
                <div><label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Contact Email</label><input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50" /></div>
                <div><label htmlFor="projectType" className="block text-sm font-medium text-neutral-300 mb-2">Project Type</label><select name="projectType" id="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-neutral-900/80 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50"><option value="hub">Script Hub</option><option value="executor">Executor</option></select></div>
                <div><label htmlFor="projectUrl" className="block text-sm font-medium text-neutral-300 mb-2">Website URL or Loadstring</label><input type="text" name="projectUrl" id="projectUrl" value={formData.projectUrl} onChange={handleChange} required className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50" /></div>
                <div><label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">Brief Description / Key Features</label><textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} required className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50"></textarea></div>
                <button type="submit" className="w-full text-md bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-px">Submit Application</button>
            </form>
        </div>
    );
};

const KeyGenCheckpoint = ({ number, status, onStart }) => {
    const isLocked = status === "locked";
    const isCompleted = status === "completed";
    const isActive = status === "active";

    return (
        <div className={`border border-white/10 bg-black/20 p-4 md:p-6 rounded-xl transition-all duration-300 ${isLocked ? "opacity-50" : ""}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isCompleted ? "bg-green-500/20" : isActive ? "bg-purple-500/20" : "bg-neutral-700"}`}>
                        {isCompleted ? (<IconCheck />) : (<span className={`text-lg font-bold ${isActive ? "text-purple-300" : "text-neutral-400"}`}>{number}</span>)}
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-white">Checkpoint {number}</h3>
                        <p className="text-sm text-neutral-400">{isCompleted ? "Completed successfully." : isActive ? "Ready to start." : "Locked."}</p>
                    </div>
                </div>
                {!isCompleted && (<button onClick={onStart} disabled={!isActive} className="w-full sm:w-auto py-2 px-6 rounded-lg font-semibold text-sm transition-all duration-200 text-center disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/40">Start</button>)}
            </div>
        </div>
    );
};

const MasterKeyPage = () => {
    const [step, setStep] = useState(1);
    const [generatedKey, setGeneratedKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [keyCopied, setKeyCopied] = useState(false);
    const [error, setError] = useState(null);

    const handleKeyGeneration = useCallback(async () => {
        setIsLoading(true);
        try {
            const expirationTimestamp = Math.floor(Date.now() / 1000) + (24 * 60 * 60);
            const dataToSign = `key-expires-at:${expirationTimestamp}`;
            const signature = await createSignature(dataToSign, SECRET_KEY);
            if (!signature) { throw new Error("Failed to sign the key."); }
            const finalKey = `${expirationTimestamp}.${signature}`;
            setGeneratedKey(finalKey);
            localStorage.removeItem('key_checkpoint_step');
            localStorage.removeItem('key_checkpoint_nonce');
        } catch (e) {
            console.error("Key Generation Error:", e);
            setError("An error occurred while generating your key. Please refresh and try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const manageState = async () => {
            const params = new URLSearchParams(window.location.search);
            const returnedFromCheckpoint = params.get('c');
            const expectedNonce = localStorage.getItem('key_checkpoint_nonce');
            let currentStep = parseInt(localStorage.getItem('key_checkpoint_step') || '1', 10);

            if (returnedFromCheckpoint && expectedNonce) {
                const expectedStepAfterRedirect = currentStep + 1;
                const returnedStepNumber = parseInt(returnedFromCheckpoint, 10);
                if (returnedStepNumber === expectedStepAfterRedirect) {
                    currentStep++;
                    localStorage.setItem('key_checkpoint_step', currentStep);
                }
            }
            localStorage.removeItem('key_checkpoint_nonce');

            if (params.has('c')) {
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            if (currentStep > TOTAL_STEPS) {
                await handleKeyGeneration();
            } else {
                setStep(currentStep);
                setIsLoading(false);
            }
        };

        const timer = setTimeout(() => manageState(), 100);
        return () => clearTimeout(timer);
    }, [handleKeyGeneration]);

    const handleProceed = (currentStepNum) => {
        const nonce = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('key_checkpoint_nonce', nonce);
        localStorage.setItem('key_checkpoint_step', currentStepNum);
        const nextStepParam = currentStepNum + 1;
        // SEO: Using btoa for a simple redirect parameter. Not for security.
        const redirectUrl = `${LINKVERTISE_LINKS[currentStepNum]}?r=${btoa(window.location.href.split('?')[0] + `?c=${nextStepParam}`)}`;
        window.location.href = redirectUrl;
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(generatedKey);
        setKeyCopied(true);
        setTimeout(() => setKeyCopied(false), 2000);
    };

    const getStatus = (checkpointNum) => {
        if (checkpointNum < step) return "completed";
        if (checkpointNum === step) return "active";
        return "locked";
    };

    const progress = generatedKey ? 100 : ((step - 1) / TOTAL_STEPS) * 100;

    if (isLoading) {
        return (
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                <LoadingSpinner />
                <p className="text-neutral-400 mt-4">Verifying your status...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-24 sm:py-32 text-center border border-red-500/20 bg-black/20 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-red-400 mb-4">Verification Failed</h3>
                <p className="text-neutral-300">{error}</p>
            </div>
        );
    }

    return (
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-24 sm:py-32">
            <AnimatePresence mode="wait">
                {generatedKey ? (
                    <motion.div key="key-generated" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-center border border-green-500/20 bg-black/20 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">Success! Key Unlocked.</h3>
                        <p className="text-neutral-300 mb-6">Your key is valid for 24 hours. Thank you for your support!</p>
                        <div className="flex items-center gap-2 md:gap-4 max-w-md mx-auto">
                            <input type="text" readOnly value={generatedKey} className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-green-300 text-sm md:text-base font-mono text-center truncate" />
                            <button onClick={handleCopyKey} className={`flex-shrink-0 py-3 px-4 md:px-6 rounded-lg font-semibold text-white transition-colors duration-200 flex items-center gap-2 ${keyCopied ? "bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}>
                                {keyCopied ? <IconCheck /> : <IconCopy />}
                                <span className="hidden md:inline">{keyCopied ? "Copied!" : "Copy"}</span>
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="checkpoints" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Generate Your Key</h2>
                        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-8">Complete the following checkpoints to receive your 24-hour key.</p>
                        <div className="space-y-8">
                            <div className="w-full bg-black/20 rounded-full h-2.5 border border-white/10 overflow-hidden">
                                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}></div>
                            </div>
                            <div className="space-y-4">
                                {[...Array(TOTAL_STEPS)].map((_, i) => (<KeyGenCheckpoint key={i + 1} number={i + 1} status={getStatus(i + 1)} onStart={() => handleProceed(i + 1)} />))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


const HeroLoadstring = ({ setPage }) => {
    const [copyStatus, setCopyStatus] = useState("idle");
    const loadstring = 'loadstring(game:HttpGet("https://scriptforge.gg/main"))()';

    const handleCopy = () => {
        navigator.clipboard.writeText(loadstring);
        setCopyStatus("copied");
        setTimeout(() => setCopyStatus("idle"), 2000);
    };
    const isCopied = copyStatus === "copied";

    return (
        <div className="mt-8 flex flex-col items-center gap-6 max-w-2xl mx-auto w-full">
            <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                <input type="text" readOnly value={loadstring} className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-center sm:text-left" />
                <button onClick={handleCopy} disabled={isCopied} className={`w-full sm:w-auto flex-shrink-0 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${isCopied ? "bg-green-500 text-white cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"}`}>
                    {isCopied ? (<><IconCheck />Copied</>) : (<><IconCopy />Copy</>)}
                </button>
            </div>
            <button onClick={() => setPage("master-key")} className="master-key-btn relative w-full sm:w-auto text-lg bg-neutral-900 text-white font-semibold py-3 px-8 rounded-lg border border-purple-500/50 transition-all duration-300 transform hover:-translate-y-px flex items-center justify-center gap-3">
                <IconKey /> Get Master Key
            </button>
        </div>
    );
};

const HomePageContent = ({ setPage }) => (
    <>
        <div className="relative z-10 text-center flex flex-col items-center pt-32 sm:pt-40 pb-16 px-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pb-4">Forge Your Legacy in Roblox</h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">Your central hub for top-tier, verified Roblox scripts and executors.</p>
            <p className="mt-4 text-sm text-neutral-500">Your Arsenal for Roblox</p>
            <HeroLoadstring setPage={setPage} />
        </div>
        <HubsGrid title="Featured Script Hubs" description="A curated collection of the most reliable and powerful script hubs, verified for performance and security." />
        <ExecutorsGrid title="Top Executors" description="A selection of powerful and reliable executors for a seamless experience." />
    </>
);

const Footer = () => (
    <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 mt-auto">
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-neutral-500">&copy; {new Date().getFullYear()} ScriptForge. All rights reserved.</p>
            <div className="flex items-center gap-6">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors"><IconDiscord /></a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors"><IconTwitter /></a>
            </div>
        </div>
    </footer>
);

// SEO Management Component
const ManageSEO = () => {
    useEffect(() => {
        document.title = SEO_CONFIG.title;
        
        const setMeta = (name, content) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        setMeta('description', SEO_CONFIG.description);
        setMeta('keywords', SEO_CONFIG.keywords);
        setMeta('author', SEO_CONFIG.author);

    }, []);

    return null; // This component doesn't render anything
}

export default function Home() {
    const [page, setPage] = useState("home");
    const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 }, };
    const pageTransition = { type: "tween", ease: "anticipate", duration: 0.4 };

    useEffect(() => { window.scrollTo(0, 0); }, [page]);

    return (
        <main className="relative bg-black text-neutral-300 flex flex-col items-center min-h-screen">
            <ManageSEO />
            <style>{`
            .shimmer-card::before { content: ""; position: absolute; top: 0; left: 0; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent); transform: translateX(-150%) skewX(-15deg); pointer-events: none; }
            .shimmer-card:hover::before { transform: translateX(250%) skewX(-15deg); transition: transform 0.85s cubic-bezier(0.7, 0, 0.3, 1); }
            @keyframes dreamy-glow { 50% { box-shadow: 0 0 25px 2px rgba(255, 255, 255, 0.1); } }
            .navbar-glow { animation: dreamy-glow 6s ease-in-out infinite; }
            .master-key-btn { background-image: radial-gradient(circle at 50% 100%, rgba(168, 85, 247, 0.2), transparent 60%); }
            .master-key-btn:hover { box-shadow: 0 0 25px 3px rgba(168, 85, 247, 0.3); border-color: rgba(168, 85, 247, 0.8); }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            <GridBackground />
            <Navbar setPage={setPage} />

            <AnimatePresence mode="wait">
                <motion.div key={page} initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="w-full flex-grow flex flex-col">
                    {page === "home" && <HomePageContent setPage={setPage} />}
                    {page === "hubs" && <HubsGrid title="All Verified Hubs" description="Browse our full collection of trusted and verified script hubs." />}
                    {page === "executors" && <ExecutorsGrid title="Verified Executors" description="A selection of powerful and reliable executors for a seamless experience." />}
                    {page === "get-listed" && <GetListedPage />}
                    {page === "master-key" && <MasterKeyPage />}
                </motion.div>
            </AnimatePresence>
            <Footer />
        </main>
    );
}

