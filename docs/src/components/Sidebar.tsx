"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  {
    title: "Getting Started",
    items: [
      { title: "Overview", href: "/docs" },
      { title: "Features", href: "/docs/features" },
      { title: "Architecture", href: "/docs/architecture" },
      { title: "Tech Stack", href: "/docs/tech-stack" },
    ],
  },
  {
    title: "Core Modules",
    items: [
      { title: "Frontend", href: "/docs/frontend" },
      { title: "Backend", href: "/docs/backend" },
      { title: "Database", href: "/docs/database" },
      { title: "API Reference", href: "/docs/api" },
    ],
  },
  {
    title: "Workflows",
    items: [
      { title: "Booking Flow", href: "/docs/booking-flow" },
      { title: "Host Dashboard", href: "/docs/host-dashboard" },
    ],
  },
  {
    title: "Setup & Deployment",
    items: [
      { title: "Local Setup", href: "/docs/local-setup" },
      { title: "Environment Variables", href: "/docs/environment-variables" },
      { title: "Folder Structure", href: "/docs/folder-structure" },
      { title: "Deployment", href: "/docs/deployment" },
    ],
  },
  {
    title: "Help",
    items: [
      { title: "Troubleshooting", href: "/docs/troubleshooting" },
      { title: "FAQ", href: "/docs/faq" },
      { title: "License", href: "/docs/license" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full py-4">
      {ROUTES.map((group) => (
        <div key={group.title} className="mb-6">
          <h4 className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
            {group.title}
          </h4>
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex w-full items-center rounded-lg px-3 py-1.5 text-sm transition-all ${
                    isActive
                      ? "bg-rose-500/10 text-rose-400 font-medium border-l-2 border-rose-500 ml-0 pl-[10px]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
