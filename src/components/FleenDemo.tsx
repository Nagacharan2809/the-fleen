"use client";

import { useEffect, useRef, useState } from "react";
import { DEMO_SCENARIOS, type DemoMode } from "@/lib/demo";

/**
 * FLEEN DEMO — a computational instrument, not a chatbot card.
 * States: input → processing (meaningful lattice pulse) → output (strongest hierarchy).
 * Outputs are authored illustrative samples, labelled as such. No invented benchmarks.
 */
type Phase = "idle" | "processing" | "done";

export default function FleenDemo() {
  const [mode, setMode] = useState<DemoMode>("reason");
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState(DEMO_SCENARIOS[0].input);
  const timers = useRef<number[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  const scenario = DEMO_SCENARIOS.find((s) => s.id === mode)!;

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const run = () => {
    clearTimers();
    setPhase("processing");
    setStep(0);
    scenario.processing.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setStep(i + 1), 550 * (i + 1))
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setPhase("done");
        outputRef.current?.focus({ preventScroll: false });
      }, 550 * (scenario.processing.length + 1))
    );
  };

  const selectMode = (m: DemoMode) => {
    clearTimers();
    setMode(m);
    setPhase("idle");
    setStep(0);
    setPrompt(DEMO_SCENARIOS.find((s) => s.id === m)!.input);
  };

  return (
    <section
      id="demo"
      aria-label="FLEEN working demonstration"
      className="relative border-t rule-dark scroll-mt-16"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <h2 data-chapter-title className="lexi-heading text-4xl md:text-[3.4rem]">
              Don&apos;t take<br />our word.<br />
              <span className="text-[#ede8db]/40">Watch it work.</span>
            </h2>
            <p className="mt-5 text-[#ede8db]/70 lexi-body-narrow leading-relaxed">
              Three instruments, one model. Select a task, run it, and
              inspect each transition. The processing trace is part of
              the output — not a spinner hiding one.
            </p>

            {/* Mode selector: subordinate to output */}
            <div role="tablist" aria-label="Demonstration modes" className="mt-8 border-t rule-dark">
              {DEMO_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={mode === s.id}
                  onClick={() => selectMode(s.id)}
                  className={`w-full flex items-center gap-4 text-left py-4 border-b rule-dark min-h-[44px] transition-colors ${
                    mode === s.id ? "text-[#ede8db]" : "text-[#ede8db]/45 hover:text-[#ede8db]/80"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`block h-2 w-2 flex-none transition-colors ${
                      mode === s.id ? "bg-[#e8490f]" : "border border-[#ede8db]/40"
                    }`}
                  />
                  <span className="font-semibold tracking-tight text-lg">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Instrument */}
          <div className="md:col-span-7">
            <div className="instrument">
              {/* input */}
              <div className="border-b rule-dark p-5 md:p-7">
                <div className="mb-3">
                  <label htmlFor="fleen-prompt" className="lexi-micro text-[#ede8db]/50">
                    Input — editable
                  </label>
                </div>
                <textarea
                  id="fleen-prompt"
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    if (phase === "done") setPhase("idle");
                  }}
                  rows={4}
                  className="w-full bg-transparent text-[1rem] md:text-[1.05rem] leading-relaxed text-[#ede8db] placeholder:text-[#ede8db]/30 resize-y min-h-[110px] focus:outline-none"
                />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={run}
                    disabled={phase === "processing"}
                    className="lexi-micro bg-[#e8490f] text-white px-6 py-3 hover:bg-[#ede8db] hover:text-[#0f110d] transition-colors disabled:opacity-50 disabled:cursor-wait min-h-[44px]"
                  >
                    {phase === "processing" ? "Processing…" : "Run FLEEN →"}
                  </button>
                  <button
                    onClick={() => selectMode(mode)}
                    className="lexi-micro border rule-dark px-5 py-3 text-[#ede8db]/70 hover:text-white transition-colors min-h-[44px]"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* processing — meaningful lattice pulse, not a spinner */}
              <div className="border-b rule-dark px-5 md:px-7 py-5" aria-live="polite">
                <p className="lexi-micro text-[#ede8db]/50 mb-3">Processing trace</p>
                {phase === "idle" ? (
                  <p className="text-[#ede8db]/40 text-[0.95rem]">Awaiting run. The trace will appear here, step by step.</p>
                ) : (
                  <ol className="space-y-2">
                    {scenario.processing.map((p, i) => {
                      const active = phase === "processing" && step === i + 1;
                      const done = phase === "done" || step > i + 1;
                      return (
                        <li key={p} className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className={`flex gap-1 ${done ? "" : active ? "animate-pulse" : "opacity-30"}`}
                          >
                            {Array.from({ length: 12 }).map((_, b) => (
                              <span
                                key={b}
                                className={`block h-[3px] w-2.5 ${
                                  done ? "bg-[#ede8db]/70" : active && b < ((step * 5) % 12) + 3 ? "bg-[#e8490f]" : "bg-[#ede8db]/25"
                                }`}
                              />
                            ))}
                          </span>
                          <span className={`lexi-mono text-[0.82rem] ${done || active ? "text-[#ede8db]" : "text-[#ede8db]/40"}`}>
                            {done ? "✓ " : ""}
                            {p}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>

              {/* output — strongest hierarchy */}
              <div className="p-5 md:p-7 bg-[#ede8db] text-[#0f110d] rounded-b-[2px]">
                <div className="flex items-center justify-between mb-3">
                  <p className="lexi-micro text-[#0f110d]/55">Output — {scenario.outputTitle}</p>
                  {phase === "done" && (
                    <button
                      onClick={() => navigator.clipboard?.writeText(scenario.output.join("\n"))}
                      className="lexi-micro text-[#0f110d]/60 hover:text-[#e8490f] min-h-[44px] px-2"
                    >
                      Copy output
                    </button>
                  )}
                </div>
                {phase !== "done" ? (
                  <p className="text-[#0f110d]/45 text-[0.95rem] leading-relaxed">
                    Output will be set in this panel — full-bleed, high contrast,
                    citable. Nothing here is a metric; it is work you can check.
                  </p>
                ) : (
                  <div ref={outputRef} tabIndex={-1} className="outline-none">
                    <pre className="lexi-mono text-[0.82rem] md:text-[0.88rem] leading-[1.7] whitespace-pre-wrap">
                      {scenario.output.join("\n")}
                    </pre>
                    <p className="lexi-micro text-[#0f110d]/50 mt-4 pt-3 border-t rule-light">
                      {scenario.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
