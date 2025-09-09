"use client";

import React, { useEffect, useRef } from "react";

/**
 * Renders a sleek, performant dot grid background with a subtle spotlight effect that follows the mouse.
 * This version uses pure CSS for the grid and CSS variables for the mouse-tracking spotlight,
 * which is extremely efficient and avoids component re-renders.
 */
const GridBackground = () => {
  useEffect(() => {
    // Updates CSS variables on mouse move for the radial gradient
    const handleMouseMove = (e) => {
      // We add window.scrollY to e.clientY to get the correct page Y coordinate
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty(
        "--mouse-y",
        `${e.clientY + window.scrollY}px`
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 bg-neutral-950"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(128, 128, 128, 0.5) 1px, transparent 0)",
        backgroundSize: "25px 25px",
      }}
    >
      {/* Spotlight overlay that follows the cursor */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(180, 180, 180, 0.07), transparent 25%)",
        }}
      />
    </div>
  );
};

/**
 * A floating, glassmorphism-style navbar that resembles an Apple-style notch.
 */
const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-30">
      <div className="flex items-center justify-between gap-8 border border-white/10 bg-black/40 backdrop-blur-xl py-2 px-6 rounded-full shadow-lg">
        {/* Left Side: Logo */}
        <div className="flex items-baseline gap-2">
          <h1 className="font-bold text-lg text-white">ScriptForge</h1>
          <p className="hidden md:block text-xs text-neutral-400">
            Your Arsenal for Roblox
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden sm:flex">
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="#"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                Verified Hubs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                Scripts
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side: Button */}
        <button className="text-sm bg-orange-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/50 transition-all duration-300">
          Get Listed
        </button>
      </div>
    </nav>
  );
};

const hubsData = [
  {
    name: "Nexus Executor",
    author: "bytex",
    features: [
      "Bypass Byfron",
      "Instant Injection",
      "Secure Lua Environment",
      "24/7 Support",
    ],
  },
  {
    name: "OrionHub Scripts",
    author: "syn",
    features: [
      "Universal Game Support",
      "Aimbot & ESP Included",
      "Frequent Updates",
      "Community Driven",
    ],
  },
  {
    name: "Eclipse Hub",
    author: "vex",
    features: [
      "Lightweight & Fast",
      "Custom Function Library",
      "Undetected Profile",
      "Script Encryption",
    ],
  },
];

const HubCard = ({ name, author, features, delay }) => (
  <div
    className="border border-white/10 bg-black/20 backdrop-blur-md p-6 rounded-xl flex flex-col gap-4 transition-all duration-300 hover:border-orange-500/50 hover:scale-[1.02] hover:-translate-y-1"
    style={{
      animation: `fadeInUp 0.5s ${delay}s ease-out forwards`,
      opacity: 0,
    }}
  >
    <h3 className="text-xl font-bold text-white">{name}</h3>
    <ul className="space-y-2">
      {features.map((feature, i) => (
        <li
          key={i}
          className="flex items-center gap-3 text-sm text-neutral-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-orange-400"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <p className="text-xs text-neutral-500 mt-auto pt-4">Creator: {author}</p>
  </div>
);

const HubsGrid = () => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-24 sm:py-32">
      <h2 className="text-3xl font-bold text-center text-white mb-4">
        Featured Script Hubs
      </h2>
      <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">
        A curated collection of the most reliable and powerful script hubs,
        verified for performance and security.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hubsData.map((hub, i) => (
          <HubCard key={hub.name} {...hub} delay={i * 0.15} />
        ))}
      </div>
    </div>
  );
};

/**
 * The main page component that uses the GridBackground and floating Navbar.
 */
export default function Home() {
  return (
    <main className="relative bg-black text-neutral-300 flex flex-col items-center p-4 overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <GridBackground />
      <Navbar />

      {/* The foreground content */}
      <div className="relative z-10 text-center flex flex-col items-center pt-32 sm:pt-48 min-h-screen">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pb-4">
          Elevate Your Roblox Experience
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
          Discover powerful and secure script hubs to gain the competitive edge.
        </p>
      </div>

      <HubsGrid />
    </main>
  );
}
