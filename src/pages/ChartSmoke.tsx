import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis,
} from "recharts";

const data = [
  { d: "Mon", visits: 240, signups: 24 },
  { d: "Tue", visits: 310, signups: 41 },
  { d: "Wed", visits: 280, signups: 33 },
  { d: "Thu", visits: 390, signups: 58 },
  { d: "Fri", visits: 420, signups: 62 },
  { d: "Sat", visits: 360, signups: 49 },
  { d: "Sun", visits: 480, signups: 71 },
];

const config = {
  visits: { label: "Visits", color: "hsl(199 100% 55%)" },
  signups: { label: "Signups", color: "hsl(145 80% 45%)" },
} as const;

export default function ChartSmoke() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-xl font-semibold mb-1">Chart Smoke Test</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Renders representative shadcn + Recharts charts to catch typing or runtime regressions.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <section className="panel p-4">
          <h2 className="text-sm font-medium mb-2">LineChart</h2>
          <ChartContainer config={config} className="h-56 w-full">
            <LineChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="d" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line dataKey="visits" stroke="var(--color-visits)" strokeWidth={2} dot={false} />
              <Line dataKey="signups" stroke="var(--color-signups)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </section>

        <section className="panel p-4">
          <h2 className="text-sm font-medium mb-2">BarChart</h2>
          <ChartContainer config={config} className="h-56 w-full">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="d" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="visits" fill="var(--color-visits)" radius={4} />
              <Bar dataKey="signups" fill="var(--color-signups)" radius={4} />
            </BarChart>
          </ChartContainer>
        </section>

        <section className="panel p-4">
          <h2 className="text-sm font-medium mb-2">AreaChart</h2>
          <ChartContainer config={config} className="h-56 w-full">
            <AreaChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="d" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="visits" stroke="var(--color-visits)" fill="var(--color-visits)" fillOpacity={0.25} />
            </AreaChart>
          </ChartContainer>
        </section>
      </div>
    </main>
  );
}
