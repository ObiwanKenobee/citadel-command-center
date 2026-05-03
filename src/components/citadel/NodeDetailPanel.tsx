import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NodeData {
  id: string;
  type: string;
  name: string;
  status: string;
  value: number;
}

interface Props {
  node: NodeData | null;
  onClose: () => void;
}

const STATUS_TEXT: Record<string, { label: string; cls: string }> = {
  ok: { label: "Operational", cls: "text-positive" },
  warn: { label: "Warning", cls: "text-warning" },
  crit: { label: "Critical", cls: "text-critical" },
};

export default function NodeDetailPanel({ node, onClose }: Props) {
  if (!node) return null;
  const s = STATUS_TEXT[node.status];
  return (
    <div className="absolute top-4 right-4 panel w-80 z-20 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <div>
            <div className="label-tiny">{node.type} · {node.id}</div>
            <div className="text-sm font-semibold">{node.name}</div>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-secondary">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded border border-border p-2">
            <div className="label-tiny">Status</div>
            <div className={`text-sm mono ${s.cls}`}>{s.label}</div>
          </div>
          <div className="rounded border border-border p-2">
            <div className="label-tiny">Capacity</div>
            <div className="text-sm mono">{node.value}%</div>
          </div>
        </div>
        <div>
          <div className="label-tiny mb-1.5">Sensor Streams</div>
          <div className="space-y-1.5 text-xs mono">
            {[
              { k: "Air Quality", v: "Good", c: "text-positive" },
              { k: "Structural Stress", v: "Normal", c: "text-positive" },
              { k: "Water Supply", v: "Stable", c: "text-positive" },
              { k: "Power Draw", v: "4.2 kW", c: "text-foreground" },
            ].map((r) => (
              <div key={r.k} className="flex justify-between">
                <span className="text-muted-foreground">{r.k}</span>
                <span className={r.c}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 pt-1">
          <Button size="sm" className="flex-1 h-8 text-xs">Inspect</Button>
          <Button size="sm" variant="secondary" className="flex-1 h-8 text-xs">Dispatch</Button>
        </div>
      </div>
    </div>
  );
}
