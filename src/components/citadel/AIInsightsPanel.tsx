import { AlertTriangle, TrendingUp, Activity, Brain } from "lucide-react";

const INSIGHTS = [
  {
    type: "alert",
    icon: AlertTriangle,
    tone: "critical",
    title: "Respiratory illness +22%",
    body: "Zone B · Cause: AQI decline (PM2.5 168µg/m³)",
    time: "2m ago",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    tone: "warning",
    title: "Water contamination risk",
    body: "Sector 4 · Turbidity exceeds 5 NTU threshold",
    time: "8m ago",
  },
  {
    type: "prediction",
    icon: TrendingUp,
    tone: "primary",
    title: "Food shortage in 5 days",
    body: "Zone C · Supply/demand ratio dropping (0.84)",
    time: "14m ago",
  },
  {
    type: "anomaly",
    icon: Activity,
    tone: "warning",
    title: "Grid stress anomaly",
    body: "Solar Array G1 output 23% below forecast",
    time: "21m ago",
  },
  {
    type: "prediction",
    icon: TrendingUp,
    tone: "positive",
    title: "Regeneration uptick",
    body: "Soil index in Zone A trending +4.1 over 72h",
    time: "33m ago",
  },
];

const toneClasses: Record<string, { bar: string; icon: string; chip: string }> = {
  critical: { bar: "bg-critical", icon: "text-critical", chip: "text-critical" },
  warning: { bar: "bg-warning", icon: "text-warning", chip: "text-warning" },
  primary: { bar: "bg-primary", icon: "text-primary", chip: "text-primary" },
  positive: { bar: "bg-positive", icon: "text-positive", chip: "text-positive" },
};

export default function AIInsightsPanel() {
  return (
    <div className="panel flex flex-col h-full overflow-hidden">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <Brain className="h-4 w-4 text-primary" />
        <div>
          <div className="label-tiny">AI Insights</div>
          <div className="text-xs mono">Decision Engine · 5 active</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-positive pulse-dot" />
          <span className="text-[10px] mono text-muted-foreground">STREAMING</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {INSIGHTS.map((i, idx) => {
          const Icon = i.icon;
          const t = toneClasses[i.tone];
          return (
            <div key={idx} className="flex gap-3 p-3 hover:bg-secondary/30 cursor-pointer relative">
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${t.bar}`} />
              <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${t.icon}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="text-sm font-medium truncate">{i.title}</div>
                  <div className="text-[10px] mono text-muted-foreground shrink-0">{i.time}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{i.body}</div>
                <div className={`label-tiny mt-1.5 ${t.chip}`}>{i.type}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
