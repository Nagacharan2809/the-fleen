"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/**
 * THESIS — what FLEEN is. Editorial, paper surface, scroll-linked
 * word illumination. Mostly typography + whitespace by design.
 */
const SENTENCE = [
  "Most", "models", "answer.", "FLEEN", "is", "built", "to",
  "hold", "a", "problem", "still", "long", "enough", "to",
  "return", "something", "you", "can", "build", "on.",
];

export default function ThesisStatement() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !scope.current) return;
    const ctx = gsap.context(() => {
      // words illuminate progressively — comprehension-linked, not decorative
      gsap.fromTo(
        "[data-thesis-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-thesis-body]",
            start: "top 78%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );
      gsap.fromTo(
        "[data-thesis-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-thesis-body]",
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        "[data-thesis-side]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-thesis-side-wrap]", start: "top 80%" },
        }
      );
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      data-lexi-scope
      aria-label="FLEEN thesis"
      className="bg-[#ede8db] text-[#0f110d] mt-16 md:mt-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-28">
        <div data-thesis-body className="grid md:grid-cols-12 gap-10">
          <h2 className="md:col-span-9 text-[2rem] md:text-[3.6rem] font-semibold tracking-[-0.03em] leading-[1.08]">
            {SENTENCE.map((w, i) => (
              <span
                key={i}
                data-thesis-word
                className={w === "FLEEN" ? "text-[#e8490f]" : undefined}
              >
                {w}{" "}
              </span>
            ))}
          </h2>
          <div data-thesis-side-wrap className="md:col-span-3 md:pt-3 space-y-6">
            <div data-thesis-side>
              <div data-thesis-rule className="h-[2px] bg-[#0f110d] mb-4" />
              <p className="text-[0.98rem] leading-relaxed text-[#0f110d]/85">
                Capability without evidence is marketing. FLEEN ships
                with its reasoning visible, its limits stated, and its
                system inspectable.
              </p>
            </div>
            <div data-thesis-side>
              <div className="h-px bg-[#0f110d]/15 mb-4" />
              <p className="text-[0.98rem] leading-relaxed text-[#0f110d]/85">
                Give it a failing pipeline, a dense contract, or an
                underspecified task. Watch what it returns — then check
                the work below.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 mt-12 md:mt-20 border-t rule-light pt-6">
          <div className="md:col-span-12 grid sm:grid-cols-3 gap-6">
            {[
              ["I. Show, then claim", "Every capability on this page is demonstrated before it is described."],
              ["II. State the boundary", "Where a value is unknown, it is marked unknown — not rounded, not implied."],
              ["III. Keep the layer open", "The model is the foundation. What you build on it remains yours."],
            ].map(([t, d]) => (
              <div key={t}>
                <p className="font-semibold tracking-tight mb-1.5">{t}</p>
                <p className="text-[0.95rem] leading-relaxed text-[#0f110d]/75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
