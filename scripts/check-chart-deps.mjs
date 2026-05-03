#!/usr/bin/env node
/**
 * Verifies that chart-related dependencies stay on versions compatible
 * with the shadcn `chart.tsx` component (Recharts v2 API).
 *
 * Fails (exit 1) if installed versions drift outside the allowed range.
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const REQUIREMENTS = [
  {
    name: "recharts",
    // shadcn chart.tsx uses Recharts v2 prop types (TooltipProps payload/label,
    // Legend payload). v3 broke these. Lock to >=2.13 <3.
    min: "2.13.0",
    maxExclusive: "3.0.0",
    verified: "2.15.4",
  },
];

function parse(v) {
  return v.replace(/^[v^~]/, "").split("-")[0].split(".").map(Number);
}
function cmp(a, b) {
  const A = parse(a), B = parse(b);
  for (let i = 0; i < 3; i++) if ((A[i] ?? 0) !== (B[i] ?? 0)) return (A[i] ?? 0) - (B[i] ?? 0);
  return 0;
}

let failed = false;
for (const r of REQUIREMENTS) {
  let installed;
  try {
    installed = require(`${r.name}/package.json`).version;
  } catch {
    console.error(`✖ ${r.name} is not installed`);
    failed = true;
    continue;
  }
  const ok = cmp(installed, r.min) >= 0 && cmp(installed, r.maxExclusive) < 0;
  const marker = ok ? "✓" : "✖";
  const note = installed === r.verified ? " (verified)" : "";
  console.log(`${marker} ${r.name}@${installed}${note} — required >=${r.min} <${r.maxExclusive}`);
  if (!ok) failed = true;
}

// Also verify shadcn chart.tsx still exists where expected.
try {
  const src = readFileSync("src/components/ui/chart.tsx", "utf8");
  if (!src.includes("recharts")) {
    console.error("✖ src/components/ui/chart.tsx does not import recharts");
    failed = true;
  } else {
    console.log("✓ src/components/ui/chart.tsx present and imports recharts");
  }
} catch {
  console.error("✖ src/components/ui/chart.tsx not found");
  failed = true;
}

if (failed) {
  console.error("\nChart dependency check failed.");
  process.exit(1);
}
console.log("\nAll chart dependency checks passed.");
