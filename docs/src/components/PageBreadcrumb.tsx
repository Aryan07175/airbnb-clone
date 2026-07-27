import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export function PageBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-zinc-300 transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-zinc-700" />
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-zinc-300 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-zinc-400">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
