"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  GitBranch,
  ExternalLink,
  BookOpen,
  Home,
  Map,
  Calendar,
  Star,
  Zap,
  Shield,
  Database,
  Globe,
  Server,
  Code,
  Layers,
  Users,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";

const STATS = [
  { label: "Listings Seeded", value: "100+", icon: Home },
  { label: "API Endpoints", value: "25+", icon: Server },
  { label: "React Components", value: "30+", icon: Code },
  { label: "Database Tables", value: "7", icon: Database },
];

const FEATURES = [
  { icon: Home, title: "Listing Marketplace", description: "Browse 100+ seeded listings with photo carousels, category filters, and interactive map." },
  { icon: Map, title: "Interactive Map", description: "Leaflet-powered map with price-pin markers, clustering, and listing preview popups." },
  { icon: Calendar, title: "Booking Engine", description: "End-to-end booking with date validation, overlap detection, and real-time pricing." },
  { icon: Star, title: "Reviews & Ratings", description: "6-dimension review system with submission modals and aggregate star displays." },
  { icon: Zap, title: "FastAPI Backend", description: "High-performance Python backend with automatic OpenAPI docs and Pydantic validation." },
  { icon: Shield, title: "Host Dashboard", description: "Full CRUD for listings, revenue metrics, and reservation management for hosts." },
];

const TECH_STACK = [
  { name: "Next.js 14", color: "from-white to-zinc-400" },
  { name: "TypeScript", color: "from-blue-400 to-blue-600" },
  { name: "FastAPI", color: "from-emerald-400 to-teal-600" },
  { name: "TailwindCSS", color: "from-cyan-400 to-blue-500" },
  { name: "SQLAlchemy", color: "from-red-400 to-rose-600" },
  { name: "SQLite", color: "from-amber-400 to-orange-500" },
  { name: "Framer Motion", color: "from-purple-400 to-violet-600" },
  { name: "Leaflet", color: "from-emerald-400 to-green-600" },
  { name: "Pydantic v2", color: "from-rose-400 to-pink-600" },
  { name: "Vercel", color: "from-white to-zinc-500" },
];

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const FADE_SCALE: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b]">
      <Navbar />
      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-24 md:py-36">
          {/* Background effects */}
          <div className="absolute inset-0 mesh-bg" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              SDE Full Stack Assignment — Production Docs
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
            >
              <span className="gradient-text">Airbnb</span>
              <br />
              <span className="gradient-text-hero">Web App Clone</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed mb-10"
            >
              A pixel-perfect, full-stack Airbnb clone built with{" "}
              <span className="text-zinc-200 font-medium">Next.js 14</span>,{" "}
              <span className="text-zinc-200 font-medium">FastAPI</span>, and{" "}
              <span className="text-zinc-200 font-medium">SQLAlchemy</span>. Replicates the
              complete Airbnb UI, booking workflow, host dashboard, and listing management.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
            >
              <Link
                href="/docs"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105 active:scale-95"
              >
                <BookOpen className="h-4 w-4" />
                Read Documentation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://airbnb-clone-one-coral.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] text-zinc-200 font-semibold text-sm hover:bg-white/[0.08] hover:border-white/[0.2] transition-all hover:scale-105 active:scale-95"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
              <Link
                href="https://github.com/Aryan07175/airbnb-clone"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] text-zinc-200 font-semibold text-sm hover:bg-white/[0.08] hover:border-white/[0.2] transition-all hover:scale-105 active:scale-95"
              >
                <GitBranch className="h-4 w-4" />
                GitHub
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
            >
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={FADE_SCALE}
                    className="glass-card p-4 flex flex-col items-center gap-1.5 hover:border-white/[0.12] transition-colors"
                  >
                    <Icon className="h-5 w-5 text-rose-400 mb-0.5" />
                    <span className="text-2xl font-black text-white">{stat.value}</span>
                    <span className="text-xs text-zinc-500 text-center leading-tight">{stat.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={FADE_UP}
              className="text-center mb-12"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">Features</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3 tracking-tight">
                Everything Airbnb offers, rebuilt
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                A comprehensive implementation covering browse, search, booking, reviews, and host management.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={FADE_UP}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="glass-card p-6 hover:border-rose-500/20 hover:shadow-lg hover:shadow-rose-500/[0.05] transition-all cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-rose-400" />
                    </div>
                    <h3 className="font-semibold text-zinc-100 mb-2 text-[15px]">{feat.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{feat.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FADE_UP}
              className="text-center mb-8"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">Tech Stack</span>
              <h2 className="text-2xl font-bold text-white mt-2">Built with modern tools</h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={FADE_SCALE}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent border border-white/[0.08] bg-white/[0.04] cursor-default`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUICK START ── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FADE_UP}
              className="text-center mb-8"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">Quick Start</span>
              <h2 className="text-2xl font-bold text-white mt-2">Up and running in minutes</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Backend */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={FADE_UP}
                className="glass-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Server className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-zinc-200">Backend (FastAPI)</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  {["cd backend", "python -m pip install -r requirements.txt", "python seed.py", "python -m uvicorn main:app --reload"].map((cmd) => (
                    <div key={cmd} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0d0d0f] border border-white/[0.06]">
                      <span className="text-rose-400 shrink-0">$</span>
                      <span className="text-zinc-300">{cmd}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Frontend */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={FADE_UP}
                custom={1}
                className="glass-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-semibold text-zinc-200">Frontend (Next.js)</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  {["cd frontend", "npm install", "npm run dev"].map((cmd) => (
                    <div key={cmd} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0d0d0f] border border-white/[0.06]">
                      <span className="text-blue-400 shrink-0">$</span>
                      <span className="text-zinc-300">{cmd}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open http://localhost:3000
                </div>
              </motion.div>
            </div>
            <div className="text-center mt-6">
              <Link
                href="/docs/local-setup"
                className="inline-flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 transition-colors"
              >
                Full setup guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA FOOTER ── */}
        <section className="py-20 px-4 sm:px-6 border-t border-white/[0.04]">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FADE_UP}
            >
              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Ready to explore?
              </h2>
              <p className="text-zinc-400 mb-8">
                Dive into the complete documentation — from architecture diagrams to deployment guides.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/docs"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/25 hover:scale-105"
                >
                  <BookOpen className="h-4 w-4" />
                  Explore Docs
                </Link>
                <Link
                  href="/docs/api"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] text-zinc-200 font-semibold text-sm hover:bg-white/[0.08] transition-all"
                >
                  API Reference
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-rose-500" />
            <span>Airbnb Clone Docs · MIT License</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="hover:text-zinc-400 transition-colors">Docs</Link>
            <Link href="/docs/api" className="hover:text-zinc-400 transition-colors">API</Link>
            <Link href="https://github.com/Aryan07175/airbnb-clone" target="_blank" className="hover:text-zinc-400 transition-colors">GitHub</Link>
            <Link href="https://airbnb-clone-one-coral.vercel.app" target="_blank" className="hover:text-zinc-400 transition-colors">Live Demo</Link>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
