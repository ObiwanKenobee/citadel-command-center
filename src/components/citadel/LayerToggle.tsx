import { Heart, Leaf, Droplets, Zap, Utensils, Ambulance, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  active: Record<string, boolean>;
  onToggle: (k: string) => void;
}

const LAYERS = [
  { id: "clinic", name: "Health", icon: Heart },
  { id: "sensor", name: "Environment", icon: Leaf },
  { id: "water", name: "Water", icon: Droplets },
  { id: "energy", name: "Energy", icon: Zap },
  { id: "food", name: "Food", icon: Utensils },
  { id: "mobility", name: "Mobility", icon: Ambulance },
  { id: "governance", name: "Governance", icon: Scale },
];

export default function LayerToggle({ active, onToggle }: Props) {
  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 panel px-2 py-1.5 z-10 flex items-center gap-1">
      <span className="label-tiny pl-1 pr-2">Layers</span>
      {LAYERS.map((l) => {
        const Icon = l.icon;
        const isOn = active[l.id];
        return (
          <button
            key={l.id}
            onClick={() => onToggle(l.id)}
            title={l.name}
            className={cn(
              "p-1.5 rounded transition-colors",
              isOn ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-secondary",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
