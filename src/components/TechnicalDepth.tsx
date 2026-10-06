"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";

/**
 * TECHNICAL DEPTH — progressive disclosure:
 * statement → visualization → detail. Research paper brought to life.
 * Values shown are structural; unmeasured quantities are marked TBD.
 */
const PANELS = [
  {
    id: "context",
    h: "Context as working memory",
    s: "Long inputs stay addressable — every clause retrievable, every reference resolvable.",
    viz: [92, 88, 84, 79, 81, 76, 74, 70],
    d: "Retention curve (illustrative shape, not a score): retrieval accuracy across document depth, measured by the clause-citation harness. Procedure publishes with the research release; readings marked TBD until then.",
  },
  {
    id: "inference",
    h: "Inference with a visible trace",
    s: "Each output carries the path that produced it — steps, sources, and the test that would falsify it.",
    viz: [34, 41, 47, 58, 66, 73, 82, 90],
    d: "Trace completeness: share of outputs shipping with stepwise provenance in evaluation runs. Harness defined; readings TBD. No latency or throughput figures are published until measured on production hardware.",
  },
  {
    id: "training",
    h: "Training for restraint",
    s: "Optimized for correct refusal and calibrated uncertainty — saying what it does not know, precisely.",
    viz: [55, 58, 61, 64, 68, 71, 74, 78],
    d: "Methodology: curated technical corpora, refusal calibration, and independent evaluation before release. Data composition and compute figures publish with the model card — not in advance.",
  },
];

export default function TechnicalDepth() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-tech-head]",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-tech-head]", start: "top 82%" },
        }
      );
    }, scope);
    return () => ctx.revert();
  }, []);

  const panel = PANELS[active];

  return (
    <section
      ref={scope}
      data-lexi-scope
      aria-label="Technical depth"
      className="border-t rule-dark"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <h2 data-tech-head className="lexi-heading text-4xl md:text-6xl max-w-[20ch]">
          Engineered claims, <span className="text-[#ede8db]/40">measurable in public.</span>
        </h2>

        {/* Tab row — progressive disclosure control */}
        <div role="tablist" aria-label="Technical areas" className="grid sm:grid-cols-3 border-t rule-dark mt-10">
          {PANELS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`text-left px-1 py-5 border-b rule-dark sm:border-b-0 sm:border-r last:border-r-0 sm:px-6 sm:first:pl-0 min-h-[44px] transition-colors ${
                active === i ? "text-[#ede8db]" : "text-[#ede8db]/45 hover:text-[#ede8db]/80"
              }`}
            >
              <span className="font-semibold tracking-tight">{p.h}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-8 mt-8 md:mt-10">
          <div className="md:col-span-7 instrument p-6 md:p-9">
            {/* Bar field: typographic data, not decoration */}
            <div className="flex items-end gap-2 h-44 md:h-56" role="img" aria-label={`${panel.h}: illustrative distribution, readings TBD`}>
              {panel.viz.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-full">
                  <div
                    className={`w-full ${i === panel.viz.length - 1 ? "bg-[#e8490f]" : "bg-[#ede8db]/70"}`}
                    style={{ height: `${v}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col justify-center gap-6">
            <div>
              <p className="text-xl md:text-2xl leading-relaxed text-[#ede8db]/85">{panel.s}</p>
              <p className="mt-4 text-[#ede8db]/60 leading-relaxed">{panel.d}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
