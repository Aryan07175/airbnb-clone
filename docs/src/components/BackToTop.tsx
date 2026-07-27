"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600 hover:shadow-rose-500/50 transition-all hover:scale-110 active:scale-95"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
