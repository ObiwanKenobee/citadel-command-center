import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Line, LineChart, Bar, BarChart, XAxis, YAxis } from "recharts";

const data = [
  { name: "A", visits: 12, signups: 4 },
  { name: "B", visits: 18, signups: 7 },
  { name: "C", visits: 9, signups: 2 },
];

const config = {
  visits: { label: "Visits", color: "hsl(199 100% 55%)" },
  signups: { label: "Signups", color: "hsl(145 80% 45%)" },
} as const;

describe("chart smoke", () => {
  it("renders a LineChart with tooltip + legend", () => {
    const { container } = render(
      <ChartContainer config={config} className="h-40 w-80">
        <LineChart data={data} width={320} height={160}>
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line dataKey="visits" stroke="var(--color-visits)" isAnimationActive={false} />
          <Line dataKey="signups" stroke="var(--color-signups)" isAnimationActive={false} />
        </LineChart>
      </ChartContainer>,
    );
    expect(container.querySelector("[data-chart]")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("renders a BarChart", () => {
    const { container } = render(
      <ChartContainer config={config} className="h-40 w-80">
        <BarChart data={data} width={320} height={160}>
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="visits" fill="var(--color-visits)" isAnimationActive={false} />
        </BarChart>
      </ChartContainer>,
    );
    expect(container.querySelector("[data-chart]")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
