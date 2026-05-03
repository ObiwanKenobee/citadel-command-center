import { Shield, Radio, Settings, Bell } from "lucide-react";

const KPIS = [
  { label: "RVS", value: 78, delta: "+2.3", tone: "positive" },
  { label: "Health", value: 82, delta: "+1.2", tone: "positive" },
  { label: "Env", value: 74, delta: "-0.8", tone: "critical" },
  { label: "Social", value: 76, delta: "+0.4", tone: "positive" },
  { label: "Moral", value: 79, delta: "+0.6", tone: "positive" },
];

export default function CommandHeader() {
  return (
    <header className="panel rounded-none border-x-0 border-t-0 px-4 py-2 flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Shield className="h-6 w-6 text-primary" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-positive pulse-dot" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wider glow-text">CITADEL COMMAND</div>
          <div className="label-tiny flex items-center gap-2">
            <Radio className="h-2.5 w-2.5 text-positive" /> Nairobi Node · LIVE
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center gap-2 overflow-x-auto">
        {KPIS.map((k) => (
          <div key={k.label} className="px-3 py-1.5 rounded border border-border bg-secondary/40 min-w-[110px]">
            <div className="label-tiny">{k.label}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-semibold mono">{k.value}</span>
              <span
                className={`text-[10px] mono ${
                  k.tone === "positive" ? "text-positive" : "text-critical"
                }`}
              >
                {k.delta.startsWith("-") ? "▼" : "▲"} {k.delta.replace("-", "")}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="label-tiny">UTC</div>
          <div className="text-xs mono">{new Date().toISOString().slice(11, 19)}</div>
        </div>
        <button className="p-2 rounded hover:bg-secondary relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-critical pulse-critical" />
        </button>
        <button className="p-2 rounded hover:bg-secondary">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
