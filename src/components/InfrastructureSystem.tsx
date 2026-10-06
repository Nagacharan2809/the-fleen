"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";

/**
 * INFRASTRUCTURE / TRUST — one coherent architectural narrative,
 * not a wall of compliance logos. Only capabilities with real
 * operational meaning are named; status is stated plainly.
 */
const LANES = [
  {
    id: "control",
    t: "Data control",
    d: "Your data crosses a versioned boundary and returns as output. Stateless requests: the model retains nothing between calls. Private deployment keeps the boundary inside your perimeter.",
    items: ["Stateless per request", "Private deployment path", "Audit-ready call records"],
  },
  {
    id: "access",
    t: "Access & deployment",
    d: "One versioned API for every surface above the foundation. Keys, scopes, and rate policy enforced at the boundary — rotation and revocation without touching application code.",
    items: ["Versioned API", "Scoped keys + rotation", "Environment separation"],
  },
  {
    id: "operate",
    t: "Operation & reliability",
    d: "Observability hooks ship with the interface: per-call traces, refusal reasons, and provenance for generated artifacts. Reliability figures publish from production measurement — not before.",
    items: ["Trace + provenance hooks", "Refusal reason codes", "Measured SLOs at release [TBD]"],
  },
];

export default function InfrastructureSystem() {
  const [lane, setLane] = useState(0);
  const active = LANES[lane];
  const panelRef = useRef<HTMLDivElement>(null);

  // lane transitions glide — continuity between states
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0.2, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [lane]);

  return (
    <section
      id="infrastructure"
      aria-label="Infrastructure and trust"
      className="border-t rule-dark scroll-mt-16"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <div className="grid md:grid-cols-12 gap-8">
          <h2 data-chapter-title className="md:col-span-6 lexi-heading text-4xl md:text-6xl">
            Trust is a system diagram, not a badge wall.
          </h2>
          <p className="md:col-span-6 text-[#ede8db]/70 leading-relaxed md:pt-3 md:pl-8 md:border-l rule-dark">
            LEXI builds the technology system FLEEN runs on — deployment,
            security, and observability as part of the release, not an
            enterprise afterthought. Select a lane to trace it.
          </p>
        </div>

        {/* Lane selector + coherent diagram */}
        <div className="grid md:grid-cols-12 gap-8 mt-10">
          <div className="md:col-span-4 flex md:flex-col gap-2 overflow-x-auto" role="tablist" aria-label="Infrastructure lanes">
            {LANES.map((l, i) => (
              <button
                key={l.id}
                role="tab"
                aria-selected={lane === i}
                onClick={() => setLane(i)}
                className={`text-left border px-5 py-4 min-w-[200px] md:min-w-0 min-h-[44px] transition-colors ${
                  lane === i
                    ? "border-[#e8490f] bg-[#e8490f]/10 text-[#ede8db]"
                    : "rule-dark text-[#ede8db]/55 hover:text-[#ede8db]"
                }`}
              >
                <span className="font-semibold tracking-tight">{l.t}</span>
              </button>
            ))}
          </div>

          <div ref={panelRef} className="md:col-span-8 instrument p-6 md:p-9">
            {/* request path diagram */}
            <div className="flex items-center gap-0 lexi-mono text-[0.72rem] md:text-[0.78rem]" aria-hidden>
              {["YOU", "BOUNDARY", "FLEEN 1.0", "OUTPUT"].map((n, i) => (
                <span key={n} className="flex items-center flex-1 last:flex-none">
                  <span className={`border px-3 py-2 whitespace-nowrap ${i === 2 ? "border-[#e8490f] text-[#e8490f]" : "rule-dark text-[#ede8db]/70"}`}>
                    {n}
                  </span>
                  {i < 3 && <span className="flex-1 h-px bg-[#ede8db]/25 mx-1" />}
                </span>
              ))}
            </div>
            <h3 className="lexi-heading text-2xl md:text-3xl mt-6">{active.t}</h3>
            <p className="mt-3 text-[#ede8db]/70 leading-relaxed max-w-[40rem]">{active.d}</p>
            <ul className="mt-5 grid sm:grid-cols-3 gap-2.5">
              {active.items.map((it) => (
                <li key={it} className="border rule-dark px-4 py-3 lexi-mono text-[0.8rem] text-[#ede8db]/80">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
