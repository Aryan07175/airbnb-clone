"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface Props {
  children?: React.ReactNode;
  language?: string;
  filename?: string;
  [key: string]: unknown;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in (node as object)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return extractText(el.props?.children);
  }
  return "";
}

export function CodeBlock({ children, language, filename, ...props }: Props) {
  const [copied, setCopied] = useState(false);

  const textContent = extractText(children);
  const lang = language ?? "bash";

  const onCopy = () => {
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-white/[0.07] bg-[#0d0d0f] shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#111113] border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ff9500] transition-colors" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#00bb2d] transition-colors" />
          </div>
          {filename && (
            <span className="text-xs text-zinc-500 font-mono ml-1">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {lang && (
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              {lang}
            </span>
          )}
          <button
            onClick={onCopy}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-all ${
              copied
                ? "text-emerald-400 bg-emerald-500/10"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06]"
            }`}
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check size={12} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* Code body */}
      <div className="overflow-x-auto">
        <pre
          className="p-4 text-sm font-mono text-zinc-300 leading-relaxed"
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

// Inline code wrapper
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[0.85em] font-mono">
      {children}
    </code>
  );
}

// Terminal-style command block with copy button
export function CommandBlock({ command, description }: { command: string; description?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-white/[0.07] bg-[#0d0d0f]">
      {description && (
        <div className="px-4 py-2 border-b border-white/[0.06] bg-[#111113] text-xs text-zinc-500">
          {description}
        </div>
      )}
      <div className="flex items-center gap-3 px-4 py-3">
        <Terminal className="h-4 w-4 text-zinc-600 shrink-0" />
        <code className="flex-1 text-sm font-mono text-zinc-200">{command}</code>
        <button
          onClick={() => {
            navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all shrink-0 ${
            copied
              ? "text-emerald-400 bg-emerald-500/10"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06]"
          }`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
