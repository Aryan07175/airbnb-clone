"use client";

import { useState } from "react";
import { ChevronRight, Folder, FolderOpen, FileCode, FileJson, File } from "lucide-react";

interface TreeNode {
  name: string;
  type: "file" | "dir";
  description?: string;
  highlight?: boolean;
  children?: TreeNode[];
}

function getFileIcon(name: string) {
  if (name.endsWith(".tsx") || name.endsWith(".ts")) return <FileCode className="h-3.5 w-3.5 text-blue-400" />;
  if (name.endsWith(".py")) return <FileCode className="h-3.5 w-3.5 text-yellow-400" />;
  if (name.endsWith(".json")) return <FileJson className="h-3.5 w-3.5 text-amber-400" />;
  if (name.endsWith(".css")) return <FileCode className="h-3.5 w-3.5 text-pink-400" />;
  if (name.endsWith(".md")) return <File className="h-3.5 w-3.5 text-zinc-400" />;
  if (name.endsWith(".env") || name.startsWith(".env")) return <File className="h-3.5 w-3.5 text-emerald-400" />;
  if (name.endsWith(".yml") || name.endsWith(".yaml")) return <File className="h-3.5 w-3.5 text-rose-400" />;
  return <File className="h-3.5 w-3.5 text-zinc-500" />;
}

function TreeNodeView({ node, depth = 0, defaultOpen = false }: { node: TreeNode; depth?: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || depth < 2);

  if (node.type === "dir") {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-1.5 w-full px-2 py-1 rounded-md text-sm hover:bg-white/[0.04] transition-colors text-left ${
            node.highlight ? "text-rose-300" : "text-zinc-300"
          }`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
        >
          <ChevronRight
            className={`h-3 w-3 text-zinc-600 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
          />
          {open ? (
            <FolderOpen className="h-3.5 w-3.5 text-rose-400 shrink-0" />
          ) : (
            <Folder className="h-3.5 w-3.5 text-rose-400/60 shrink-0" />
          )}
          <span className="font-medium">{node.name}</span>
          {node.description && (
            <span className="ml-2 text-xs text-zinc-600 truncate"># {node.description}</span>
          )}
        </button>
        {open && node.children && (
          <div>
            {node.children.map((child, i) => (
              <TreeNodeView key={i} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-sm ${
        node.highlight ? "text-rose-300" : "text-zinc-500 hover:text-zinc-300"
      } hover:bg-white/[0.03] transition-colors`}
      style={{ paddingLeft: `${8 + depth * 16}px` }}
    >
      <span className="w-3 shrink-0" />
      {getFileIcon(node.name)}
      <span className="font-mono">{node.name}</span>
      {node.description && (
        <span className="ml-2 text-xs text-zinc-600 truncate"># {node.description}</span>
      )}
    </div>
  );
}

export function FolderTree({ tree, title }: { tree: TreeNode[]; title?: string }) {
  return (
    <div className="my-6 rounded-xl border border-white/[0.07] bg-[#0d0d0f] overflow-hidden">
      {title && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-[#111113]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-zinc-500 ml-2 font-mono">{title}</span>
        </div>
      )}
      <div className="p-3 font-mono text-sm">
        {tree.map((node, i) => (
          <TreeNodeView key={i} node={node} defaultOpen />
        ))}
      </div>
    </div>
  );
}
