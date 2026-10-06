"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";

/**
 * FOUNDATIONAL MODEL IDENTITY — the foundation layer, explained twice:
 * once for everyone (the strata diagram), once for engineers (progressive disclosure).
 */
export default function ModelArchitecture() {
  const scope = useRef<HTMLElement>(null);
  const [deep, setDeep] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-stratum]",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1.1,
          stagger: 0.16,
          ease: "power3.inOut",
          scrollTrigger: { trigger: "[data-strata]", start: "top 75%" },
        }
      );
      gsap.fromTo(
        "[data-stratum-label]",
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-strata]", start: "top 70%" },
        }
      );
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="developers"
      ref={scope}
      data-lexi-scope
      aria-label="FLEEN as a foundation layer"
      className="bg-[#ede8db] text-[#0f110d] scroll-mt-16"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h2 data-chapter-title className="lexi-heading text-4xl md:text-[3.2rem]">
              The model sits underneath.
            </h2>
            <p className="mt-5 text-[#0f110d]/75 leading-relaxed lexi-body-narrow">
              Applications, agents, and developer surfaces rest on FLEEN —
              they do not contain it. Change the foundation once and
              everything above inherits the improvement.
            </p>
            <button
              onClick={() => setDeep((v) => !v)}
              aria-expanded={deep}
              className="mt-7 lexi-micro border border-[#0f110d]/30 px-5 py-3 hover:bg-[#0f110d] hover:text-[#ede8db] transition-colors min-h-[44px]"
            >
              {deep ? "Hide engineering depth −" : "Reveal engineering depth +"}
            </button>
            {deep && (
              <div className="mt-6 border-t rule-light pt-5 space-y-4 text-[0.95rem] leading-relaxed text-[#0f110d]/80">
                <p>
                  <strong>Interface boundary.</strong> Text and structured
                  calls cross one versioned API. Token accounting,
                  truncation policy, and safety refusals are enforced at
                  the boundary — never inside your application logic.
                </p>
                <p>
                  <strong>State posture.</strong> FLEEN is stateless per
                  request; memory, tools, and retrieval live in your
                  system above the line. The model never retains your data
                  between calls.
                </p>
              </div>
            )}
          </div>

          {/* Strata diagram — architectural, not decorative */}
          <div className="md:col-span-7" data-strata>
            <ol className="space-y-2.5" aria-label="System strata, top to bottom">
              {[
                { t: "Your product", d: "Agents · Applications · Workflows", tone: "bg-[#0f110d]/5 border-[#0f110d]/20", w: "w-full" },
                { t: "Developer surface", d: "Versioned API · SDKs · Observability hooks", tone: "bg-[#0f110d]/8 border-[#0f110d]/25", w: "w-full" },
                { t: "FLEEN 1.0 — foundation", d: "Reasoning · Generation · Understanding", tone: "bg-[#0f110d] text-[#ede8db] border-[#0f110d]", w: "w-full", accent: true },
                { t: "LEXI infrastructure", d: "Private deployment · Data control · Audit", tone: "bg-transparent border-[#0f110d]/20", w: "w-[92%] ml-[4%]" },
              ].map((s) => (
                <li
                  key={s.t}
                  data-stratum
                  className={`border ${s.tone} ${s.w} px-5 md:px-7 py-5 md:py-6 flex items-center justify-between gap-6`}
                >
                  <span data-stratum-label>
                    <span className="block font-semibold tracking-tight text-lg md:text-xl">{s.t}</span>
                    <span className={`block lexi-micro mt-1 ${s.accent ? "text-[#ede8db]/60" : "text-[#0f110d]/50"}`}>{s.d}</span>
                  </span>
                  {s.accent && (
                    <span aria-hidden className="hidden sm:block h-2.5 w-2.5 bg-[#e8490f]" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
