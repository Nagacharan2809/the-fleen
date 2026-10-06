"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import LexiScales from "./LexiScales";

/**
 * LEXI opening — entering a research environment, not a landing page.
 * Identity, negative space, one statement. Nothing else competes.
 */
export default function LexiOpening() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !scope.current) return;
    const ctx = gsap.context(() => {
      // Masked words animate via the --lexi-r CSS variable (not yPercent:
      // GSAP preserves the stylesheet translate as px, which would keep
      // the words buried). Reduced-motion users are covered by the CSS
      // guard that forces transform: none.
      gsap.fromTo(
        "[data-open-word]",
        { "--lexi-r": "110%" },
        {
          "--lexi-r": "0%",
          duration: 1.4,
          stagger: 0.16,
          ease: "power4.out",
          delay: 0.25,
        }
      );
      gsap.fromTo(
        "[data-open-statement]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 1.0 }
      );
      gsap.fromTo(
        "[data-open-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: "power3.inOut",
          transformOrigin: "left center",
          delay: 0.7,
        }
      );
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      data-lexi-scope
      aria-label="LEXI LABS introduction"
      className="relative min-h-[92svh] flex flex-col justify-end overflow-hidden"
    >
      {/* wind field — orange gusts over instrument rects, hover-led */}
      <LexiScales className="pointer-events-none absolute inset-0 h-full w-full" />
      {/* crosshair */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#ede8db]/8" />
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="block h-px w-10 bg-[#e8490f]" />
          <span className="block h-[7px] w-[7px] border border-[#e8490f]" />
          <span className="block h-px w-10 bg-[#e8490f]" />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10 pb-10 md:pb-14 pt-32">
        <div data-open-rule aria-hidden className="h-px w-full bg-[#ede8db]/15 mb-10 md:mb-14" />

        <h1 className="lexi-display text-[17vw] md:text-[13.5vw] leading-[0.84]">
          <span className="mask-line">
            <span data-open-word>Lexi</span>
          </span>
          <span className="mask-line">
            <span data-open-word className="text-[#ede8db]/35">
              Labs<span className="text-[#e8490f]">.</span>
            </span>
          </span>
        </h1>

        <p
          data-open-statement
          className="mt-8 md:mt-12 text-[1.05rem] md:text-xl leading-relaxed text-[#ede8db]/75 max-w-[34rem]"
        >
          A research laboratory building foundational models with
          restraint — one system, fully inspectable, before any product.
        </p>
      </div>
    </section>
  );
}
