"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { GitBranch, BookOpen, Search, Menu, X, ExternalLink } from "lucide-react";
import { SearchModal } from "@/components/SearchModal";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navLinks = [
    { href: "/docs", label: "Docs" },
    { href: "/docs/api", label: "API" },
    { href: "/docs/local-setup", label: "Setup" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/30"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex h-[60px] items-center px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mr-8 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/25">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-[15px] hidden sm:block">
              <span className="text-white">Airbnb Clone</span>
              <span className="text-zinc-500 ml-1">Docs</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href || pathname?.startsWith(link.href + "/")
                    ? "text-white bg-white/[0.06]"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08] transition-all text-sm"
              aria-label="Search documentation"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:block text-xs">Search docs...</span>
              <kbd className="hidden lg:flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded text-[10px] bg-white/[0.06] border border-white/[0.1] font-mono">
                <span>⌘</span>K
              </kbd>
            </button>

            {/* Live Demo */}
            <Link
              href="https://airbnb-clone-one-coral.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 transition-all"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Demo
            </Link>

            {/* GitHub */}
            <Link
              href="https://github.com/Aryan07175/airbnb-clone"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
              aria-label="GitHub repository"
            >
              <GitBranch className="h-4 w-4" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-[#09090b]/95 backdrop-blur-xl px-4 py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-white bg-white/[0.08]"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://airbnb-clone-one-coral.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-rose-400 hover:text-rose-300"
                onClick={() => setMobileOpen(false)}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
