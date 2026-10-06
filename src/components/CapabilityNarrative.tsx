"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/**
 * CAPABILITY SYSTEM — spatial narrative, not a card grid.
 * Five questions, five distinct compositions. Claims are scoped to
 * what a 1.0 foundational text model can honestly demonstrate;
 * anything unmeasured is marked [AWAITING DATA], never fabricated.
 */
const CHAPTERS = [
  {
    n: "01",
    q: "What can FLEEN understand?",
    a: "Dense, long-form, poorly structured text — incident reports, contracts, specifications, research excerpts — held in full context and resolved to named parts.",
    detail: "Document understanding · Long-context retention · Defined-term resolution",
    align: "left" as const,
  },
  {
    n: "02",
    q: "What can FLEEN create?",
    a: "Inspectable artifacts: ordered diagnoses, working code with stated constraints, tables a team can act on. Generation that cites its own structure.",
    detail: "Structured generation · Code with constraints · Tabulation",
    align: "right" as const,
  },
  {
    n: "03",
    q: "What can FLEEN reason about?",
    a: "Causal chains in technical systems. It separates victim from cause, orders hypotheses by falsifiability, and proposes the cheapest confirming test first.",
    detail: "Technical reasoning · Hypothesis ordering · Failure analysis",
    align: "left" as const,
  },
  {
    n: "04",
    q: "How does FLEEN interact with tools?",
    a: "Through explicit, auditable calls: read a file, query a store, emit a patch. Every action is proposed before it is taken. [AWAITING DATA: tool-use harness — interface under evaluation]",
    detail: "Agentic task execution [EVALUATION PENDING]",
    align: "right" as const,
  },
  {
    n: "05",
    q: "Where is FLEEN strongest?",
    a: "Where precision outranks fluency: engineering diagnosis, code under constraints, and documents where a missed clause costs money. Multilingual breadth is in scope and under measurement. [AWAITING DATA]",
    detail: "Engineering · Code · High-stakes documents",
    align: "center" as const,
  },
];

export default function CapabilityNarrative() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-cap]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
      // slow drift on the giant numerals — spatial continuity
      gsap.utils.toArray<HTMLElement>("[data-cap-num]").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 4 },
          {
            xPercent: -4,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={scope}
      data-lexi-scope
      aria-label="FLEEN capability system"
      className="border-t rule-dark"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <div className="space-y-16 md:space-y-24">
          {CHAPTERS.map((c) => (
            <article
              key={c.n}
              data-cap
              className={`grid md:grid-cols-12 gap-6 border-t rule-dark pt-6 ${
                c.align === "right" ? "" : c.align === "center" ? "" : ""
              }`}
            >
              <p
                data-cap-num
                aria-hidden
                className={`lexi-display text-[26vw] md:text-[11vw] leading-none text-transparent select-none ${
                  c.align === "right"
                    ? "md:col-span-4 md:order-2 md:text-right"
                    : c.align === "center"
                      ? "md:col-span-12 md:text-center text-[20vw] md:text-[8vw]"
                      : "md:col-span-4"
                }`}
                style={{ WebkitTextStroke: "1px rgba(237,232,219,0.35)" }}
              >
                {c.n}
              </p>
              <div
                className={
                  c.align === "right"
                    ? "md:col-span-7 md:order-1 md:col-start-1"
                    : c.align === "center"
                      ? "md:col-span-8 md:col-start-3 md:text-center"
                      : "md:col-span-7 md:col-start-6"
                }
              >
                <h3 className="lexi-heading text-3xl md:text-5xl">{c.q}</h3>
                <p className="mt-4 text-[1.05rem] md:text-xl leading-relaxed text-[#ede8db]/75 max-w-[38rem]">
                  {c.a}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
