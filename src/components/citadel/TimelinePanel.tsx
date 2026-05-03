import { useState } from "react";
import { Play, Pause, Rewind, FastForward, History, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TimelinePanel() {
  const [mode, setMode] = useState<"replay" | "live" | "predict">("live");
  const [playing, setPlaying] = useState(true);

  return (
    <div className="panel p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="label-tiny">Timeline</div>
          <div className="text-xs mono">2026-05-03 · 14:22:08 UTC</div>
        </div>
        <div className="flex items-center gap-1">
          {[
            { id: "replay", label: "Replay", icon: History },
            { id: "live", label: "Live", icon: Zap },
            { id: "predict", label: "Forecast", icon: FastForward },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id as typeof mode)}
                className={cn(
                  "px-2 py-1 rounded text-[10px] mono uppercase tracking-wider flex items-center gap-1",
                  mode === m.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary",
                )}
              >
                <Icon className="h-3 w-3" />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <button className="p-1.5 rounded hover:bg-secondary"><Rewind className="h-3 w-3" /></button>
        <button onClick={() => setPlaying(!playing)} className="p-1.5 rounded bg-primary text-primary-foreground">
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>
        <button className="p-1.5 rounded hover:bg-secondary"><FastForward className="h-3 w-3" /></button>
        <div className="text-[10px] mono text-muted-foreground ml-1">1x</div>
      </div>

      <div className="flex-1 relative bg-background/60 rounded border border-border overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 60">
          {/* gridlines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" x2="200" y1={i * 15} y2={i * 15} stroke="hsl(var(--border))" strokeWidth="0.3" />
          ))}
          {/* historical area */}
          <path
            d="M0,40 L20,38 L40,42 L60,30 L80,32 L100,28 L120,22 L140,25 L160,18 L180,20 L200,15 L200,60 L0,60 Z"
            fill="hsl(var(--primary) / 0.2)"
          />
          <path
            d="M0,40 L20,38 L40,42 L60,30 L80,32 L100,28 L120,22 L140,25 L160,18 L180,20 L200,15"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.8"
          />
          {/* now line */}
          <line x1="140" x2="140" y1="0" y2="60" stroke="hsl(var(--positive))" strokeWidth="0.6" strokeDasharray="2 2" />
          {/* forecast */}
          <path
            d="M140,25 L160,18 L180,20 L200,15"
            fill="none"
            stroke="hsl(var(--warning))"
            strokeWidth="0.8"
            strokeDasharray="2 1"
          />
        </svg>
        <div className="absolute bottom-1 left-2 label-tiny">-7d</div>
        <div className="absolute bottom-1 right-2 label-tiny">+3d</div>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 label-tiny text-positive">NOW</div>
      </div>
    </div>
  );
}
