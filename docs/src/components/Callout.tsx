import { AlertCircle, Info, Lightbulb, TriangleAlert, XCircle } from "lucide-react";

type CalloutType = "default" | "warning" | "danger" | "info" | "tip";

type CalloutProps = {
  title?: string;
  children: React.ReactNode;
  type?: CalloutType;
};

const CONFIG: Record<CalloutType, { icon: React.ReactNode; style: string }> = {
  default: {
    icon: <Lightbulb size={16} />,
    style: "bg-zinc-900/60 border-zinc-700 text-zinc-200",
  },
  tip: {
    icon: <Lightbulb size={16} className="text-emerald-400" />,
    style: "bg-emerald-950/40 border-emerald-800/60 text-emerald-100",
  },
  warning: {
    icon: <TriangleAlert size={16} className="text-amber-400" />,
    style: "bg-amber-950/40 border-amber-800/60 text-amber-100",
  },
  danger: {
    icon: <XCircle size={16} className="text-rose-400" />,
    style: "bg-rose-950/40 border-rose-800/60 text-rose-100",
  },
  info: {
    icon: <Info size={16} className="text-blue-400" />,
    style: "bg-blue-950/40 border-blue-800/60 text-blue-100",
  },
};

export function Callout({ children, title, type = "default" }: CalloutProps) {
  const { icon, style } = CONFIG[type];

  return (
    <div
      className={`my-5 flex flex-col items-start p-4 rounded-xl border border-l-[3px] ${style}`}
    >
      <div className="flex items-center gap-2 font-semibold mb-1.5 text-sm">
        {icon}
        {title && <span>{title}</span>}
      </div>
      <div className="text-sm opacity-90 leading-relaxed [&_code]:bg-white/10 [&_code]:px-1 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono">
        {children}
      </div>
    </div>
  );
}
