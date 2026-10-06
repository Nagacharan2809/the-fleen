export type DemoMode = "reason" | "code" | "transform";

export interface DemoScenario {
  id: DemoMode;
  index: string;
  title: string;
  question: string;
  input: string;
  processing: string[];
  outputTitle: string;
  output: string[];
  note: string;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "reason",
    index: "01",
    title: "Technical reasoning",
    question: "Can FLEEN follow a failure to its cause?",
    input:
      "A batch pipeline passes on retry but fails on schedule. Logs show a 40s stall before the object-store read, then a timeout. No code changed. Diagnose.",
    processing: [
      "parsing incident statement",
      "isolating time-bound evidence",
      "separating constant vs. variable factors",
      "ordering hypotheses by falsifiability",
    ],
    outputTitle: "Ordered diagnosis",
    output: [
      "1. The 40s stall precedes the read, so the read is the victim, not the cause. Suspect credential refresh or DNS on the scheduler path.",
      "2. Retry passes because it runs outside the scheduled window — compare scheduler environment, not application code.",
      "3. Falsify in order: (a) time-boxed credential TTL, (b) scheduled-route egress policy, (c) cold connection-pool on cron worker.",
      "4. Confirming test: run the scheduled job with a warmed pool and a traced auth call. If the stall moves, you have found the layer.",
    ],
    note: "Illustrative output authored for this demonstration surface.",
  },
  {
    id: "code",
    index: "02",
    title: "Code generation",
    question: "Can FLEEN produce inspectable code?",
    input:
      "Write a rate-limited fetch queue in TypeScript. Max 4 concurrent, exponential backoff, caller-cancellable.",
    processing: [
      "extracting constraints",
      "selecting queue structure",
      "drafting cancellation semantics",
      "checking backoff bounds",
    ],
    outputTitle: "fetch-queue.ts",
    output: [
      "type Task<T> = (signal: AbortSignal) => Promise<T>;",
      "export async function runQueue<T>(tasks: Task<T>[], limit = 4) {",
      "  const results: T[] = []; const active = new Set<Promise<void>>();",
      "  for (const task of tasks) {",
      "    while (active.size >= limit) await Promise.race(active);",
      "    const ctl = new AbortController();",
      "    const p = task(ctl.signal).then(r => { results.push(r); });",
      "    active.add(p); p.finally(() => active.delete(p));",
      "  }",
      "  await Promise.all(active); return results;",
      "}",
    ],
    note: "Simplified for display. Full implementation ships with backoff and tests in documentation.",
  },
  {
    id: "transform",
    index: "03",
    title: "Document understanding",
    question: "Can FLEEN turn dense text into a usable artifact?",
    input:
      "Paste: a 14-page vendor agreement. Produce: obligations table, termination triggers, renewal dates.",
    processing: [
      "segmenting document structure",
      "resolving defined terms",
      "extracting dated obligations",
      "tabulating triggers",
    ],
    outputTitle: "Agreement → obligations table",
    output: [
      "OBLIGATION              OWNER     DATE / TRIGGER",
      "Uptime report           Vendor    monthly, by day 5",
      "Security review         Vendor    annually + on breach",
      "Termination for cause   Either    30-day cure period",
      "Auto-renewal            Client    60-day notice window",
    ],
    note: "Illustrative schema. FLEEN cites clause numbers in the full output.",
  },
];
