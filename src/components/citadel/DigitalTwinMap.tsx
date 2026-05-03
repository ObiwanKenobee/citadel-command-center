import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NAIROBI: [number, number] = [36.8219, -1.2921];

const NODES = [
  { id: "C-A12", type: "Clinic", name: "Clinic A12", lng: 36.817, lat: -1.286, status: "ok", value: 82 },
  { id: "W-S4", type: "Water", name: "Water Node S4", lng: 36.835, lat: -1.298, status: "warn", value: 64 },
  { id: "E-G1", type: "Energy", name: "Solar Grid G1", lng: 36.808, lat: -1.305, status: "ok", value: 91 },
  { id: "F-Z3", type: "Food", name: "Food Hub Z3", lng: 36.828, lat: -1.279, status: "ok", value: 73 },
  { id: "H-B2", type: "Clinic", name: "Hospital B2", lng: 36.802, lat: -1.295, status: "crit", value: 96 },
  { id: "S-N7", type: "Sensor", name: "AQI Sensor N7", lng: 36.840, lat: -1.275, status: "warn", value: 58 },
  { id: "M-T1", type: "Mobility", name: "Drone Pad T1", lng: 36.815, lat: -1.310, status: "ok", value: 40 },
  { id: "E-W2", type: "Energy", name: "Wind Array W2", lng: 36.795, lat: -1.288, status: "ok", value: 77 },
];

const STATUS_COLOR: Record<string, string> = {
  ok: "hsl(145 80% 50%)",
  warn: "hsl(38 95% 55%)",
  crit: "hsl(0 85% 58%)",
};

interface Props {
  activeLayers: Record<string, boolean>;
  onSelectNode: (n: typeof NODES[number]) => void;
}

const TOKEN_KEY = "mapbox_token";

export default function DigitalTwinMap({ activeLayers, onSelectNode }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [token, setToken] = useState<string>(() => localStorage.getItem(TOKEN_KEY) || "");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;
    mapboxgl.accessToken = token;
    try {
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: NAIROBI,
        zoom: 12.2,
        pitch: 45,
        bearing: -10,
        attributionControl: false,
      });
      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
      mapRef.current = map;
    } catch (e) {
      console.error(e);
    }
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [token]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    NODES.forEach((n) => {
      const layerKey = n.type.toLowerCase();
      if (!activeLayers[layerKey] && activeLayers[layerKey] !== undefined) return;

      const el = document.createElement("div");
      el.className = "relative cursor-pointer";
      el.innerHTML = `
        <div class="pulse-dot" style="
          width:14px;height:14px;border-radius:9999px;
          background:${STATUS_COLOR[n.status]};
          border:2px solid hsl(222 47% 5%);
          box-shadow:0 0 12px ${STATUS_COLOR[n.status]};
        "></div>
      `;
      el.addEventListener("click", () => onSelectNode(n));

      const marker = new mapboxgl.Marker(el).setLngLat([n.lng, n.lat]).addTo(map);
      markersRef.current.push(marker);
    });
  }, [activeLayers, onSelectNode, token]);

  if (!token) {
    return (
      <div className="h-full w-full flex items-center justify-center p-6">
        <div className="panel p-6 max-w-md w-full">
          <div className="label-tiny mb-2">Mapbox Token Required</div>
          <h3 className="text-lg font-semibold mb-2">Connect Digital Twin</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Paste your Mapbox public token to activate the Nairobi node map. Get one at{" "}
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              mapbox.com
            </a>
            .
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="pk.eyJ1Ijoi..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="mono text-xs"
            />
            <Button
              onClick={() => {
                localStorage.setItem(TOKEN_KEY, draft.trim());
                setToken(draft.trim());
              }}
              disabled={!draft.trim()}
            >
              Activate
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full scanline">
      <div ref={containerRef} className="absolute inset-0" />
      {/* corner overlays */}
      <div className="absolute top-3 left-3 panel px-3 py-2 z-10">
        <div className="label-tiny">Live Feed</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="h-2 w-2 rounded-full bg-positive pulse-dot" />
          <span className="text-xs mono">NAIROBI · 04°S 36°E</span>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 panel px-3 py-2 z-10">
        <div className="label-tiny">Active Nodes</div>
        <div className="text-xs mono">{NODES.length} streams</div>
      </div>
    </div>
  );
}
