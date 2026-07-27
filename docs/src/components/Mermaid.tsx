"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.render(`mermaid-${Math.random().toString(36).substring(7)}`, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
        }
      });
    }
  }, [chart]);

  return (
    <div className="flex justify-center my-8 p-6 bg-zinc-950 border border-zinc-800 rounded-xl overflow-x-auto">
      <div ref={ref} className="mermaid-container" />
    </div>
  );
}
