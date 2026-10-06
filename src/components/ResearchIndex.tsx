"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/**
 * RESEARCH LAB IDENTITY — an editorial index of artifacts from an
 * active laboratory. Category and title; nothing else competes.
 */
const ITEMS = [
  {
    cat: "Research",
    title: "Refusal calibration: teaching a model to say what it does not know",
  },
  {
    cat: "Models",
    title: "FLEEN 1.0 model card — capabilities, limits, and evaluation harness",
  },
  {
    cat: "Engineering",
    title: "The versioned boundary: one API between your data and the model",
  },
  {
    cat: "Evaluations",
    title: "Clause-citation harness: measuring long-document retention honestly",
  },
  {
    cat: "Systems",
    title: "Private deployment: keeping the foundation inside your perimeter",
  },
  {
    cat: "Safety",
    title: "Provenance by default: every artifact carries its own trail",
  },
];

export default function ResearchIndex() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-res-row]",
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-res-list]", start: "top 80%" },
        }
      );
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research"
      ref={scope}
      data-lexi-scope
      aria-label="LEXI LABS research index"
      className="border-t rule-dark scroll-mt-16"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <div className="grid md:grid-cols-12 gap-8 mb-8 md:mb-12">
          <h2
            id="research-paper"
            data-chapter-title
            className="md:col-span-7 lexi-heading text-4xl md:text-6xl scroll-mt-24"
          >
            Research is the product roadmap.
          </h2>
          <p className="md:col-span-5 text-[#ede8db]/70 leading-relaxed md:pt-2">
            LEXI LABS publishes method before marketing. These artifacts
            ship with the FLEEN 1.0 research release — read the procedure,
            reproduce the result, challenge the claim.
          </p>
        </div>

        <ol data-res-list className="border-t rule-dark">
          {ITEMS.map((it) => (
            <li key={it.title} data-res-row>
              <a
                href="#research"
                onClick={(e) => e.preventDefault()}
                aria-label={`${it.cat}: ${it.title}`}
                className="group grid md:grid-cols-12 gap-1 md:gap-6 items-baseline py-5 md:py-6 border-b rule-dark hover:bg-[#ede8db]/[0.03] transition-colors px-1 md:px-2 min-h-[44px]"
              >
                <span className="md:col-span-3 text-[0.85rem] tracking-[0.14em] uppercase text-[#e8490f] font-medium">
                  {it.cat}
                </span>
                <span className="md:col-span-9 font-semibold tracking-tight text-lg md:text-[1.45rem] leading-snug group-hover:translate-x-1 transition-transform">
                  {it.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
