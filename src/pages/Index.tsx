import { useState } from "react";
import CommandHeader from "@/components/citadel/CommandHeader";
import ModuleNav from "@/components/citadel/ModuleNav";
import DigitalTwinMap from "@/components/citadel/DigitalTwinMap";
import TimelinePanel from "@/components/citadel/TimelinePanel";
import AIInsightsPanel from "@/components/citadel/AIInsightsPanel";
import ActionPanel from "@/components/citadel/ActionPanel";
import NodeDetailPanel from "@/components/citadel/NodeDetailPanel";
import LayerToggle from "@/components/citadel/LayerToggle";

const Index = () => {
  const [activeModule, setActiveModule] = useState("health");
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [layers, setLayers] = useState<Record<string, boolean>>({
    clinic: true,
    sensor: true,
    water: true,
    energy: true,
    food: true,
    mobility: true,
    governance: true,
  });

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      <CommandHeader />
      <div className="flex-1 flex gap-2 p-2 min-h-0">
        <ModuleNav active={activeModule} onSelect={setActiveModule} />

        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="flex-1 panel relative overflow-hidden min-h-0">
            <LayerToggle
              active={layers}
              onToggle={(k) => setLayers((l) => ({ ...l, [k]: !l[k] }))}
            />
            <DigitalTwinMap activeLayers={layers} onSelectNode={setSelectedNode} />
            <NodeDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
          </div>
          <div className="h-44 shrink-0">
            <TimelinePanel />
          </div>
        </div>

        <div className="w-80 shrink-0 flex flex-col gap-2">
          <div className="flex-1 min-h-0">
            <AIInsightsPanel />
          </div>
        </div>
        <div className="w-80 shrink-0 flex flex-col gap-2">
          <div className="flex-1 min-h-0">
            <ActionPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
