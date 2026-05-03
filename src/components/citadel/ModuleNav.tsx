import {
  Heart, Leaf, Zap, Droplets, Utensils, Ambulance, Scale, Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODULES = [
  { id: "health", name: "Health", icon: Heart, score: 82, delta: +1.2 },
  { id: "environment", name: "Environment", icon: Leaf, score: 74, delta: -0.8 },
  { id: "water", name: "Water", icon: Droplets, score: 69, delta: -2.1 },
  { id: "food", name: "Food", icon: Utensils, score: 76, delta: +0.4 },
  { id: "energy", name: "Energy", icon: Zap, score: 88, delta: +3.2 },
  { id: "mobility", name: "Mobility", icon: Ambulance, score: 71, delta: 0 },
  { id: "governance", name: "Governance", icon: Scale, score: 79, delta: +0.6 },
];

interface Props {
  active: string;
  onSelect: (id: string) => void;
}

export default function ModuleNav({ active, onSelect }: Props) {
  return (
    <aside className="panel w-60 shrink-0 flex flex-col">
      <div className="px-3 py-3 border-b border-border flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <div>
          <div className="label-tiny">Modules</div>
          <div className="text-xs mono">Intelligence Stack</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {MODULES.map((m) => {
          const Icon = m.icon;
          const isActive = active === m.id;
          const trendColor =
            m.delta > 0 ? "text-positive" : m.delta < 0 ? "text-critical" : "text-muted-foreground";
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 flex items-center gap-3 border-l-2 transition-colors",
                isActive
                  ? "border-primary bg-secondary/60"
                  : "border-transparent hover:bg-secondary/30",
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
              <div className="flex-1 min-w-0">
                <div className="text-sm">{m.name}</div>
                <div className="text-[10px] mono text-muted-foreground">SCORE {m.score}</div>
              </div>
              <div className={cn("text-[10px] mono", trendColor)}>
                {m.delta > 0 ? "▲" : m.delta < 0 ? "▼" : "—"}
                {Math.abs(m.delta).toFixed(1)}
              </div>
            </button>
          );
        })}
      </nav>
      <div className="border-t border-border p-3">
        <div className="label-tiny mb-1">System Load</div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-positive" style={{ width: "62%" }} />
        </div>
        <div className="text-[10px] mono text-muted-foreground mt-1">62% · 14k events/s</div>
      </div>
    </aside>
  );
}
