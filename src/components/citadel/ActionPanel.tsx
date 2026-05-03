import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, PlayCircle, Shield } from "lucide-react";

const ACTIONS = [
  {
    title: "Deploy Mobile Clinic",
    zone: "Zone B",
    impact: "Reduce cases by 35%",
    eta: "48h response",
    cost: "$3,200",
    confidence: 87,
  },
  {
    title: "Reroute Water Supply",
    zone: "Sector 4",
    impact: "Mitigate contamination 92%",
    eta: "6h",
    cost: "$1,150",
    confidence: 94,
  },
  {
    title: "Pre-position Food Reserves",
    zone: "Zone C",
    impact: "Cover 5-day deficit",
    eta: "72h",
    cost: "$8,400",
    confidence: 78,
  },
];

export default function ActionPanel() {
  return (
    <div className="panel flex flex-col h-full overflow-hidden">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <Shield className="h-4 w-4 text-primary" />
        <div>
          <div className="label-tiny">Action Queue</div>
          <div className="text-xs mono">{ACTIONS.length} pending approvals</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {ACTIONS.map((a, idx) => (
          <div key={idx} className="rounded border border-border bg-background/40 p-3 hover:border-primary/60 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="text-sm font-medium">{a.title}</div>
                <div className="label-tiny mt-0.5">{a.zone}</div>
              </div>
              <div className="text-right">
                <div className="text-xs mono text-positive">{a.confidence}%</div>
                <div className="label-tiny">conf</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] mono mb-3">
              <div>
                <div className="label-tiny">Impact</div>
                <div className="text-positive truncate">{a.impact}</div>
              </div>
              <div>
                <div className="label-tiny">ETA</div>
                <div>{a.eta}</div>
              </div>
              <div>
                <div className="label-tiny">Cost</div>
                <div>{a.cost}</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              <Button size="sm" className="flex-1 h-7 text-[11px]">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Approve
              </Button>
              <Button size="sm" variant="secondary" className="flex-1 h-7 text-[11px]">
                <PlayCircle className="h-3 w-3 mr-1" /> Simulate
              </Button>
              <Button size="sm" variant="ghost" className="h-7 px-2">
                <Clock className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
