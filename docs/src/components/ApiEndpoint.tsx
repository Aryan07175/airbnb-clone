"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  requestBody?: string;
  response?: string;
  statusCodes?: { code: number; description: string }[];
}

const METHOD_STYLES = {
  GET:    { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  POST:   { bg: "bg-blue-500/15",    text: "text-blue-400",    border: "border-blue-500/30" },
  PUT:    { bg: "bg-amber-500/15",   text: "text-amber-400",   border: "border-amber-500/30" },
  DELETE: { bg: "bg-rose-500/15",    text: "text-rose-400",    border: "border-rose-500/30" },
  PATCH:  { bg: "bg-purple-500/15",  text: "text-purple-400",  border: "border-purple-500/30" },
};

export function ApiEndpoint({ method, path, description, params, requestBody, response, statusCodes }: Endpoint) {
  const [open, setOpen] = useState(false);
  const style = METHOD_STYLES[method];

  return (
    <div className="mb-3 rounded-xl border border-white/[0.07] bg-[#111113] overflow-hidden hover:border-white/[0.12] transition-colors">
      {/* Header row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span
          className={`shrink-0 px-2.5 py-0.5 rounded-md text-xs font-bold font-mono border ${style.bg} ${style.text} ${style.border}`}
        >
          {method}
        </span>
        <code className="flex-1 text-sm text-zinc-200 font-mono">{path}</code>
        <span className="text-xs text-zinc-500 hidden sm:block truncate max-w-[200px]">{description}</span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-zinc-500 shrink-0" />
        )}
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-white/[0.06] px-4 py-4 space-y-4">
          <p className="text-sm text-zinc-400">{description}</p>

          {/* Query Params */}
          {params && params.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">Parameters</h4>
              <div className="rounded-lg border border-white/[0.06] overflow-hidden">
                {params.map((p, i) => (
                  <div key={p.name} className={`flex items-start gap-3 px-3 py-2 text-sm ${i !== 0 ? "border-t border-white/[0.04]" : ""}`}>
                    <code className="text-rose-300 font-mono text-xs shrink-0">{p.name}</code>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 font-mono ${p.required ? "bg-rose-500/15 text-rose-400" : "bg-zinc-800 text-zinc-500"}`}>
                      {p.required ? "required" : "optional"}
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono shrink-0">{p.type}</span>
                    <span className="text-xs text-zinc-500">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Request body */}
          {requestBody && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">Request Body</h4>
              <pre className="rounded-lg bg-[#0d0d0f] border border-white/[0.06] p-3 text-xs font-mono text-zinc-300 overflow-x-auto">
                {requestBody}
              </pre>
            </div>
          )}

          {/* Response */}
          {response && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">Example Response</h4>
              <pre className="rounded-lg bg-[#0d0d0f] border border-white/[0.06] p-3 text-xs font-mono text-zinc-300 overflow-x-auto">
                {response}
              </pre>
            </div>
          )}

          {/* Status codes */}
          {statusCodes && statusCodes.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-2">Status Codes</h4>
              <div className="flex flex-wrap gap-2">
                {statusCodes.map((s) => (
                  <span
                    key={s.code}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border ${
                      s.code < 300
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : s.code < 500
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}
                  >
                    <strong>{s.code}</strong>
                    <span className="text-zinc-500">—</span>
                    {s.description}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
